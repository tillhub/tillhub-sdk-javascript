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

const timetrackingEntryId = 'asdf5566'
const respMsg = `Deleted time track entry ${timetrackingEntryId}`

describe('v0: Timetracking: can alter the timetracking entry', () => {
  it("Tillhub's Timetracking is instantiable", async () => {
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
        .onDelete(
          `https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries/${timetrackingEntryId}`
        )
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const timetracking = th.timetracking()

    expect(timetracking).toBeInstanceOf(v0.Timetracking)

    const { msg } = await timetracking.deleteEntry(timetrackingEntryId)

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
      mock
        .onDelete(
          `https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries/${timetrackingEntryId}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.timetracking().deleteEntry(timetrackingEntryId)
    } catch (err) {
      expect(err.name).toBe('TimetrackingEntryDeleteFailed')
    }
  })
})
