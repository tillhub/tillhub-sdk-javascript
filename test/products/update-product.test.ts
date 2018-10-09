import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { TillhubClient, v1 } from '../../src/tillhub-js'

let user = {
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

const requestObject = {
  productId: 'abc123',
  body: {
    name: 'iPhone',
    custom_id: '23455'
  }
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Products', () => {
  it('can update one', async () => {
    const { body, productId } = requestObject

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function(config) {
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
        .onPut(`https://api.tillhub.com/api/v1/products/${legacyId}/${productId}`)
        .reply(function(config) {
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

    const product = th.products()

    expect(product).toBeInstanceOf(v1.Products)

    const { data } = await product.update(requestObject)

    expect(data).toEqual(body)
  })

  it('rejects on status codes that are not 200', async () => {
    const { productId } = requestObject

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function(config) {
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

        .onPut(`https://api.tillhub.com/api/v1/products/${legacyId}/${productId}`)
        .reply(function(config) {
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
      await th.products().update(requestObject)
    } catch (err) {
      expect(err.name).toBe('ProductsUpdateFailed')
    }
  })
})
