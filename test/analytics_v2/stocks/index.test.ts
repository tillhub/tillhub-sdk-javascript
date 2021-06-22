import { AnalyticsReportsStocksFetchFailed } from './../../../src/v2/analytics/reports/stocks'
import * as dotenv from 'dotenv'
import qs from 'qs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'
import faker from 'faker'
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
  format: 'csv'
}
const correlationId = faker.datatype.uuid()

describe('v2: AnalyticsReportsStocks', () => {
  it('can get stocks analytics reports', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/stocks?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{ correlationId }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    expect(analyticsReportsStocks).toBeInstanceOf(v2.analytics.reports.AnalyticsReportsStocks)

    const { data } = await analyticsReportsStocks.getAll({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0].correlationId).toBe(correlationId)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/stocks?format=csv`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    try {
      await analyticsReportsStocks.getAll({ query })
    } catch (err) {
      expect(err.name).toBe(AnalyticsReportsStocksFetchFailed.name)
    }
  })
})
