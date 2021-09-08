import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { TillhubClient, v0 } from '../../src/tillhub-js'
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

const requestObject = {
  stockId: 'abc123',
  body: {
    product: '1234',
    location: '4567',
    location_type: null,
    qty: 3
  }
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Stocks', () => {
  it('can update one', async () => {
    const { body, stockId } = requestObject

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

      mock.onPut(`https://api.tillhub.com/api/v0/stock/${legacyId}/${stockId}`).reply(() => {
        return [
          200,
          {
            results: body
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

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const stock = th.stocks()

    expect(stock).toBeInstanceOf(v0.Stocks)

    const { data } = await stock.update(requestObject)

    expect(data).toEqual(body)
  })

  it('rejects on status codes that are not 200', async () => {
    const { stockId } = requestObject

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(() => {
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

        .onPut(`https://api.tillhub.com/api/v0/stock/${legacyId}/${stockId}`)
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
      await th.stocks().update(requestObject)
    } catch (err: any) {
      expect(err.name).toBe('StocksUpdateFailed')
    }
  })
})
