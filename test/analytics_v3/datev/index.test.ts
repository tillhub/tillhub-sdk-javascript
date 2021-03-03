import { AnalyticsReportsV3DatevExportFetchError } from './../../../src/v3/analytics/reports/datev'
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

const datevData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v3: AnalyticsReportsDatev', () => {
  it('can get datev analytics reports', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v3/analytics/${legacyId}/reports/datev?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [datevData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsDatev = th.analyticsHandlersV3().analytics.reports.AnalyticsReportsDatev

    expect(analyticsReportsDatev).toBeInstanceOf(v3.analytics.reports.AnalyticsReportsDatev)

    const { data } = await analyticsReportsDatev.export({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(datevData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v3/analytics/${legacyId}/reports/datev?${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsDatev = th.analyticsHandlersV3().analytics.reports.AnalyticsReportsDatev

    try {
      await analyticsReportsDatev.export({ query })
    } catch (err) {
      expect(err.name).toBe(AnalyticsReportsV3DatevExportFetchError.name)
    }
  })
})
