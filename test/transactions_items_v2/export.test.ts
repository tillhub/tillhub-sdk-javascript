import { AnalyticsReportsTransactionsItemsExportError } from './../../src/v2/analytics/reports/transactions-items'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
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

const correlationId = faker.datatype.uuid()

describe('v2: AnalyticsReportsTransactionItems', () => {
  it('can export transactions items analytics reports', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/transactions/items?format=csv`)
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

    const analyticsReportsTransactionsItems = th.analyticsHandlers().analytics.reports
      .AnalyticsReportsTransactionsItems

    expect(analyticsReportsTransactionsItems).toBeInstanceOf(
      v2.analytics.reports.AnalyticsReportsTransactionsItems
    )

    const { data } = await analyticsReportsTransactionsItems.export()

    expect(Array.isArray(data)).toBe(true)
    expect(data[0].correlationId).toBe(correlationId)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/transactions/items?format=csv`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsTransactionsItems = th.analyticsHandlers().analytics.reports
      .AnalyticsReportsTransactionsItems

    try {
      await analyticsReportsTransactionsItems.export()
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsTransactionsItemsExportError.name)
    }
  })
})
