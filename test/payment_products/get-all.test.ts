import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { PaymentProducts } from '../../src/v0/payment_products'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'

const mockPaymentProducts = [
  {
    state: 'active',
    type: 'credit_card',
    processingPlatformIdentifier: 'stripe',
    salesStream: [
      {
        id: 'stream-123',
        active: true,
        name: 'Main Sales Stream',
        type: 'online',
        businessUnit: {
          unzerId: 'unzer-123'
        }
      }
    ]
  },
  {
    state: 'inactive',
    type: 'paypal',
    processingPlatformIdentifier: 'paypal',
    salesStream: [
      {
        id: 'stream-456',
        active: false,
        name: 'PayPal Stream',
        type: 'online',
        businessUnit: {
          unzerId: 'unzer-456'
        }
      }
    ]
  }
]

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: PaymentProducts: can get all', () => {
  it("PaymentProducts class is instantiable and can fetch all payment products", async () => {
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
            count: mockPaymentProducts.length,
            results: mockPaymentProducts,
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    // Direct instantiation since it might not be exposed in the main client yet
    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    expect(paymentProducts).toBeInstanceOf(PaymentProducts)

    const { data } = await paymentProducts.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(2)
    expect(data[0]).toMatchObject({
      state: 'active',
      type: 'credit_card',
      processingPlatformIdentifier: 'stripe'
    })
    expect(data[1]).toMatchObject({
      state: 'inactive',
      type: 'paypal',
      processingPlatformIdentifier: 'paypal'
    })
  })

  it('can fetch payment products with query parameters', async () => {
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
            results: [mockPaymentProducts[0]],
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    const { data } = await paymentProducts.getAll({
      limit: 10,
      query: {
        active: true,
        type: 'credit_card'
      }
    })

    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(1)
    expect(data[0]).toMatchObject({
      state: 'active',
      type: 'credit_card',
      processingPlatformIdentifier: 'stripe'
    })
  })

  it('handles pagination with cursors correctly', async () => {
    const firstPageResponse = {
      count: 2,
      results: [mockPaymentProducts[0]],
      cursors: {
        after: 'cursor-next-page'
      }
    }

    const secondPageResponse = {
      count: 2,
      results: [mockPaymentProducts[1]],
      cursors: {}
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
        return [200, firstPageResponse]
      })

      mock.onGet('cursor-next-page').reply(() => {
        return [200, secondPageResponse]
      })
    }

    const th = await initThInstance()

    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    // First page
    const firstPage = await paymentProducts.getAll()
    expect(firstPage.data).toHaveLength(1)
    expect(firstPage.next).toBeDefined()
    expect(firstPage.metadata.cursor).toEqual({ after: 'cursor-next-page' })

    // Second page
    if (firstPage.next) {
      const secondPage = await firstPage.next()
      expect(secondPage.data).toHaveLength(1)
      expect(secondPage.next).toBeUndefined()
      expect(secondPage.data[0]).toMatchObject({
        state: 'inactive',
        type: 'paypal'
      })
    }
  })

  it('handles complex payment product structure correctly', async () => {
    const complexPaymentProduct = {
      state: 'active',
      type: 'bank_transfer',
      processingPlatformIdentifier: 'adyen',
      salesStream: [
        {
          id: 'stream-complex-1',
          active: true,
          name: 'Complex Sales Stream 1',
          type: 'pos',
          businessUnit: {
            unzerId: 'unzer-complex-1'
          }
        },
        {
          id: 'stream-complex-2',
          active: false,
          name: 'Complex Sales Stream 2',
          type: 'online',
          businessUnit: {
            unzerId: 'unzer-complex-2'
          }
        }
      ]
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
            count: 1,
            results: [complexPaymentProduct],
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    const { data } = await paymentProducts.getAll()

    expect(data).toHaveLength(1)
    expect(data[0]).toMatchObject({
      state: 'active',
      type: 'bank_transfer',
      processingPlatformIdentifier: 'adyen'
    })
    expect(data[0].salesStream).toHaveLength(2)
    expect(data[0].salesStream?.[0]).toMatchObject({
      id: 'stream-complex-1',
      active: true,
      name: 'Complex Sales Stream 1',
      type: 'pos'
    })
    expect(data[0].salesStream?.[1]).toMatchObject({
      id: 'stream-complex-2',
      active: false,
      name: 'Complex Sales Stream 2',
      type: 'online'
    })
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

    const th = await initThInstance()

    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    try {
      await paymentProducts.getAll()
      fail('Expected PaymentProductsFetchFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('PaymentProductsFetchFailed')
    }
  })

  it('throws PaymentProductsFetchFailed on network error', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/payment-products/${legacyId}`).networkError()
    }

    const th = await initThInstance()

    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    try {
      await paymentProducts.getAll()
      fail('Expected PaymentProductsFetchFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('PaymentProductsFetchFailed')
    }
  })

  it('handles empty results correctly', async () => {
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
            count: 0,
            results: [],
            cursors: {}
          }
        ]
      })
    }

    const th = await initThInstance()

    const paymentProducts = new PaymentProducts({ user: legacyId }, th.http!)

    const { data } = await paymentProducts.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toHaveLength(0)
  })
})
