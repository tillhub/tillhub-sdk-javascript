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
  name: 'Hair coloring',
  duration: 30
}

describe('v1: ServiceSteps: can create one service step', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/service-steps/${legacyId}`).reply(() => {
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

    const { data } = await serviceSteps.create(serviceStep)

    expect(data).toMatchObject(serviceStep)
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

      mock.onPost(`https://api.tillhub.com/api/v1/service-steps/${legacyId}`).reply(() => {
        return [500]
      })
    }

    try {
      const th = await initThInstance()
      await th.serviceSteps().create(serviceStep)
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepCreationFailed')
    }
  })
})
