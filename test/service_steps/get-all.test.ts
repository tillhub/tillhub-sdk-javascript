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

const serviceStep = {
  id: 'a3a7d4f6-3b6f-4f6e-9b1a-1c3d6e8f9a0b',
  name: 'Hair coloring',
  duration: 30,
  services: [{ id: 'svc-1', name: 'Hair coloring' }],
  servicesCount: 1
}

describe('v1: ServiceSteps: can get all', () => {
  it("Tillhub's ServiceSteps are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/service-steps/${legacyId}`).reply(() => {
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

    const { data } = await serviceSteps.getAll()

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
      mock.onGet(`https://api.tillhub.com/api/v1/service-steps/${legacyId}`).reply(() => {
        return [500]
      })
    }

    const th = await initThInstance()

    try {
      await th.serviceSteps().getAll()
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepsFetchAllFailed')
    }
  })
})
