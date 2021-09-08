import { AnalyticsReportsProductsFetchFailed } from './../../../src/v2/analytics/reports/products'
import * as dotenv from 'dotenv'
import qs from 'qs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../../src/tillhub-js'
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
  format: 'csv'
}

describe('v2: AnalyticsReportsProducts', () => {
  it('can get products analytics reports', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/products?${qs.stringify(query)}`)
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

    const analyticsReportsProducts = th.analyticsHandlers().analytics.reports.AnalyticsReportsProducts

    expect(analyticsReportsProducts).toBeInstanceOf(v2.analytics.reports.AnalyticsReportsProducts)

    const { data } = await analyticsReportsProducts.getAll({ query })

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/products?format=csv`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsProducts = th.analyticsHandlers().analytics.reports.AnalyticsReportsProducts

    try {
      await analyticsReportsProducts.getAll({ query })
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsProductsFetchFailed.name)
    }
  })
})
