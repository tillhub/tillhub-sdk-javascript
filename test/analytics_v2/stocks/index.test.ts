import { AnalyticsReportsStocksFetchFailed } from './../../../src/v2/analytics/reports/stocks'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'
import faker from '@faker-js/faker'
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

describe('v2: AnalyticsReportsStocks', () => {
  it('can get stocks analytics reports', async () => {
    const dataItems = [{ value: '1' }]
    const countFiltered = dataItems.length
    const countTotal = 2
    const uuid = faker.datatype.uuid()

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/stocks`)
        .reply(() => {
          return [
            200,
            {
              cursor: {
                next: faker.internet.url()
              },
              count: 3,
              results: [
                {
                  metric: {
                    job: 'reports_stocks',
                    user: uuid
                  },
                  count: countFiltered,
                  values: dataItems
                },
                {
                  metric: {
                    job: 'reports_stocks_v2_overview_meta',
                    user: uuid
                  },
                  count: 1,
                  values: [{ count: countTotal }]
                },
                {
                  metric: {
                    job: 'reports_stocks_v2_overview_filtered_meta',
                    user: uuid
                  },
                  count: 1,
                  values: [{ count: countFiltered }]
                }
              ]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    expect(analyticsReportsStocks).toBeInstanceOf(v2.analytics.reports.AnalyticsReportsStocks)

    const { data, metaData, next } = await analyticsReportsStocks.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(dataItems)
    expect(metaData.count).toEqual(countFiltered)
    expect(metaData.total_count).toEqual(countTotal)

    // Also able to paginate
    expect(typeof next).toBe('function')
  })

  it('can get stocks analytics export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/stocks?format=csv`)
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

    const { data } = await analyticsReportsStocks.export()

    expect(Array.isArray(data)).toBe(true)
    expect(data[0].correlationId).toBe(correlationId)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/stocks`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    try {
      await analyticsReportsStocks.getAll()
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsStocksFetchFailed.name)
    }
  })
})
