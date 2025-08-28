import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const keypairId = '123'
const transactionPayload = {
  amount: 100.50,
  currency: 'EUR',
  returnUrl: 'https://example.com/return',
  card3ds: true,
  paymentReference: 'payment-ref-123',
  orderId: 'order-456',
  invoiceId: 'invoice-789',
  effectiveInterestRate: '5.5',
  resources: {
    customerId: 'customer-123',
    typeId: 'type-456',
    metadataId: 'metadata-789',
    basketId: 'basket-321'
  },
  linkpayId: 'linkpay-654',
  additionalTransactionData: {
    card: {
      recurrenceType: 'single',
      brandTransactionId: 'brand-tx-123',
      settlementDay: '2024-01-15',
      exemptionType: 'none',
      liability: 'merchant',
      authentication: {
        verificationId: 'verify-123',
        resultIndicator: 'Y',
        dsTransactionId: 'ds-tx-456',
        protocolVersion: '2.1.0',
        authenticationStatus: 'Y',
        messageType: 'ARes',
        xId: 'x-id-789'
      }
    },
    riskData: {
      threatMetrixId: 'tm-123',
      customerGroup: 'premium',
      customerId: 'customer-456',
      confirmedAmount: 1000,
      confirmedOrders: 5,
      internalScore: 85,
      registrationLevel: 2,
      registrationDate: 1640995200
    },
    shipping: {
      deliveryTrackingId: 'track-123',
      deliveryService: 'DHL',
      returnTrackingId: 'return-456'
    },
    paypal: {
      checkoutType: 'express'
    },
    paylater: {
      targetDueDate: '2024-02-15',
      merchantComment: 'Test payment',
      merchantOrderId: 'merchant-order-123'
    },
    onlineTransfer: {
      targetDueDate: '2024-02-10'
    },
    termsAndConditionUrl: 'https://example.com/terms',
    privacyPolicyUrl: 'https://example.com/privacy'
  }
}

const expectedResult = {
  amount: 100.50,
  currency: 'EUR',
  returnUrl: 'https://example.com/return',
  card3ds: true,
  paymentReference: 'payment-ref-123',
  orderId: 'order-456',
  invoiceId: 'invoice-789'
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: Order Actions - Authorize Transaction', () => {
  it("Tillhub's order actions authorize method works correctly", async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/authorize`)
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

    const { data } = await orderActions.authorize(keypairId, transactionPayload)
    expect(data).toMatchObject(expectedResult)
  })

  it('handles minimal transaction payload correctly', async () => {
    const minimalTransaction = {
      amount: 50.00,
      currency: 'USD'
    }

    const minimalResult = {
      amount: 50.00,
      currency: 'USD'
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/authorize`)
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

    const { data } = await orderActions.authorize(keypairId, minimalTransaction)
    expect(data).toMatchObject(minimalResult)
  })

  it('handles transaction with card authentication correctly', async () => {
    const transactionWithAuth = {
      amount: 75.25,
      currency: 'EUR',
      card3ds: true,
      additionalTransactionData: {
        card: {
          authentication: {
            verificationId: 'verify-456',
            resultIndicator: 'Y',
            authenticationStatus: 'Y'
          }
        }
      }
    }

    const authResult = {
      amount: 75.25,
      currency: 'EUR',
      card3ds: true
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/authorize`)
        .reply(() => {
          return [
            200,
            {
              results: [authResult]
            }
          ]
        })
    }

    const th = await initThInstance()
    const orderActions = th.orderActionsV2()

    const { data } = await orderActions.authorize(keypairId, transactionWithAuth)
    expect(data).toMatchObject(authResult)
  })

  it('throws AuthorizeTransactionFailed on network error', async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/authorize`)
        .networkError()
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().authorize(keypairId, transactionPayload)
      fail('Expected AuthorizeTransactionFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('AuthorizeTransactionFailed')
    }
  })

  it('throws AuthorizeTransactionFailed on server error', async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/authorize`)
        .reply(() => {
          return [500, { error: 'Internal server error' }]
        })
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().authorize(keypairId, transactionPayload)
      fail('Expected AuthorizeTransactionFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('AuthorizeTransactionFailed')
    }
  })
})
