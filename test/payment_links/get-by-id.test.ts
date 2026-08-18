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

describe('v0: paymentLinks: can get payment link by id', () => {
  const legacyId = '4564'
  const paymentLinkId = 'pl-1'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  const paymentLink = {
    id: paymentLinkId,
    paymentLinkType: 'quick_charge',
    businessUnitUnzerId: 'bu-1',
    createdBy: 'test@example.com',
    createdAt: '2026-08-01T00:00:00.000Z',
    solutionType: 'LINKPAY',
    multiUse: true,
    expiresAt: '2026-09-01T00:00:00.000Z',
    alias: 'summer-sale',
    orderCount: 3
  }

  it('returns the extended detail envelope', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/payment-links/${legacyId}/${paymentLinkId}`).reply(() => {
        return [
          200,
          {
            msg: 'Success',
            count: 1,
            results: [paymentLink]
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

    const result = await paymentLinks.getById(paymentLinkId)

    expect(result).toEqual(paymentLink)
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

      mock.onGet(`https://api.tillhub.com/api/v0/payment-links/${legacyId}/${paymentLinkId}`).reply(() => {
        return [404]
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

    await expect(th.paymentLinks().getById(paymentLinkId)).rejects.toMatchObject({
      name: 'PaymentLinksGetByIdFailed'
    })
  })
})
