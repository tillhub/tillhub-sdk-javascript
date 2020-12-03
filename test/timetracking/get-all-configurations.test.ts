import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const configuration = {
  id: '8bebcfe1-448f-4ac8-a27e-9c815c0a8d3a',
  auto_clock_out: true,
  auto_clock_out_after: {
    value: 15,
    period: 'hours'
  },
  auto_clock_out_at: null
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Timetracking: can get the timetracking configurations', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/configurations`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [configuration]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Timetracking = th.timetracking()

    expect(Timetracking).toBeInstanceOf(v0.Timetracking)

    const { data } = await Timetracking.getAllConfigurations()

    expect(data).toMatchObject(configuration)
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

      mock.onGet(`https://api.tillhub.com/api/v0/time_tracking/${legacyId}/configurations`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.timetracking().getAllConfigurations()
    } catch (err) {
      expect(err.name).toBe('TimetrackingConfigurationFetchFailed')
    }
  })
})
