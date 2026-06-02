import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  ServiceStepAssignments,
  ServiceStepAssignmentsRequest
} from './../../src/v1/service_step_assignments'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const serviceId = '0f20c60f-2ed9-4685-8cd1-23970071f7eb'
const serviceStepAssignments: ServiceStepAssignmentsRequest = [
  {
    type: 'active',
    duration: 30,
    stepId: 'b4b8e5g7-4c7g-5g7f-0c2b-2d4e7f9g0b1c'
  },
  {
    type: 'idle',
    duration: 20,
    bookableOnline: false
  }
]

describe('v1: ServiceStepAssignments: can alter the service step assignments', () => {
  it("Tillhub's ServiceStepAssignments are instantiable", async () => {
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
        .onPut(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}/steps`)
        .reply(() => {
          return [
            200,
            {
              count: 2,
              results: serviceStepAssignments
            }
          ]
        })
    }

    const th = await initThInstance()

    const steps = th.services().steps()

    expect(steps).toBeInstanceOf(ServiceStepAssignments)

    const { data } = await steps.put(serviceId, serviceStepAssignments)

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

      mock
        .onPut(`https://api.tillhub.com/api/v1/services/${legacyId}/${serviceId}/steps`)
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.services().steps().put(serviceId, serviceStepAssignments)
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepAssignmentsPutFailed')
    }
  })
})
