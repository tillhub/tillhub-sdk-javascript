import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { PaymentOptions } from '../../../src/v0/analytics/reports/payment_options'
import { TillhubClient } from '../../../src/tillhub-js'

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

const legacyId = '4564'

describe('v0: Analytics Reports PaymentOptions: can get count number of all payment_options', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })
  it("Tillhub's payment_options are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/payment_options/meta`)
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

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const paymentOptions = th.analytics().paymentOptions()

    expect(paymentOptions).toBeInstanceOf(PaymentOptions)

    const { data } = await paymentOptions.meta()

    expect(data).toEqual({ count: 50 })
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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/payment_options/meta`)
        .reply(() => {
          return [205]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.analytics().paymentOptions().meta()
    } catch (err) {
      expect(err.name).toBe('ReportsPaymentOptionsMetaFailed')
    }
  })
})
