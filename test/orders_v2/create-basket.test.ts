import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const keypairId = '123'
const basketPayload = {
  id: 'basket-123',
  totalValueGross: 100.50,
  currencyCode: 'EUR',
  orderId: 'order-456',
  basketItems: [
    {
      basketItemReferenceId: 'item-1',
      quantity: 2,
      vat: 19,
      amountDiscountPerUnitGross: 5.00,
      amountPerUnitGross: 25.25,
      title: 'Test Product',
      type: 'product',
      unit: 'piece',
      subTitle: 'Test Product Subtitle',
      imageUrl: 'https://example.com/image.jpg'
    }
  ]
}

const expectedResult = {
  id: 'basket-123',
  totalValueGross: 100.50,
  currencyCode: 'EUR',
  orderId: 'order-456',
  basketItems: [
    {
      basketItemReferenceId: 'item-1',
      quantity: 2,
      vat: 19,
      amountDiscountPerUnitGross: 5.00,
      amountPerUnitGross: 25.25,
      title: 'Test Product',
      type: 'product',
      unit: 'piece',
      subTitle: 'Test Product Subtitle',
      imageUrl: 'https://example.com/image.jpg'
    }
  ]
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: Order Actions - Create Basket', () => {
  it("Tillhub's order actions createBasket method works correctly", async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/baskets`)
        .reply(() => {
          return [
            200,
            {
              results: [expectedResult]
            }
          ]
        })
    }

    const th = await initThInstance()
    const orderActions = th.orderActionsV2()

    expect(orderActions).toBeInstanceOf(v2.OrderActions)

    const { data } = await orderActions.createBasket(keypairId, basketPayload)
    expect(data).toMatchObject(expectedResult)
  })

  it('handles minimal basket payload correctly', async () => {
    const minimalBasket = {
      totalValueGross: 50.00,
      currencyCode: 'USD'
    }

    const minimalResult = {
      id: 'basket-minimal',
      totalValueGross: 50.00,
      currencyCode: 'USD'
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

      mock
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/baskets`)
        .reply(() => {
          return [
            200,
            {
              results: [minimalResult]
            }
          ]
        })
    }

    const th = await initThInstance()
    const orderActions = th.orderActionsV2()

    const { data } = await orderActions.createBasket(keypairId, minimalBasket)
    expect(data).toMatchObject(minimalResult)
  })

  it('throws CreateBasketFailed on network error', async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/baskets`)
        .networkError()
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().createBasket(keypairId, basketPayload)
      fail('Expected CreateBasketFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('CreateBasketFailed')
    }
  })

  it('throws CreateBasketFailed on server error', async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/baskets`)
        .reply(() => {
          return [500, { error: 'Internal server error' }]
        })
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().createBasket(keypairId, basketPayload)
      fail('Expected CreateBasketFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('CreateBasketFailed')
    }
  })
})
