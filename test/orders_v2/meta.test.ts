import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v2 } from '../../src/tillhub-js'
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

const legacyId = '4564'

const queryString = 'legacy=true&type=sale&branch_custom_id=192837'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: Orders: can get meta', () => {
  it("Tillhub's orders are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v2/orders/${legacyId}/meta?${queryString}`)
        .reply(() => {
          return [
            200,
            {
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

    const ordersV2 = th.ordersV2()

    expect(ordersV2).toBeInstanceOf(v2.Orders)

    try {
      const { data } = await ordersV2.meta()
      expect(data).toEqual({ count: 50 })
    } catch (err: any) {
      expect(err.name).toBe('OrdersFetchMetaFailed')
    }
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
        .onGet(`https://api.tillhub.com/api/v2/orders/${legacyId}/meta?${queryString}`)
        .reply(() => {
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

    try {
      await th.ordersV2().meta()
    } catch (err: any) {
      expect(err.name).toBe('OrdersFetchMetaFailed')
    }
  })
})
