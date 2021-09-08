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

const reasons = {
  name: 'water damage',
  description: 'box got wet',
  type: 'stock_adjustment'
}

describe('v0: Reasons: can create a reasons', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/reasons/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [reasons],
            errors: []
          }
        ]
      })
    }

    const th = await initThInstance()

    const Reasons = th.reasons()

    expect(Reasons).toBeInstanceOf(v0.Reasons)

    const { data } = await Reasons.create(reasons)

    expect(data).toMatchObject(reasons)
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

      mock.onPost(`https://api.tillhub.com/api/v0/reasons/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.reasons().create(reasons)
    } catch (err: any) {
      expect(err.name).toBe('ReasonsCreationFailed')
    }
  })
})
