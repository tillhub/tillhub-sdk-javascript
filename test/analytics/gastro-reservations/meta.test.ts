import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { GastroReservations } from '../../../src/v0/analytics/reports/gastro-reservations'
import { initThInstance } from '../../util'

const legacyId = '4564'

describe('v0: Analytics Reports Gastro Reservations: can get count number of all gastro reservations', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })
  it('get metadata', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/report/${legacyId}/meta`)
        .reply(() => {
          return [
            200,
            {
              count: 50,
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const gastroReservations = th.analytics().gastroReservations()

    expect(gastroReservations).toBeInstanceOf(GastroReservations)

    const { data } = await gastroReservations.meta()

    expect(data).toEqual({ count: 50 })
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
        .onGet(`https://api.tillhub.com/api/v0/gastro/reservations/appointments/report/${legacyId}/meta`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.analytics().gastroReservations().meta()
    } catch (err: any) {
      expect(err.name).toBe('ReportsGastroReservationsMetaFailed')
    }
  })
})
