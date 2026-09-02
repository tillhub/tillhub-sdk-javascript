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

const appointment = {
  id: '12356',
  status: 'reserved',
  start: '2026-09-15T12:00:00.000Z',
  end: '2026-09-15T13:00:00.000Z'
}

describe('v0: Gastro Reservations Appointments: can get all', () => {
  it("Tillhub's Gastro Reservations Appointments are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [appointment]
            }
          ]
        })
    }

    const th = await initThInstance()
    const gastroReservationsAppointments = th.gastroReservationsAppointments()

    expect(gastroReservationsAppointments).toBeInstanceOf(v0.GastroReservationsAppointments)

    const { data } = await gastroReservationsAppointments.getAll()
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
        .onGet(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.gastroReservationsAppointments().getAll()
    } catch (err: any) {
      expect(err.name).toBe('GastroReservationsAppointmentsFetchFailed')
    }
  })
})

describe('v0: Gastro Reservations Appointments: can count opening hours conflicts', () => {
  it('posts a date range and optional daily time window', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-conflicts`)
        .reply(() => {
          return [
            200,
            {
              msg: 'Success',
              results: [{ count: 2 }],
              status: 200
            }
          ]
        })
    }

    const th = await initThInstance()
    const body = {
      startDate: '2026-12-20',
      endDate: '2026-12-20',
      from: '10:00',
      to: '15:00',
      timeZone: 'Europe/Berlin'
    }

    const { data } = await th.gastroReservationsAppointments().countOpeningHoursConflicts(body)

    expect(data).toEqual({ count: 2 })
  })

  it('rejects when the conflict count request fails', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-conflicts`)
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.gastroReservationsAppointments().countOpeningHoursConflicts({
        startDate: '2026-12-20',
        endDate: '2026-12-20'
      })
    } catch (err: any) {
      expect(err.name).toBe('GastroReservationsOpeningHoursConflictsFailed')
    }
  })
})
