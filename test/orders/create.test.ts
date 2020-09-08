import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { initThInstance } from '../util'
import { v0 } from '../../src/tillhub-js'
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

const mock = new MockAdapter(axios)
const legacyId = '4564'
const orderId = 'asdf5566'
const createObject = {
  orderId,
  values: {
    id: '1234',
    open: false,
    deleted: false
  }
}

beforeEach(() => {
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

    mock.onPost(`https://api.tillhub.com/api/v0/orders/${legacyId}/${orderId}`).reply(() => {
      return [
        200,
        {
          count: 1,
          results: [{}]
        }
      ]
    })
  }
})

afterEach(() => {
  mock.reset()
})

describe('v0: Orders: can create Orders', () => {
  it("Tillhub's orders are instantiable", async () => {
    const th = await initThInstance()
    const orders = th.orders()
    expect(orders).toBeInstanceOf(v0.Orders)
    const { data } = await orders.create(createObject)
    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    try {
      const th = await initThInstance()
      await th.orders().create(createObject)
    } catch (err) {
      expect(err.name).toBe('OrdersCreateFailed')
    }
  })
})
