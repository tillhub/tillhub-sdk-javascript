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
  name: 'Hair coloring',
  duration: 30,
  linkedProductId: 'p-1',
  bookableOnline: true
}

describe('v1: Services: can create one service', () => {
  it("Tillhub's services are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/services/${legacyId}`).reply(() => {
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

    const { data } = await services.create(service)

    expect(data).toMatchObject(service)
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

      mock.onPost(`https://api.tillhub.com/api/v1/services/${legacyId}`).reply(() => {
        return [500]
      })
    }

    try {
      const th = await initThInstance()
      await th.servicesV1().create(service)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCreationFailed')
    }
  })
})
