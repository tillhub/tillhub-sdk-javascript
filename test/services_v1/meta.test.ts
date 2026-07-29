import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const metaUri = `https://api.tillhub.com/api/v1/services/${legacyId}/meta`

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

function mockLogin (): void {
  mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
    return [
      200,
      {
        token: '',
        user: {
          id: '123',
          legacy_id: legacyId
        }
      }
    ]
  })
}

describe('v1: Services: can get count of all services', () => {
  it("Tillhub's Services are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()
      mock.onGet(metaUri).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{ count: 150 }]
          }
        ]
      })
    }

    const th = await initThInstance()

    const services = th.servicesV1()

    expect(services).toBeInstanceOf(v1.Services)

    const { data } = await services.meta()

    expect(data.count).toEqual(150)
  })

  it('passes the query on to the meta endpoint', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    let requestedUrl: string | undefined
    mock.onGet(new RegExp(`${metaUri}.*`)).reply((config) => {
      requestedUrl = config.url
      return [
        200,
        {
          count: 1,
          results: [{ count: 7 }]
        }
      ]
    })

    const th = await initThInstance()

    const { data } = await th.servicesV1().meta({
      deleted: false,
      serviceCategoryId: 'c-1',
      q: 'hair'
    })

    expect(data.count).toEqual(7)
    expect(requestedUrl).toContain('deleted=false')
    expect(requestedUrl).toContain('serviceCategoryId=c-1')
    expect(requestedUrl).toContain('q=hair')
  })

  it('rejects when the response contains no metadata', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()
    mock.onGet(metaUri).reply(() => {
      return [
        200,
        {
          count: 0,
          results: []
        }
      ]
    })

    const th = await initThInstance()

    try {
      await th.servicesV1().meta()
      fail('should have thrown')
    } catch (err: any) {
      expect(err.name).toBe('ServicesMetaFailed')
    }
  })

  // The body is intentionally valid here, so the rejection can only come from the
  // status check and not from reading results off an empty response.
  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()
    mock.onGet(metaUri).reply(() => {
      return [
        205,
        {
          count: 1,
          results: [{ count: 5 }]
        }
      ]
    })

    const th = await initThInstance()

    try {
      await th.servicesV1().meta()
      fail('should have thrown')
    } catch (err: any) {
      expect(err.name).toBe('ServicesMetaFailed')
    }
  })

  it('rejects on errored response', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()
    mock.onGet(metaUri).reply(() => {
      return [500]
    })

    const th = await initThInstance()

    try {
      await th.servicesV1().meta()
      fail('should have thrown')
    } catch (err: any) {
      expect(err.name).toBe('ServicesMetaFailed')
    }
  })
})
