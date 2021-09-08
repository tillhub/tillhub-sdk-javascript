import { AnalyticsReportsV1StockTakingsFetchError } from './../../../src/v1/analytics/reports/stock_takings'
import * as dotenv from 'dotenv'
import qs from 'qs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

afterEach(() => {
  mock.reset()
})

const query = {
  format: 'csv',
  start: '2019-03-18T22:59:59.999Z',
  end: '2019-03-07T23:00:00.000Z'
}

const stockTakingsData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v1: AnalyticsReportsStockTakings', () => {
  it('can get stock takings analytics reports export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/inventory/stock_takings?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [stockTakingsData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsStockTakings = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsStockTakings

    expect(analyticsReportsStockTakings).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsStockTakings)

    const { data } = await analyticsReportsStockTakings.getAll({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(stockTakingsData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/inventory/stock_takings?${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsStockTakings = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsStockTakings

    try {
      await analyticsReportsStockTakings.getAll({ query })
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsV1StockTakingsFetchError.name)
    }
  })
})
