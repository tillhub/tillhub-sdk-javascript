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
    series: [
      {
        period: 'current',
        data: [5.5],
        total: 5.5,
        unit: 'EUR'
      },
      {
        period: 'previous',
        data: [0],
        total: 0,
        unit: 'EUR'
      }
    ]
  }
]

describe('v4: Analytics: can get revenue payment types', () => {
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
        .onGet(`https://api.tillhub.com/api/v4/analytics/${legacyId}/payment-options`)
        .reply(() => {
          return [200, { results }]
        })
    }

    const th = await initThInstance()

    const analytics = th.analyticsV4()

    expect(analytics).toBeInstanceOf(v4.Analytics)

    const { data } = await analytics.getRevenuePaymentTypes()
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
        .onGet(`https://api.tillhub.com/api/v4/analytics/${legacyId}/payment-options`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analyticsV4().getRevenuePaymentTypes()
    } catch (err: any) {
      expect(err.name).toBe('AnalyticsGetRevenuePaymentTypesFailed')
    }
  })
})
