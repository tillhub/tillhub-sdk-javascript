import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

describe('v0: paymentLinks: can create payment link', () => {
  const legacyId = '4564'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  const createRequest = {
    branchId: 'branch-1',
    currency: 'EUR',
    paymentLinkType: 'quick_charge' as const,
    totalAmount: 10.5,
    keypairId: 'kp-ecom-1'
  }

  const paymentPage = {
    id: 'pl-1',
    paymentPageUrl: 'https://pay.example.com/pl-1',
    customerEmail: 'test@example.com',
    customerMobileNo: '+49123456789'
  }

  it("Tillhub's payment links are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/payment-links/${legacyId}`).reply((config) => {
        expect(JSON.parse(config.data)).toMatchObject(createRequest)

        return [
          200,
          {
            msg: 'Created',
            count: 1,
            results: [paymentPage]
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

    const paymentLinks = th.paymentLinks()

    expect(paymentLinks).toBeInstanceOf(v0.PaymentLinks)

    const result = await paymentLinks.create(createRequest)

    expect(result.msg).toBe('Created')
    expect(result.metadata?.count).toBe(1)
    expect(result.data?.results?.[0]).toEqual(paymentPage)
  })

  it('rejects on status codes that are not 200/201', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/payment-links/${legacyId}`).reply(() => {
        return [400]
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

    await expect(th.paymentLinks().create(createRequest)).rejects.toMatchObject({
      name: 'PaymentLinksCreateFailed'
    })
  })
})
