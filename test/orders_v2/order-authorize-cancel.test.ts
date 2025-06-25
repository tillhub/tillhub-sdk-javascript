import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const orderId = '123'
const results = {
  id: '111',
  amount: '100',
  currency: 'EUR'
}

const payload = {
  amount: 100,
  paymentReference: '123',
  reasonCode: 'RETURN'
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: Order Actions', () => {
  it("Tillhub's order actions are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/${orderId}/authorize/cancel`)
        .reply(() => {
          return [
            200,
            {
              results: [results]
            }
          ]
        })
    }

    const th = await initThInstance()

    const orderActions = th.orderActionsV2()

    expect(orderActions).toBeInstanceOf(v2.OrderActions)

    const { data } = await orderActions.orderCancel(orderId, payload)
    expect(data).toMatchObject(results)
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/${orderId}/authorize/cancel`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().orderCancel(orderId, payload)
    } catch (err: any) {
      expect(err.name).toBe('OrderCancelFailed')
    }
  })
})
