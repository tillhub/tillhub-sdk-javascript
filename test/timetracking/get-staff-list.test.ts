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

describe('v0: Timetracking: can get list of all staff members with at least one timetracking entry', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/staff`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: []
          }
        ]
      })
    }

    const th = await initThInstance()

    const Timetracking = th.timetracking()

    expect(Timetracking).toBeInstanceOf(v0.Timetracking)

    const { data } = await Timetracking.getStaffList()

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

      mock.onGet(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/staff`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.timetracking().getStaffList()
    } catch (err) {
      expect(err.name).toBe('TimetrackingStaffListFetchFailed')
    }
  })
})
