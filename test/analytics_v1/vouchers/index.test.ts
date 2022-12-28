import { AnalyticsReportsV1VouchersFetchError } from './../../../src/v1/analytics/reports/vouchers'
import * as dotenv from 'dotenv'
import qs from 'qs'
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

const query = {
  format: 'csv',
  start: '2019-03-18T22:59:59.999Z',
  end: '2019-03-07T23:00:00.000Z'
}

const vouchersData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v1: AnalyticsReportsVouchers', () => {
  it('can get vouchers analytics reports export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/vouchers?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              cursor: {
                next: faker.internet.url()
              },
              results: [vouchersData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsVouchers = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsVouchers

    expect(analyticsReportsVouchers).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsVouchers)

    const { data } = await analyticsReportsVouchers.getAll({ query })

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(vouchersData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/vouchers?${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsVouchers = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsVouchers

    try {
      await analyticsReportsVouchers.getAll({ query })
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsV1VouchersFetchError.name)
    }
  })
})
