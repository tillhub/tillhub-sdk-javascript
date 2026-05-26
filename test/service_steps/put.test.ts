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

const serviceStepId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const serviceStep = {
  name: 'Hair coloring (edited)',
  duration: 35
}

describe('v1: ServiceSteps: can alter a service step', () => {
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
        .onPut(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
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

    const { data } = await serviceSteps.put(serviceStepId, serviceStep)

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

      mock
        .onPut(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/${serviceStepId}`)
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.serviceSteps().put(serviceStepId, serviceStep)
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepPutFailed')
    }
  })
})
