import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v4 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const results = [
  {
    periods: {
      current: {
        start: '2023-12-11T12:00:00.000Z',
        end: '2023-12-18T12:59:59.999Z'
      },
      previous: {
        start: '2023-12-04T11:00:00.000Z',
        end: '2023-12-11T11:59:59.999Z'
      }
    },
    window: 'hourly',
    axisLabels: [
      '4f8d6150-9f40-4e28-8622-8cbd8cdbf4fc',
      'db2f7f36-6cb2-4882-ac88-64b0a3a19b00',
      'e4b13ec8-b5f2-410a-badf-7a47290c2217'
    ],
    series: [
      {
        period: 'current',
        data: [2436.62, 98.31, 1.68],
        total: 2536.6099999999997,
        unit: 'EUR'
      },
      {
        period: 'current',
        data: [34, 1, 1],
        total: 36,
        unit: 'cartItemsSold'
      },
      {
        period: 'previous',
        data: [203.43, 1157.07, 313.85],
        total: 1674.35,
        unit: 'EUR'
      },
      {
        period: 'previous',
        data: [3, 21, 4],
        total: 28,
        unit: 'cartItemsSold'
      }
    ]
  }
]

describe('v4: Analytics: can get revenue top staff', () => {
  it("Tillhub's analytics are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v4/analytics/${legacyId}/revenue/top-staff`)
        .reply(() => {
          return [200, { results }]
        })
    }

    const th = await initThInstance()

    const analytics = th.analyticsV4()

    expect(analytics).toBeInstanceOf(v4.Analytics)

    const { data } = await analytics.getRevenueTopStaff()
    expect(data).toMatchObject(results[0])
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
        .onGet(`https://api.tillhub.com/api/v4/analytics/${legacyId}/revenue/top-staff`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analyticsV4().getRevenueTopStaff()
    } catch (err: any) {
      expect(err.name).toBe('AnalyticsGetRevenueTopStaffFailed')
    }
  })
})
