import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { v1 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const userId = '4564'
const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

function mockLogin (): void {
  mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(200, {
    token: '',
    user: { id: '123', legacy_id: userId }
  })
}

async function login (): Promise<void> {
  th.init({
    credentials: { username: user.username, password: user.password },
    base: process.env.TILLHUB_BASE
  })
  await th.auth.loginUsername({ username: user.username, password: user.password })
}

const service = {
  id: 'svc-1',
  name: 'Beard trim',
  duration: 30,
  linkedProductId: 'p-1'
}

const cursorAfter =
  `https://api.tillhub.com/api/v1/services/${userId}/query?limit=2&cursor=abc`

describe('v1: Services.query (POST batch)', () => {
  it('POSTs id arrays in the body and scalars in the query string', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    mock.onPost(new RegExp(`/api/v1/services/${userId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(Array.isArray(body.id)).toBe(true)
      expect(body.id).toEqual(['svc-1', 'svc-2'])
      expect(url).toContain('deleted=false')
      const qs = url.includes('?') ? url.split('?')[1] : ''
      expect(qs).not.toContain('id')

      return [200, {
        results: [service],
        cursors: { before: null, after: null }
      }]
    })

    await login()
    const services = th.servicesV1()
    expect(services).toBeInstanceOf(v1.Services)

    const { data, metadata } = await services.query({
      query: {
        id: ['svc-1', 'svc-2'],
        deleted: false
      }
    })

    expect(data).toEqual([service])
    expect(metadata).toMatchObject({ count: 1, cursors: { before: null, after: null } })
  })

  it('sends scalar-only list filters in the query string with an empty request body', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    mock.onPost(new RegExp(`/api/v1/services/${userId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(Object.keys(body).length).toBe(0)
      expect(url).toContain('active=true')

      return [200, {
        results: [service],
        cursors: { before: null, after: null }
      }]
    })

    await login()
    const { data } = await th.servicesV1().query({ query: { active: true } })

    expect(Array.isArray(data)).toBe(true)
  })

  it('follows cursors.after by re-posting the same request body', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    mock.onPost(new RegExp(`/api/v1/services/${userId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(body.id).toEqual(['svc-1', 'svc-2', 'svc-3'])

      if (url.includes('cursor=abc')) {
        return [200, {
          results: [{ ...service, id: 'svc-3' }],
          cursors: { before: null, after: null }
        }]
      }

      return [200, {
        results: [service, { ...service, id: 'svc-2' }],
        cursors: { before: null, after: cursorAfter }
      }]
    })

    await login()
    const firstPage = await th.servicesV1().query({
      limit: 2,
      query: {
        active: true,
        id: ['svc-1', 'svc-2', 'svc-3']
      }
    })

    expect(firstPage.data).toHaveLength(2)
    expect(typeof firstPage.next).toBe('function')
    expect(firstPage.metadata.cursors).toMatchObject({ after: cursorAfter })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const secondPage = await firstPage.next!()

    expect(secondPage.data).toEqual([{ ...service, id: 'svc-3' }])
    expect(secondPage.next).toBeUndefined()
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()
    mock.onPost(new RegExp(`/api/v1/services/${userId}/query`)).reply(205)

    await login()

    try {
      await th.servicesV1().query()
    } catch (err: any) {
      expect(err.name).toBe('ServicesFetchAllFailed')
    }
  })
})
