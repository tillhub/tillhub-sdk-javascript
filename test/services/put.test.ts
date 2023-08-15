import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const serviceId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const serviceItem = {
  name: 'Test name',
  duration: 5,
  linked_product: '0f20c60f-2ed9-4685-8cd1-23970071f7eb'
}

describe('v0: Services: can alter the service', () => {
  it("Tillhub's service are instantiable", async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/services/${legacyId}/${serviceId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [serviceItem]
            }
          ]
        })
    }

    const th = await initThInstance()

    const services = th.services()

    expect(services).toBeInstanceOf(v0.Services)

    const { data } = await services.put(serviceId, serviceItem)

    expect(data).toMatchObject(serviceItem)
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
        .onPut(`https://api.tillhub.com/api/v0/services/${legacyId}/${serviceId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.services().put(serviceId, serviceItem)
    } catch (err: any) {
      expect(err.name).toBe('ServicePutFailed')
    }
  })
})
