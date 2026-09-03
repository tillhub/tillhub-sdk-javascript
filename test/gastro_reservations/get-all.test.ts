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

const reservation = {
  id: '12356',
  status: 'reserved',
  start: '2026-09-15T12:00:00.000Z',
  end: '2026-09-15T13:00:00.000Z'
}

describe('v0: Gastro Reservations: can get all', () => {
  it("Tillhub's Gastro Reservations are instantiable", async () => {
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
              results: [reservation]
            }
          ]
        })
    }

    const th = await initThInstance()
    const gastroReservations = th.gastroReservations()

    expect(gastroReservations).toBeInstanceOf(v0.GastroReservations)

    const { data } = await gastroReservations.getAll()
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
      await th.gastroReservations().getAll()
    } catch (err: any) {
      expect(err.name).toBe('GastroReservationsFetchFailed')
    }
  })
})

describe('v0: Gastro Reservations: can count opening hours conflicts', () => {
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
        .onPost(
          `https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-conflicts`
        )
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
      type: 'open' as const,
      from: '10:00',
      to: '15:00',
      weekdays: [0],
      timeZone: 'Europe/Berlin'
    }

    const { data } = await th.gastroReservations().countOpeningHoursConflicts(body)

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
        .onPost(
          `https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-conflicts`
        )
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.gastroReservations().countOpeningHoursConflicts({
        startDate: '2026-12-20',
        endDate: '2026-12-20',
        type: 'closed'
      })
    } catch (err: any) {
      expect(err.name).toBe('GastroReservationsOpeningHoursConflictsFailed')
    }
  })
})

describe('v0: Gastro Reservations: can count opening hours config conflicts', () => {
  const weeklyHours = Array.from({ length: 7 }).map((_, dayIndex) => ({
    closed: dayIndex === 6,
    dayIndex,
    openFrom: '08:00',
    openTo: '22:00',
    breakFrom: null,
    breakTo: null
  }))

  const configBody = {
    previousReservations: {
      openingHours: weeklyHours,
      closingDays: [],
      openingHoursExceptions: []
    },
    nextReservations: {
      openingHours: weeklyHours.map((row) =>
        row.dayIndex === 4 ? { ...row, openFrom: '12:00', openTo: '18:00' } : row
      ),
      closingDays: [
        {
          reason: 'Holiday',
          startDate: '2026-12-25',
          endDate: '2026-12-25'
        }
      ],
      openingHoursExceptions: [
        {
          type: 'open' as const,
          startDate: '2026-12-20',
          endDate: '2026-12-20',
          from: '10:00',
          to: '16:00',
          breakFrom: '13:00',
          breakTo: '14:00'
        }
      ]
    },
    timeZone: 'Europe/Berlin',
    branchId: '11111111-1111-1111-1111-111111111111'
  }

  it('posts camelCase previous and next reservation configs', async () => {
    let postedBody: unknown

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
        .onPost(
          `https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-config-conflicts`
        )
        .reply((config) => {
          postedBody = JSON.parse(config.data)
          return [
            200,
            {
              msg: 'Success',
              results: [{ count: 4 }],
              status: 200
            }
          ]
        })
    }

    const th = await initThInstance()
    const { data, msg } = await th.gastroReservations().countOpeningHoursConfigConflicts(configBody)

    expect(data).toEqual({ count: 4 })
    expect(msg).toBe('Success')
    if (process.env.SYSTEM_TEST !== 'true') {
      expect(postedBody).toEqual(configBody)
    }
  })

  it('rejects when the config conflict count request fails', async () => {
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
        .onPost(
          `https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-config-conflicts`
        )
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    await expect(
      th.gastroReservations().countOpeningHoursConfigConflicts({
        previousReservations: {
          openingHours: weeklyHours,
          closingDays: [],
          openingHoursExceptions: []
        },
        nextReservations: {
          openingHours: weeklyHours,
          closingDays: [],
          openingHoursExceptions: []
        },
        timeZone: 'UTC'
      })
    ).rejects.toMatchObject({ name: 'GastroReservationsOpeningHoursConfigConflictsFailed' })
  })

  it('rejects on non-200 success statuses', async () => {
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
        .onPost(
          `https://api.tillhub.com/api/v0/gastro/reservations/appointments/${legacyId}/opening-hours-config-conflicts`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    await expect(
      th.gastroReservations().countOpeningHoursConfigConflicts({
        previousReservations: {
          openingHours: [],
          closingDays: [],
          openingHoursExceptions: []
        },
        nextReservations: {
          openingHours: [],
          closingDays: [],
          openingHoursExceptions: []
        },
        timeZone: 'UTC'
      })
    ).rejects.toMatchObject({
      name: 'GastroReservationsOpeningHoursConfigConflictsFailed',
      properties: { status: 205 }
    })
  })
})
