import * as dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const staffId = '1234'
const query = { start: '31/12/1999', end: '01/01/2000' }
const timetrackingQuery = { query }
const queryString = qs.stringify(query, { addQueryPrefix: true })

const timetrackingResponse = [
  {
    date: '01/01/2000',
    clock_in: '123456468789',
    clock_out: '89498498498',
    total_break: {
      hours: 0,
      minutes: 55,
      seconds: 5,
      milliseconds: 5
    },
    total_worked: {
      hours: 5,
      minutes: 50,
      seconds: 5,
      milliseconds: 5
    }
  }
]

describe('v0: Timetracking: can get the timetracking report for a specific staff member', () => {
  it("Tillhub's products are instantiable", async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/time_tracking/${legacyId}/reports/staff/${staffId}${queryString}`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: timetrackingResponse
            }
          ]
        })
    }

    const th = await initThInstance()

    const Timetracking = th.timetracking()

    expect(Timetracking).toBeInstanceOf(v0.Timetracking)

    const { data } = await Timetracking.get(staffId, timetrackingQuery)

    expect(data).toMatchObject(timetrackingResponse)
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
        .onGet(
          `https://api.tillhub.com/api/v0/time_tracking/${legacyId}/reports/staff/${staffId}${queryString}`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.timetracking().get(staffId, timetrackingQuery)
    } catch (err) {
      expect(err.name).toBe('TimetrackingReportFetchFailed')
    }
  })
})
