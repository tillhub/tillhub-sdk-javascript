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

const reasonsId = 'asdf5566'
const updateObject = {
  name: 'water damage',
  description: 'box got wet',
  type: 'stock_adjustment'
}

describe('v0: Reasons: can alter the reasons', () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/reasons/${legacyId}/${reasonsId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [updateObject]
          }
        ]
      })
    }

    const th = await initThInstance()

    const reasons = th.reasons()

    expect(reasons).toBeInstanceOf(v0.Reasons)

    const { data } = await reasons.put(reasonsId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock.onPut(`https://api.tillhub.com/api/v0/reasons/${legacyId}/${reasonsId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.reasons().put(reasonsId, updateObject)
    } catch (err: any) {
      expect(err.name).toBe('ReasonsPutFailed')
    }
  })
})
