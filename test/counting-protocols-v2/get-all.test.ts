import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: AnalyticsReportsCountingProtocols: can get all the counting protocols', () => {
  it("Tillhub's analyticsReportsCountingProtocols are instantiable", async () => {
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
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/cashier_counting_protocols/overview`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [
                {
                  metric: {
                    job: 'reports_counting_protocols_v2_overview_data'
                  },
                  values: [{}]
                },
                {
                  metric: {
                    job: 'reports_counting_protocols_v2_overview_summary'
                  },
                  values: [{}]
                },
                {
                  metric: {
                    job: 'reports_counting_protocols_v2_overview_filtered_meta'
                  },
                  values: [{ count: 1 }]
                },
                {
                  metric: {
                    job: 'reports_counting_protocols_v2_overview_meta'
                  },
                  values: [{ count: 1 }]
                }
              ]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsCountingProtocols = th.analyticsHandlers().analytics.reports
      .AnalyticsReportsCountingProtocols

    expect(analyticsReportsCountingProtocols).toBeInstanceOf(
      v2.analytics.reports.AnalyticsReportsCountingProtocols
    )

    const { data } = await analyticsReportsCountingProtocols.getAll()

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
        .onGet(
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/cashier_counting_protocols/overview`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analyticsHandlers().analytics.reports.AnalyticsReportsCountingProtocols.getAll()
    } catch (err) {
      expect(err.name).toBe('AnalyticsReportsCountingProtocolsFetchFailed')
    }
  })
})
