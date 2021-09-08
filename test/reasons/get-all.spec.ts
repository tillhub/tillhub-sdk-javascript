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

describe('v0: Reasons: can get all the reasons', () => {
  it("Tillhub's reasons are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/reasons/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const reasons = th.reasons()

    expect(reasons).toBeInstanceOf(v0.Reasons)

    const { data } = await reasons.getAll()

    expect(Array.isArray(data)).toBe(true)
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

      mock.onGet(`https://api.tillhub.com/api/v0/reasons/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.reasons().getAll()
    } catch (err: any) {
      expect(err.name).toBe('ReasonsFetchFailed')
    }
  })
})
