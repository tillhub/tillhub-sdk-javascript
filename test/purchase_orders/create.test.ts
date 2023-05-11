import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const purchaseOrder = {
  purchaseOrderNumber: 'test',
  businessPartner: {
    id: 'test'
  }
}

describe('v0: Purchase Orders: can create purchase order', () => {
  it("Tillhub's purchase orders are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/purchase-orders/${legacyId}/products`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [purchaseOrder]
          }
        ]
      })
    }

    const th = await initThInstance()

    const purchaseOrders = th.purchaseOrders()

    expect(purchaseOrders).toBeInstanceOf(v0.PurchaseOrders)

    const { data } = await purchaseOrders.create(purchaseOrder)

    expect(data).toMatchObject(purchaseOrder)
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

      mock.onPost(`https://api.tillhub.com/api/v0/purchase-orders/${legacyId}/products`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.purchaseOrders().create(purchaseOrder)
    } catch (err: any) {
      expect(err.name).toBe('PurchaseOrdersCreationFailed')
    }
  })
})
