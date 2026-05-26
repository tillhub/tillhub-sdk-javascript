import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

describe('v1: ServiceSteps: can get count number of all service steps', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

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

      mock.onGet(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/meta`).reply(() => {
        return [
          200,
          {
            count: 50,
            results: [{ count: 50 }]
          }
        ]
      })
    }

    const th = await initThInstance()

    const serviceSteps = th.serviceSteps()

    expect(serviceSteps).toBeInstanceOf(v1.ServiceSteps)

    const { data } = await serviceSteps.meta()

    expect(data).toEqual([{ count: 50 }])
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

      mock.onGet(`https://api.tillhub.com/api/v1/service-steps/${legacyId}/meta`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.serviceSteps().meta()
    } catch (err: any) {
      expect(err.name).toBe('ServiceStepsMetaFailed')
    }
  })
})
