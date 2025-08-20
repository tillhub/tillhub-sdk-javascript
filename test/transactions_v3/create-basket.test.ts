import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v3 } from '../../src/tillhub-js'
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

describe('v3: transactions: can create basket', () => {
  const legacyId = '4564'
  const keypairId = 'test-keypair-123'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  const mockBasket = {
    id: 'basket-123',
    totalValueGross: 100,
    currencyCode: 'EUR',
    orderId: 'order-123',
    basketItems: [
      {
        basketItemReferenceId: 'item-ref-123',
        quantity: 1,
        vat: 10.1,
        amountDiscountPerUnitGross: 0,
        amountPerUnitGross: 100,
        title: 'Test Product',
        type: 'goods',
        unit: 'piece',
        subTitle: 'Test subtitle',
        imageUrl: 'https://example.com/image.jpg'
      }
    ]
  }

  const mockBasketResponse = {
    count: 1,
    results: [mockBasket],
    msg: 'Basket created successfully'
  }

  it("Tillhub's transactions can create basket", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/baskets`).reply(() => {
        return [200, mockBasketResponse]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const transactionsV3 = th.transactionsV3()

    expect(transactionsV3).toBeInstanceOf(v3.Transactions)

    try {
      const { data } = await transactionsV3.createBasket(keypairId, mockBasket)
      expect(data).toEqual(mockBasket)
    } catch (err: any) {
      expect(err.name).toBe('CreateBasketFailed')
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/baskets`).reply(() => {
        return [205]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const transactionsV3 = th.transactionsV3()

    try {
      await transactionsV3.createBasket(keypairId, mockBasket)
    } catch (err: any) {
      expect(err.name).toBe('CreateBasketFailed')
    }
  })

  it('handles basket with minimal data', async () => {
    const minimalBasket = {
      id: 'minimal-basket',
      totalValueGross: 50,
      currencyCode: 'USD'
    }

    const minimalBasketResponse = {
      count: 1,
      results: [minimalBasket]
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/baskets`).reply(() => {
        return [200, minimalBasketResponse]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const transactionsV3 = th.transactionsV3()

    try {
      const { data } = await transactionsV3.createBasket(keypairId, minimalBasket)
      expect(data).toEqual(minimalBasket)
    } catch (err: any) {
      expect(err.name).toBe('CreateBasketFailed')
    }
  })
})
