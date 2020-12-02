import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { TimetrackingPeriodTypes } from '../../src/v0/timetracking'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const updateObject = [{
  client_id: 'null',
  deleted: false,
  active: true,
  auto_clock_out: true,
  auto_clock_out_after: {
    value: 15,
    period: 'hours' as TimetrackingPeriodTypes
  },
  auto_clock_out_at: 'null'
}]

describe('v0: Timetracking: can alter the timetracking configurations', () => {
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
        .onPut(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/configurations`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: updateObject
            }
          ]
        })
    }

    const th = await initThInstance()

    const timetracking = th.timetracking()

    expect(timetracking).toBeInstanceOf(v0.Timetracking)

    const { data } = await timetracking.updateConfiguration(updateObject)

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
        .onPut(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/configurations`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.timetracking().updateConfiguration(updateObject)
    } catch (err) {
      expect(err.name).toBe('TimetrackingConfigurationPutFailed')
    }
  })
})
