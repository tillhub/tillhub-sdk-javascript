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

const serviceId = 'asdf5566'
const respMsg = `Deleted service ${serviceId}`

describe('v1: Services: can delete a service', () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}`)
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const services = th.servicesV1()

    expect(services).toBeInstanceOf(v1.Services)

    const { msg } = await services.delete(serviceId)

    expect(msg).toEqual(respMsg)
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
        .onDelete(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}`)
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.servicesV1().delete(serviceId)
    } catch (err: any) {
      expect(err.name).toBe('ServiceDeleteFailed')
    }
  })
})
