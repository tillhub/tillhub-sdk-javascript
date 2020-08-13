import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
dotenv.config()
import { Payments } from '../../../src/v0/analytics/reports/payments'
import { initThInstance } from '../../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics: gets Payments report', () => {
  it('gets Payments report', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/payments`)
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

    const payments = th.analytics().payments()

    expect(payments).toBeInstanceOf(Payments)

    const { data } = await payments.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('takes a query string', async () => {
    const paymentsQuery = {
      format: 'csv',
      date_start: '2019-03-18T22:59:59.999Z',
      date_end: '2019-03-07T23:00:00.000Z',
      payment_option: 'Visa',
      payment_type: 'cash',
      transaction_number: 5,
      balance_number: 4,
      amount: {
        from: 20,
        to: 1400
      },
      change: {
        from: 1,
        to: 8
      }
    }

    const queryString = qs.stringify(paymentsQuery, { addQueryPrefix: true })

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
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/payments${queryString}`
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

    const payments = th.analytics().payments()

    expect(payments).toBeInstanceOf(Payments)

    const { data } = await payments.getAll(paymentsQuery)

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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/payments`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analytics().getPaymentsReport()
    } catch (err) {
      expect(err.name).toBe('PaymentsReportFetchFailed')
    }
  })
})
