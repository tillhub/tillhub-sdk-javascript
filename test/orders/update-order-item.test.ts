import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient, v0 } from '../../src/tillhub-js'

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

let th: any
let options
const legacyId = '4564'
const mock = new MockAdapter(axios)

const itemId = '1q2w'
const orderItem = {
  order: '1q2w3',
  product: 'zxcv',
  added_at: '12/11/10',
  issuer: { name: 'Moshe' },
  order_qty: 4,
  auto: true,
  suggestion: true,
  location: 'Petah Tikva'
}
const requestObj = {
  itemId,
  item: orderItem
}

beforeEach(async () => {
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
      .onPut(`https://api.tillhub.com/api/v0/orders/${legacyId}/order_items/${itemId}`)
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

  options = {
    credentials: {
      username: user.username,
      password: user.password
    },
    base: process.env.TILLHUB_BASE
  }

  th = new TillhubClient()

  th.init(options)
  await th.auth.loginUsername({
    username: user.username,
    password: user.password
  })
})

afterEach(() => {
  mock.reset()
})

describe('v0: Orders: can update an Order Item', () => {
  it("Tillhub's orders are instantiable", async () => {
    const orders: any = th.orders()
    expect(orders).toBeInstanceOf(v0.Orders)
    const { data } = await orders.updateOrderItem(requestObj)
    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    try {
      await th.orders().updateOrderItem(requestObj)
    } catch (err) {
      expect(err.name).toBe('OrderItemUpdateFailed')
    }
  })
})
