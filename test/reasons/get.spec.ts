import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const reasonsId = 'asdf5566'
const reason = {
  name: 'water damage',
  description: 'box got wet',
  type: 'stock_adjustment'
}

describe('v0: Reasons: can get one reason', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/reasons/${legacyId}/${reasonsId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [reason]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Reasons = th.reasons()

    expect(Reasons).toBeInstanceOf(v0.Reasons)

    const { data } = await Reasons.get(reasonsId)

    expect(data).toMatchObject(reason)
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

      mock.onGet(`https://api.tillhub.com/api/v0/reasons/${legacyId}/${reasonsId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.reasons().get(reasonsId)
    } catch (err) {
      expect(err.name).toBe('ReasonsFetchOneFailed')
    }
  })
})
