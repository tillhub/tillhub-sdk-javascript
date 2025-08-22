import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const keypairId = '123'
const transactionPayload = {
  amount: 150.75,
  currency: 'EUR',
  returnUrl: 'https://example.com/return',
  card3ds: false,
  paymentReference: 'payment-ref-456',
  orderId: 'order-789',
  invoiceId: 'invoice-123',
  effectiveInterestRate: '3.5',
  resources: {
    customerId: 'customer-789',
    typeId: 'type-123',
    metadataId: 'metadata-456',
    basketId: 'basket-654'
  },
  linkpayId: 'linkpay-987',
  additionalTransactionData: {
    card: {
      recurrenceType: 'recurring',
      brandTransactionId: 'brand-tx-456',
      settlementDay: '2024-01-20',
      exemptionType: 'low_risk',
      liability: 'issuer',
      authentication: {
        verificationId: 'verify-789',
        resultIndicator: 'N',
        dsTransactionId: 'ds-tx-123',
        protocolVersion: '2.2.0',
        authenticationStatus: 'N',
        messageType: 'CRes',
        xId: 'x-id-456'
      }
    },
    riskData: {
      threatMetrixId: 'tm-456',
      customerGroup: 'standard',
      customerId: 'customer-789',
      confirmedAmount: 500,
      confirmedOrders: 2,
      internalScore: 65,
      registrationLevel: 1,
      registrationDate: 1609459200
    },
    shipping: {
      deliveryTrackingId: 'track-456',
      deliveryService: 'UPS',
      returnTrackingId: 'return-789'
    },
    paypal: {
      checkoutType: 'standard'
    },
    paylater: {
      targetDueDate: '2024-03-01',
      merchantComment: 'Charge payment test',
      merchantOrderId: 'merchant-order-456'
    },
    onlineTransfer: {
      targetDueDate: '2024-02-25'
    },
    termsAndConditionUrl: 'https://example.com/terms-charge',
    privacyPolicyUrl: 'https://example.com/privacy-charge'
  }
}

const expectedResult = {
  amount: 150.75,
  currency: 'EUR',
  returnUrl: 'https://example.com/return',
  card3ds: false,
  paymentReference: 'payment-ref-456',
  orderId: 'order-789',
  invoiceId: 'invoice-123'
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v2: Order Actions - Charge Transaction', () => {
  it("Tillhub's order actions charge method works correctly", async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/charge`)
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

    const { data } = await orderActions.charge(keypairId, transactionPayload)
    expect(data).toMatchObject(expectedResult)
  })

  it('handles minimal transaction payload correctly', async () => {
    const minimalTransaction = {
      amount: 25.00,
      currency: 'USD'
    }

    const minimalResult = {
      amount: 25.00,
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/charge`)
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

    const { data } = await orderActions.charge(keypairId, minimalTransaction)
    expect(data).toMatchObject(minimalResult)
  })

  it('handles transaction with PayPal data correctly', async () => {
    const paypalTransaction = {
      amount: 99.99,
      currency: 'EUR',
      additionalTransactionData: {
        paypal: {
          checkoutType: 'express'
        },
        termsAndConditionUrl: 'https://example.com/terms',
        privacyPolicyUrl: 'https://example.com/privacy'
      }
    }

    const paypalResult = {
      amount: 99.99,
      currency: 'EUR'
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/charge`)
        .reply(() => {
          return [
            200,
            {
              results: [paypalResult]
            }
          ]
        })
    }

    const th = await initThInstance()
    const orderActions = th.orderActionsV2()

    const { data } = await orderActions.charge(keypairId, paypalTransaction)
    expect(data).toMatchObject(paypalResult)
  })

  it('handles transaction with risk data correctly', async () => {
    const riskTransaction = {
      amount: 200.00,
      currency: 'EUR',
      additionalTransactionData: {
        riskData: {
          threatMetrixId: 'tm-789',
          customerGroup: 'high-risk',
          customerId: 'customer-456',
          confirmedAmount: 2000,
          confirmedOrders: 10,
          internalScore: 95,
          registrationLevel: 3,
          registrationDate: 1577836800
        }
      }
    }

    const riskResult = {
      amount: 200.00,
      currency: 'EUR'
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/charge`)
        .reply(() => {
          return [
            200,
            {
              results: [riskResult]
            }
          ]
        })
    }

    const th = await initThInstance()
    const orderActions = th.orderActionsV2()

    const { data } = await orderActions.charge(keypairId, riskTransaction)
    expect(data).toMatchObject(riskResult)
  })

  it('throws ChargeTransactionFailed on network error', async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/charge`)
        .networkError()
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().charge(keypairId, transactionPayload)
      fail('Expected ChargeTransactionFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
    }
  })

  it('throws ChargeTransactionFailed on server error', async () => {
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
        .onPost(`https://api.tillhub.com/api/v2/orders/${legacyId}/charge`)
        .reply(() => {
          return [500, { error: 'Internal server error' }]
        })
    }

    try {
      const th = await initThInstance()
      await th.orderActionsV2().charge(keypairId, transactionPayload)
      fail('Expected ChargeTransactionFailed to be thrown')
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
    }
  })
})
