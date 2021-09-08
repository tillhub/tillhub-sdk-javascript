import { AnalyticsReportsV1ProductGroupsFetchError } from './../../../src/v1/analytics/reports/product_groups'
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

const productGroupsData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v1: AnalyticsReportsProductGroups', () => {
  it('can get product groups analytics reports export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/product_groups?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [productGroupsData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsProductGroups = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsProductGroups

    expect(analyticsReportsProductGroups).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsProductGroups)

    const { data } = await analyticsReportsProductGroups.getAll({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(productGroupsData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/product_groups?${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsProductGroups = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsProductGroups

    try {
      await analyticsReportsProductGroups.getAll({ query })
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsV1ProductGroupsFetchError.name)
    }
  })
})
