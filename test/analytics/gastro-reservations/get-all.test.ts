import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { GastroReservations, ReservationStatus, ReservationSource } from '../../../src/v0/analytics/reports/gastro-reservations'
import { initThInstance } from '../../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics: gets Gastro Reservations report', () => {
  it('gets Gastro Reservations report', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/report/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const gastroReservations = th.analytics().gastroReservations()

    expect(gastroReservations).toBeInstanceOf(GastroReservations)

    const { data } = await gastroReservations.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('takes a query string', async () => {
    const gastroReservationsQuery = {
      start: '2019-03-01',
      end: '2019-03-31',
      limit: 100,
      q: 'search term',
      status: ReservationStatus.RESERVED,
      branchId: 'branch-123',
      source: [ReservationSource.ONLINE_BOOKING],
      layoutId: 'layout-456'
    }

    const queryString = qs.stringify(gastroReservationsQuery, { addQueryPrefix: true })

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
          `https://api.tillhub.com/api/v0/gastro/reservations/appointments/report/${legacyId}${queryString}`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const gastroReservations = th.analytics().gastroReservations()

    expect(gastroReservations).toBeInstanceOf(GastroReservations)

    const { data } = await gastroReservations.getAll(gastroReservationsQuery)

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

      mock
        .onGet(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/report/${legacyId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analytics().gastroReservations().getAll()
    } catch (err: any) {
      expect(err.name).toBe('ReportsGastroReservationsFetchAllFailed')
    }
  })
})
