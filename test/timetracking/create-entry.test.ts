import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { TimetrackingEntryTypes } from '../../src/v0/timetracking'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const timetrackingEntry = {
  staff: 'qwert-yuio',
  type: 'day' as TimetrackingEntryTypes,
  started_at: '123456789',
  ended_at: '123456899',
  client_id: 'zxcv-bnmk'
}

describe('v0: Timetracking: can create one timetracking entry', () => {
  it("Tillhub's timetracking is instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [timetrackingEntry]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Timetracking = th.timetracking()

    expect(Timetracking).toBeInstanceOf(v0.Timetracking)

    const { data } = await Timetracking.createEntry(timetrackingEntry)

    expect(data).toMatchObject(timetrackingEntry)
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

      mock.onPost(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.timetracking().createEntry(timetrackingEntry)
    } catch (err) {
      expect(err.name).toBe('TimetrackingEntryCreateFailed')
    }
  })
})
