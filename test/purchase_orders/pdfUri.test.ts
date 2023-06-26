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

const purchaseOrderId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const results = [{
  base64Content: 'sdfsdf',
  contentType: 'sdfsdf',
  filename: 'sdfsdf'
}]

describe('v0: Purchase Orders: can get PDF', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/purchase-orders/${legacyId}/${purchaseOrderId}/pdf`).reply(() => {
        return [
          200,
          { results }
        ]
      })
    }

    const th = await initThInstance()

    const PurchaseOrders = th.purchaseOrders()

    expect(PurchaseOrders).toBeInstanceOf(v0.PurchaseOrders)

    const { data, contentType, filename } = await PurchaseOrders.pdfUri(purchaseOrderId)

    expect(data).toMatch(results[0].base64Content)
    expect(contentType).toMatch(results[0].contentType)
    expect(filename).toMatch(results[0].filename)
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

      mock.onGet(`https://api.tillhub.com/api/v0/purchase-orders/${legacyId}/${purchaseOrderId}/pdf`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.purchaseOrders().pdfUri(purchaseOrderId)
    } catch (err: any) {
      expect(err.name).toBe('PurchaseOrdersPdfFailed')
    }
  })
})
