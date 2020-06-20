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

const entryId = 'asdf5566'
const updateObject = {
  started_at: '123789456',
  ended_at: '123456396'
}

describe('v0: Timetracking: can alter the timetracking entry', () => {
  it("Tillhub's timetracking are instantiable", async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries/${entryId}`)
        .reply(() => {
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

    const timetracking = th.timetracking()

    expect(timetracking).toBeInstanceOf(v0.Timetracking)

    const { data } = await timetracking.updateEntry(entryId, updateObject)

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
      mock
        .onPut(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries/${entryId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.timetracking().updateEntry(entryId, updateObject)
    } catch (err) {
      expect(err.name).toBe('TimetrackingEntryPutFailed')
    }
  })
})
