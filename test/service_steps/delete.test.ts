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

const serviceStepId = 'asdf5566'
const respMsg = `Deleted service step ${serviceStepId}`

describe('v1: ServiceSteps: can delete a service step', () => {
  it("Tillhub's service steps are instantiable", async () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
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

    const serviceSteps = th.serviceSteps()

    expect(serviceSteps).toBeInstanceOf(v1.ServiceSteps)

    const { msg } = await serviceSteps.delete(serviceStepId)

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
        .onDelete(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.serviceSteps().delete(serviceStepId)
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepDeleteFailed')
    }
  })

  it('surfaces blocking_services on 409 conflict', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

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

    const blockingServices = [
      { id: 'svc-1', name: 'Hair coloring' },
      { id: 'svc-2', name: 'Highlights' }
    ]

    mock
      .onDelete(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
      .reply(() => {
        return [
          409,
          {
            msg: 'Cannot delete service step while it is referenced by services',
            blocking_services: blockingServices
          }
        ]
      })

    const th = await initThInstance()

    try {
      await th.serviceSteps().delete(serviceStepId)
      throw new Error('expected delete to reject')
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepDeleteFailed')
      expect(err.properties.error.response.status).toBe(409)
      expect(err.properties.error.response.data.blocking_services).toEqual(blockingServices)
    }
  })
})
