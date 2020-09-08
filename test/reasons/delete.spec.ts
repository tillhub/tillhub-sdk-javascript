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
const respMsg = `Deleted reasons ${reasonsId}`

describe('v0: Reason: can delete a reasons', () => {
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

      mock.onDelete(`https://api.tillhub.com/api/v0/reasons/${legacyId}/${reasonsId}`).reply(() => {
        return [
          200,
          {
            msg: respMsg
          }
        ]
      })
    }

    const th = await initThInstance()

    const reasons = th.reasons()

    expect(reasons).toBeInstanceOf(v0.Reasons)

    const { msg } = await reasons.delete(reasonsId)

    expect(msg).toEqual(respMsg)
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
      mock.onDelete(`https://api.tillhub.com/api/v0/reasons/${legacyId}/${reasonsId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.reasons().delete(reasonsId)
    } catch (err) {
      expect(err.name).toBe('ReasonsDeleteFailed')
    }
  })
})
