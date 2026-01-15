import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../../src/tillhub-js'
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

describe('v1: AnalyticsReportsCommunications', () => {
  it('can get communications analytics reports', async () => {
    const dataItems = [{ value: '1' }]

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/notifications/reports/communications/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              cursors: {
                after: faker.internet.url()
              },
              count: dataItems.length,
              results: dataItems
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsCommunications = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsCommunications

    expect(analyticsReportsCommunications).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsCommunications)

    const { data, metadata, next } = await analyticsReportsCommunications.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(dataItems)
    expect(metadata.count).toEqual(dataItems.length)

    // Also able to paginate
    expect(typeof next).toBe('function')
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

    try {
      await analyticsReportsCommunications.getAll()
    } catch (err: any) {
      expect(err.name).toBe('ReportsCommunicationsFetchAllFailed')
    }
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

    try {
      await analyticsReportsCommunications.meta()
    } catch (err: any) {
      expect(err.name).toBe('ReportsCommunicationsMetaFailed')
    }
  })
})
