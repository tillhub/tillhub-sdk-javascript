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

const serviceStepId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const serviceStep = {
  id: serviceStepId,
  name: 'Hair coloring',
  duration: 30,
  services: [
    { id: 'svc-1', name: 'Hair coloring' },
    { id: 'svc-2', name: 'Highlights' }
  ],
  servicesCount: 2
}

describe('v1: ServiceSteps: can get one service step', () => {
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
        .onGet(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [serviceStep]
            }
          ]
        })
    }

    const th = await initThInstance()

    const serviceSteps = th.serviceSteps()

    expect(serviceSteps).toBeInstanceOf(v1.ServiceSteps)

    const { data } = await serviceSteps.get(serviceStepId)

    expect(data).toMatchObject(serviceStep)
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
        .onGet(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.serviceSteps().get(serviceStepId)
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepFetchFailed')
    }
  })
})
