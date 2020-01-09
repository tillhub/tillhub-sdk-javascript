import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics: gets Stocks report', () => {
  it('gets Stocks report', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/stocks`)
        .reply(function (config) {
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

    const Analytics = th.analytics()

    expect(Analytics).toBeInstanceOf(v0.Analytics)

    const { data } = await Analytics.getStocksReport()

    expect(Array.isArray(data)).toBe(true)
  })

  it('takes a query string', async () => {
    const mockStocksQuery = {
      format: 'csv'
    }

    const queryString = qs.stringify(mockStocksQuery, { addQueryPrefix: true })

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/stocks${queryString}`)
        .reply(function (config) {
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

    const Analytics = th.analytics()

    expect(Analytics).toBeInstanceOf(v0.Analytics)

    const { data } = await Analytics.getStocksReport(mockStocksQuery)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/stocks`)
        .reply(function (config) {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analytics().getStocksReport()
    } catch (err) {
      expect(err.name).toBe('ReportsStocksFetchFailed')
    }
  })
})
