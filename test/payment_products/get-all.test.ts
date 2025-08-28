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

const mockPaymentProduct = {
  state: 'active',
  type: 'credit_card',
  processingPlatformIdentifier: 'stripe',
  salesStream: {
    id: 'stream-123',
    active: true,
    name: 'Main Sales Stream',
    type: 'online',
    businessUnit: {
      unzerId: 'unzer-123'
    }
  }
}

describe('v0: PaymentProducts: can get all', () => {
  it("Tillhub's payment products are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/payment-products/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockPaymentProduct],
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    const paymentProducts = th.paymentProducts()

    expect(paymentProducts).toBeInstanceOf(v0.PaymentProducts)

    const { data } = await paymentProducts.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toContainEqual(mockPaymentProduct)
  })

  it('can fetch payment products with query parameters', async () => {
    const filteredProduct = {
      state: 'active',
      type: 'credit_card',
      processingPlatformIdentifier: 'stripe',
      salesStream: {
        id: 'stream-filtered',
        active: true,
        name: 'Filtered Stream',
        type: 'online',
        businessUnit: {
          unzerId: 'unzer-filtered'
        }
      }
    }

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

      mock.onGet(new RegExp(`https://api.tillhub.com/api/v0/payment-products/${legacyId}.*`)).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [filteredProduct],
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    const paymentProducts = th.paymentProducts()

    const { data } = await paymentProducts.getAll({
      limit: 10,
      query: {
        active: true,
        type: 'credit_card'
      }
    })

    expect(Array.isArray(data)).toBe(true)
    expect(data).toContainEqual(filteredProduct)
  })

  it('handles pagination with cursors correctly', async () => {
    const firstPageProduct = {
      ...mockPaymentProduct,
      id: 'first-page'
    }

    const secondPageProduct = {
      state: 'inactive',
      type: 'paypal',
      processingPlatformIdentifier: 'paypal',
      salesStream: {
        id: 'stream-second',
        active: false,
        name: 'Second Page Stream',
        type: 'online',
        businessUnit: {
          unzerId: 'unzer-second'
        }
      }
    }

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

      mock.onGet(`https://api.tillhub.com/api/v0/payment-products/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 2,
            results: [firstPageProduct],
            cursors: {
              after: 'cursor-next-page'
            }
          }
        ]
      })

      mock.onGet('cursor-next-page').reply(() => {
        return [
          200,
          {
            count: 2,
            results: [secondPageProduct],
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    const paymentProducts = th.paymentProducts()

    // First page
    const firstPage = await paymentProducts.getAll()
    expect(firstPage.data).toContainEqual(firstPageProduct)
    expect(firstPage.next).toBeDefined()
    expect(firstPage.metadata.cursor).toEqual({ after: 'cursor-next-page' })

    // Second page
    if (firstPage.next) {
      const secondPage = await firstPage.next()
      expect(secondPage.data).toContainEqual(secondPageProduct)
      expect(secondPage.next).toBeUndefined()
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

      mock.onGet(`https://api.tillhub.com/api/v0/payment-products/${legacyId}`).reply(() => {
        return [404, { error: 'Not found' }]
      })
    }

    try {
      const th = await initThInstance()
      await th.paymentProducts().getAll()
    } catch (err: any) {
      expect(err.name).toBe('PaymentProductsFetchFailed')
    }
  })
})
