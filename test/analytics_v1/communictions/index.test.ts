import * as dotenv from 'dotenv'
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

describe('v1: AnalyticsReportsCommunications', () => {
  it('can get communications analytics reports', async () => {
    const dataItems = [{
      id: 'b57b9baa-c0ea-49d8-b1ca-7e7d2a3f835f',
      channel: 'sms',
      contentType: 'reservation_reminder',
      recipient: null,
      sentScheduledOn: '2026-07-21T08:00:00.000Z',
      createdBy: 'staff',
      status: 'sent',
      content: 'Your reservation is tomorrow.',
      reservationId: null
    }]
    const nextUri = 'https://api.tillhub.com/communications-next-page'

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              cursors: {
                before: null,
                after: nextUri
              },
              results: dataItems
            }
          ]
        })
      mock.onGet(nextUri).reply(200, { results: [] })
    }

    const th = await initThInstance()

    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    expect(analyticsReportsCommunications).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsCommunications)

    const { data, metadata, next } = await analyticsReportsCommunications.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(dataItems)
    expect(metadata).toEqual({
      count: undefined,
      cursor: {
        before: null,
        after: nextUri
      }
    })

    // Also able to paginate
    expect(typeof next).toBe('function')
    await expect(next?.()).resolves.toMatchObject({ data: [] })
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    await expect(analyticsReportsCommunications.getAll()).rejects.toMatchObject({
      name: 'ReportsCommunicationsFetchAllFailed'
    })
  })

  it('serializes communications report filters as flat query parameters', async () => {
    const query = {
      limit: 25,
      channel: 'email' as const,
      start: '2026-07-01T00:00:00.000Z',
      end: '2026-07-31T23:59:59.999Z',
      contentType: 'pay_od' as const,
      branchId: '4d497f21-2108-49a7-a61f-f7851d924f86',
      status: 'failed' as const,
      createdBy: 'customer' as const
    }
    const queryString = 'limit=25&channel=email&start=2026-07-01T00%3A00%3A00.000Z&end=2026-07-31T23%3A59%3A59.999Z&contentType=pay_od&branchId=4d497f21-2108-49a7-a61f-f7851d924f86&status=failed&createdBy=customer'

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}?${queryString}`)
        .reply(200, { results: [] })
      mock
        .onGet(`https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}/meta?${queryString}`)
        .reply(200, { results: [{ count: 0 }] })
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    await expect(analyticsReportsCommunications.getAll(query)).resolves.toMatchObject({ data: [] })
    await expect(analyticsReportsCommunications.meta(query)).resolves.toMatchObject({ data: { count: 0 } })
  })

  it('can get communications analytics reports metadata', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}/meta`)
        .reply(() => {
          return [
            200,
            {
              count: 50,
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    expect(analyticsReportsCommunications).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsCommunications)

    const { data } = await analyticsReportsCommunications.meta()

    expect(data).toEqual({ count: 50 })
  })

  it('rejects meta on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}/meta`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    await expect(analyticsReportsCommunications.meta()).rejects.toMatchObject({
      name: 'ReportsCommunicationsMetaFailed'
    })
  })

  it('can request a communications export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}/export?columnNames=true&delimiter=semicolon&documentType=CommunicationsStatisticsExport&enclosure=double&email=reports%40example.com&format=csv`
        )
        .reply(200, {
          results: [{ correlationId: 'export-job-id' }]
        })
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    const { data } = await analyticsReportsCommunications.export({
      columnNames: true,
      delimiter: 'semicolon',
      documentType: 'CommunicationsStatisticsExport',
      enclosure: 'double',
      email: 'reports@example.com',
      format: 'csv'
    })

    expect(data).toEqual({ correlationId: 'export-job-id' })
  })

  it('serializes export metadata and report filters as flat query parameters', async () => {
    const expectedUri = `https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}/export?status=unknown&channel=sms&start=2026-07-01&end=2026-07-31&columnNames=false&columns%5B0%5D=id&columns%5B1%5D=content&delimiter=comma&documentType=CommunicationsStatisticsExport&enclosure=single&email=reports%40example.com&emailLayout=communications&language=de&timezone=Europe%2FBerlin&filenamePrefix=communications-&format=xls&interval=1%20mons&startDate=2026-08-01`

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(expectedUri).reply(200, {
        results: [{ correlationId: 'custom-export-job-id' }]
      })
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    await expect(analyticsReportsCommunications.export({
      status: 'unknown',
      channel: 'sms',
      start: '2026-07-01',
      end: '2026-07-31',
      columnNames: false,
      columns: ['id', 'content'],
      delimiter: 'comma',
      documentType: 'CommunicationsStatisticsExport',
      enclosure: 'single',
      email: 'reports@example.com',
      emailLayout: 'communications',
      language: 'de',
      timezone: 'Europe/Berlin',
      filenamePrefix: 'communications-',
      format: 'xls',
      interval: '1 mons',
      startDate: '2026-08-01'
    })).resolves.toMatchObject({
      data: { correlationId: 'custom-export-job-id' }
    })
  })

  it('rejects export responses with non-200 status codes', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(new RegExp(`/communications/${legacyId}/export`)).reply(503)
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    await expect(analyticsReportsCommunications.export({
      columnNames: true,
      delimiter: 'semicolon',
      documentType: 'CommunicationsStatisticsExport',
      enclosure: 'double',
      email: 'reports@example.com',
      format: 'csv'
    })).rejects.toMatchObject({ name: 'ReportsCommunicationsExportFailed' })
  })

  it('rejects export transport failures', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(new RegExp(`/communications/${legacyId}/export`)).networkError()
    }

    const th = await initThInstance()
    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    await expect(analyticsReportsCommunications.export({
      columnNames: true,
      delimiter: 'semicolon',
      documentType: 'CommunicationsStatisticsExport',
      enclosure: 'double',
      email: 'reports@example.com',
      format: 'csv'
    })).rejects.toMatchObject({ name: 'ReportsCommunicationsExportFailed' })
  })
})
