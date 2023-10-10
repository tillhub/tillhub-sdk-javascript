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

const mockHoliday = {
  date: '2023-10-26',
  localName: 'Nationalfeiertag',
  name: 'National Holiday',
  countryCode: 'AT',
  fixed: true,
  global: true,
  counties: null,
  launchYear: null,
  types: ['Public']
}

describe('v0: Holidays: can get all the holidays', () => {
  it("Tillhub's Holidays are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/holidays/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockHoliday]
          }
        ]
      })
    }

    const th = await initThInstance()

    const holidays = th.holidays()

    expect(holidays).toBeInstanceOf(v0.Holidays)

    const { data } = await holidays.getAll()

    expect(data).toContainEqual(mockHoliday)
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

      mock.onGet(`https://api.tillhub.com/api/v0/holidays/${legacyId}`).reply(() => {
        return [mockHoliday]
      })
    }

    try {
      const th = await initThInstance()
      await th.holidays().getAll()
    } catch (err: any) {
      expect(err.name).toBe('HolidaysFetchFailed')
    }
  })
})
