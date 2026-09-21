import { AnalyticsReportsStocksFetchFailed, StocksExportOptions } from './../../../src/v2/analytics/reports/stocks'
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
                    job: 'reports_stocks_meta',
                    user: uuid
                  },
                  count: 1,
                  values: [{ count: countTotal }]
                },
                {
                  metric: {
                    job: 'reports_stocks_filtered_meta',
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

  it('passes as_of through to the stocks report query string', async () => {
    const asOf = '2025-12-31T23:59:00.000Z'
    const dataItems = [{ qty_available: 12 }]

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(new RegExp(`/api/v2/analytics/${legacyId}/reports/stocks\\?as_of=`))
        .reply((config) => {
          expect(config.url).toContain(`as_of=${encodeURIComponent(asOf)}`)
          return [
            200,
            {
              count: 1,
              results: [
                {
                  metric: { job: 'reports_stocks', user: faker.datatype.uuid() },
                  count: 1,
                  values: dataItems
                },
                {
                  metric: { job: 'reports_stocks_meta', user: faker.datatype.uuid() },
                  count: 1,
                  values: [{ count: 1 }]
                },
                {
                  metric: { job: 'reports_stocks_filtered_meta', user: faker.datatype.uuid() },
                  count: 1,
                  values: [{ count: 1 }]
                }
              ]
            }
          ]
        })
    }

    const th = await initThInstance()
    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    const { data } = await analyticsReportsStocks.getAll({ as_of: asOf })

    expect(data).toEqual(dataItems)
  })

  it('does not send start or end even when callers still pass them', async () => {
    const asOf = '2025-12-31T23:59:00.000Z'
    const dataItems = [{ qty_available: 12 }]

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(new RegExp(`/api/v2/analytics/${legacyId}/reports/stocks`))
        .reply((config) => {
          expect(config.url).toContain(`as_of=${encodeURIComponent(asOf)}`)
          expect(config.url).not.toMatch(/[?&]start=/)
          expect(config.url).not.toMatch(/[?&]end=/)
          return [
            200,
            {
              count: 1,
              results: [
                {
                  metric: { job: 'reports_stocks', user: faker.datatype.uuid() },
                  count: 1,
                  values: dataItems
                },
                {
                  metric: { job: 'reports_stocks_meta', user: faker.datatype.uuid() },
                  count: 1,
                  values: [{ count: 1 }]
                },
                {
                  metric: { job: 'reports_stocks_filtered_meta', user: faker.datatype.uuid() },
                  count: 1,
                  values: [{ count: 1 }]
                }
              ]
            }
          ]
        })
    }

    const th = await initThInstance()
    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    const legacyQuery: StocksExportOptions = {
      as_of: asOf,
      start: '2026-01-01T00:00:00.000Z',
      end: '2026-01-31T23:59:59.999Z'
    }

    const { data } = await analyticsReportsStocks.getAll(legacyQuery)

    expect(data).toEqual(dataItems)
  })

  it('does not send nested start or end on the stocks report query', async () => {
    const asOf = '2025-12-31T23:59:00.000Z'

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(new RegExp(`/api/v2/analytics/${legacyId}/reports/stocks`))
        .reply((config) => {
          expect(config.url).toContain(`as_of=${encodeURIComponent(asOf)}`)
          expect(config.url).not.toMatch(/[?&]start=/)
          expect(config.url).not.toMatch(/[?&]end=/)
          return [
            200,
            {
              count: 1,
              results: [
                {
                  metric: { job: 'reports_stocks', user: faker.datatype.uuid() },
                  count: 0,
                  values: []
                },
                {
                  metric: { job: 'reports_stocks_meta', user: faker.datatype.uuid() },
                  count: 1,
                  values: [{ count: 0 }]
                },
                {
                  metric: { job: 'reports_stocks_filtered_meta', user: faker.datatype.uuid() },
                  count: 1,
                  values: [{ count: 0 }]
                }
              ]
            }
          ]
        })
    }

    const th = await initThInstance()
    const analyticsReportsStocks = th.analyticsHandlers().analytics.reports.AnalyticsReportsStocks

    const nestedLegacyQuery: StocksExportOptions = {
      query: {
        as_of: asOf,
        start: '2026-01-01T00:00:00.000Z',
        end: '2026-01-31T23:59:59.999Z'
      }
    }

    await analyticsReportsStocks.getAll(nestedLegacyQuery)
  })

  it('does not send start or end on the stocks export query', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(new RegExp(`/api/v2/analytics/${legacyId}/reports/stocks`))
        .reply((config) => {
          expect(config.url).toContain('format=csv')
          expect(config.url).not.toMatch(/[?&]start=/)
          expect(config.url).not.toMatch(/[?&]end=/)
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

    const legacyExportQuery: StocksExportOptions = {
      query: {
        as_of: '2025-12-31T23:59:00.000Z',
        format: 'csv',
        start: '2026-01-01T00:00:00.000Z',
        end: '2026-01-31T23:59:59.999Z'
      }
    }

    const { data } = await analyticsReportsStocks.export(legacyExportQuery)

    expect(Array.isArray(data)).toBe(true)
    expect(data[0].correlationId).toBe(correlationId)
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
