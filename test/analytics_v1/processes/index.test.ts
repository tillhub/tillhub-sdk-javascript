import { AnalyticsReportsV1ProcessesFetchError } from './../../../src/v1/analytics/reports/processes'
import * as dotenv from 'dotenv'
import qs from 'qs'
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

const query = {
  format: 'csv',
  start: '2019-03-18T22:59:59.999Z',
  end: '2019-03-07T23:00:00.000Z'
}

const processesData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v1: AnalyticsReportsProcesses', () => {
  it('can get processes analytics reports export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/processes?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [processesData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsProcesses = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsProcesses

    expect(analyticsReportsProcesses).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsProcesses)

    const { data } = await analyticsReportsProcesses.getAll({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(processesData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/processes?${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsProcesses = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsProcesses

    try {
      await analyticsReportsProcesses.getAll({ query })
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsV1ProcessesFetchError.name)
    }
  })
})
