import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics: gets Products Line Cancelation report', () => {
  it('gets line cancelation report per product', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/products/line_cancelation`
        )
        .reply(function (config) {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const Analytics = th.analytics()

    expect(Analytics).toBeInstanceOf(v0.Analytics)

    const { data } = await Analytics.getLineCancelationReport()

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/products/line_cancelation`
        )
        .reply(function (config) {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.analytics().getLineCancelationReport()
    } catch (err) {
      expect(err.name).toBe('LineCancelationReportFetchFailed')
    }
  })
})
