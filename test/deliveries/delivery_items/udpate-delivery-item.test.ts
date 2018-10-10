import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { v0 } from '../../../src/tillhub-js'

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
  itemId: 'abc123',
  body: {
    qty: 15
  },
  query: {
    embed: ['location', 'product']
  }
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Deliveries: Items', () => {
  it('can update one', async () => {
    const { body, itemId } = requestObject

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
        .onPut(
          `https://api.tillhub.com/api/v0/deliveries/${legacyId}/items/${itemId}?embed[]=location&embed[]=product`
        )
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

    const delivery = th.deliveries()

    expect(delivery).toBeInstanceOf(v0.Deliveries)

    const { data } = await delivery.updateDeliveryItem(requestObject)

    expect(data).toEqual(body)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const { itemId } = requestObject

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
        .onPut(
          `https://api.tillhub.com/api/v0/deliveries/${legacyId}/items/${itemId}?embed[]=location&embed[]=product`
        )
        .reply(function(config) {
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

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.deliveries().updateDeliveryItem(requestObject)
    } catch (err) {
      expect(err.name).toBe('DeliveryItemUpdateFailed')
    }
  })
})
