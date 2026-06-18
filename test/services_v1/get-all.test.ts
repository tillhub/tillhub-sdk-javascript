import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const service = {
  id: 'a3a7d4f6-3b6f-4f6e-9b1a-1c3d6e8f9a0b',
  name: 'Hair coloring',
  duration: 30,
  linkedProductId: 'p-1',
  bookableOnline: true,
  serviceCategoryId: 'c-1'
}

describe('v1: Services: can get all', () => {
  it("Tillhub's Services are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
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

      mock.onGet(`https://api.tillhub.com/api/v1/services/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [service]
          }
        ]
      })
    }

    const th = await initThInstance()

    const services = th.servicesV1()

    expect(services).toBeInstanceOf(v1.Services)

    const { data } = await services.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on errored response', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
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
      mock.onGet(`https://api.tillhub.com/api/v1/services/${legacyId}`).reply(() => {
        return [500]
      })
    }

    const th = await initThInstance()

    try {
      await th.servicesV1().getAll()
    } catch (err: any) {
      expect(err.name).toBe('ServicesFetchAllFailed')
    }
  })
})
