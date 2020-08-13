import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: AnalyticsReportsTransactionsItems: can get all the transactions items', () => {
  it("Tillhub's analyticsReportsTransactionsItems are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/transactions/items`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [
                {
                  metric: {
                    job: 'reports_transactions_items_v2_overview_data'
                  },
                  values: [{}]
                },
                {
                  metric: {
                    job: 'reports_transactions_items_v2_overview_summary'
                  },
                  values: [{}]
                },
                {
                  metric: {
                    job: 'reports_transactions_items_v2_overview_filtered_meta'
                  },
                  values: [{ count: 1 }]
                },
                {
                  metric: {
                    job: 'reports_transactions_items_v2_overview_meta'
                  },
                  values: [{ count: 1 }]
                }
              ]
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

    const { data, summary, metaData } = await analyticsReportsTransactionsItems.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(Array.isArray(summary)).toBe(true)
    expect(metaData.count).toBe(1)
    expect(metaData.total_count).toBe(1)
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
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/transactions/items`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analyticsHandlers().analytics.reports.AnalyticsReportsTransactionsItems.getAll()
    } catch (err) {
      expect(err.name).toBe('AnalyticsReportsTransactionsItemsFetchError')
    }
  })
})
