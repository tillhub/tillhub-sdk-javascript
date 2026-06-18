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

const serviceId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const service = {
  id: serviceId,
  name: 'Hair coloring',
  duration: 30,
  linkedProductId: 'p-1',
  bookableOnline: true,
  serviceCategoryId: 'c-1'
}

describe('v1: Services: can get one service', () => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}`)
        .reply(() => {
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

    const { data } = await services.get(serviceId)

    expect(data).toMatchObject(service)
  })

  it('rejects on status codes that are not 200', async () => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.servicesV1().get(serviceId)
    } catch (err: any) {
      expect(err.name).toBe('ServiceFetchFailed')
    }
  })
})
