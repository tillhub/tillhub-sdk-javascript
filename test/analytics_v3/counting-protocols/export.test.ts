import { AnalyticsReportsCountingProtocolsExportFetchError } from './../../../src/v2/analytics/reports/counting-protocols'
import * as dotenv from 'dotenv'
import qs from 'qs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v3 } from '../../../src/tillhub-js'
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
  date_start: '2019-03-18T22:59:59.999Z',
  date_end: '2019-03-07T23:00:00.000Z'
}
const FORMAT_CSV = qs.stringify({ format: 'csv' })

const countingProtocolsData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v3: AnalyticsReportsCountingProtocols', () => {
  it('can get counting protocols analytics reports export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v3/analytics/${legacyId}/reports/cashier_counting_protocols/overview?${FORMAT_CSV}&${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [countingProtocolsData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const AnalyticsReportsCountingProtocols = th.analyticsHandlersV3().analytics.reports.AnalyticsReportsCountingProtocols

    expect(AnalyticsReportsCountingProtocols).toBeInstanceOf(v3.analytics.reports.AnalyticsReportsCountingProtocols)

    const { data } = await AnalyticsReportsCountingProtocols.export({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(countingProtocolsData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v3/analytics/${legacyId}/reports/cashier_counting_protocols/overview?${FORMAT_CSV}&${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const AnalyticsReportsCountingProtocols = th.analyticsHandlersV3().analytics.reports.AnalyticsReportsCountingProtocols

    try {
      await AnalyticsReportsCountingProtocols.export({ query })
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsCountingProtocolsExportFetchError.name)
    }
  })
})
