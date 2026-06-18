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

const serviceId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const service = {
  name: 'Hair coloring (edited)',
  duration: 35,
  linkedProductId: 'p-1',
  bookableOnline: false
}

describe('v1: Services: can alter a service', () => {
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
        .onPut(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}`)
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

    const { data } = await services.put(serviceId, service)

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

      mock
        .onPut(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}`)
        .reply(() => {
          return [500]
        })
    }

    try {
      const th = await initThInstance()
      await th.servicesV1().put(serviceId, service)
    } catch (err: any) {
      expect(err.name).toBe('ServicePutFailed')
    }
  })
})
