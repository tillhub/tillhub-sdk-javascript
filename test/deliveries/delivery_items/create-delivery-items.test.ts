import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { v0 } from '../../../src/tillhub-js'

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
  query: {
    embed: ['location', 'product']
  },
  body: {
    items: [
      {
        product: 'd971002c-b360-4d99-bf7d-03c5cc6536ee',
        delivery: '3275ee2b-1892-4fe6-a0e8-7056141b7b33'
      },
      {
        product: '33e796b8-6e4d-478e-a2e5-9d5ca1940e04',
        delivery: '47c79fca-d292-4278-8857-3d170ff9599c'
      }
    ]
  }
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Deliveries: Items', () => {
  it('can create items', async () => {
    const { body } = requestObject

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
        .onPost(
          `https://api.tillhub.com/api/v0/deliveries/${legacyId}/items?embed[]=location&embed[]=product`
        )
        .reply(() => {
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

    const { data } = await delivery.createDeliveryItems(requestObject)

    expect(data).toEqual(body)
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
        .onPost(
          `https://api.tillhub.com/api/v0/deliveries/${legacyId}/items?embed[]=location&embed[]=product`
        )
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

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.deliveries().createDeliveryItems(requestObject)
    } catch (err: any) {
      expect(err.name).toBe('DeliveryItemsCreateFailed')
    }
  })
})
