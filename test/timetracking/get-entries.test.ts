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
const date = '2000-01-01'
const query = { date }
const queryString = qs.stringify(query, { addQueryPrefix: true })

const timetrackingResponse = [
  {
    id: 'asdf-wert',
    staff: '1234',
    owner: '456E438E3E0E47219FE9900870C4D328',
    client_id: '1DD4BECB-15D3-44E3-806A-DCA5F9B26095',
    type: 'day',
    description: null,
    started_at: '2000-01-01T09:15:27.000Z',
    ended_at: '2000-01-01T18:49:27.000Z',
    custom_properties: null,
    location: null,
    metadata: null,
    deleted: false,
    active: true,
    created_at: '2000-01-02T09:42:53.435Z',
    updated_at: '2000-01-02T09:44:55.122Z'
  }
]

describe('v0: Timetracking: can get the timetracking entries for a specific staff member', () => {
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
          `https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries/staff/${staffId}${queryString}`
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

    const { data } = await Timetracking.getEntries(staffId, { query })

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
          `https://api.tillhub.com/api/v0/time_tracking/${legacyId}/entries/staff/${staffId}${queryString}`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.timetracking().getEntries(staffId, { query })
    } catch (err: any) {
      expect(err.name).toBe('TimetrackingEntriesFetchFailed')
    }
  })
})
