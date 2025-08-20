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

describe('v3: transactions: can charge transaction', () => {
  const legacyId = '4564'
  const keypairId = 'test-keypair-123'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  const mockChargeTransaction = {
    amount: 150,
    currency: 'EUR',
    returnUrl: 'https://www.example.com/return',
    card3ds: true,
    paymentReference: 'charge-payment-ref-123',
    orderId: 'charge-order-123',
    invoiceId: 'charge-invoice-123',
    effectiveInterestRate: '3.5',
    resources: {
      customerId: 's-cst-789012',
      typeId: 's-crd-789012',
      metadataId: 's-mtd-789012',
      basketId: 's-bsk-789012'
    },
    linkpayId: 'charge-linkpay-123',
    additionalTransactionData: {
      card: {
        recurrenceType: 'scheduled',
        brandTransactionId: 'charge-brand-txn-123',
        settlementDay: '0415',
        exemptionType: 'tra',
        liability: 'issuer',
        authentication: {
          verificationId: 'charge-verify-123',
          resultIndicator: 'Y',
          dsTransactionId: 'charge-ds-txn-123',
          protocolVersion: '2.2.0',
          authenticationStatus: 'Y',
          messageType: 'CReq',
          xId: 'charge-x-id-123'
        }
      },
      riskData: {
        threatMetrixId: 'charge-threat-123',
        customerGroup: 'HIGH_VALUE',
        customerId: 'C-789012',
        confirmedAmount: 5000,
        confirmedOrders: 25,
        internalScore: 85,
        registrationLevel: 2,
        registrationDate: 20200101
      },
      shipping: {
        deliveryTrackingId: '12345678901234567890',
        deliveryService: 'UPS',
        returnTrackingId: '12345678901234567891'
      },
      paypal: {
        checkoutType: 'standard'
      },
      paylater: {
        targetDueDate: '2023-12-15',
        merchantComment: 'Charge transaction for premium service',
        merchantOrderId: 'charge-merchant-order-456'
      },
      onlineTransfer: {
        targetDueDate: '2023-12-15 15:30:00'
      },
      termsAndConditionUrl: 'https://merchant-terms-charge.com',
      privacyPolicyUrl: 'https://merchant-privacy-charge.com'
    }
  }

  const mockChargeResponse = {
    count: 1,
    results: [mockChargeTransaction],
    msg: 'Transaction charged successfully'
  }

  it("Tillhub's transactions can charge transaction", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/charge`).reply(() => {
        return [200, mockChargeResponse]
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
      const { data } = await transactionsV3.charge(keypairId, mockChargeTransaction)
      expect(data).toEqual(mockChargeTransaction)
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/charge`).reply(() => {
        return [402, { error: 'Payment required' }]
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
      await transactionsV3.charge(keypairId, mockChargeTransaction)
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
    }
  })

  it('handles charge transaction with minimal data', async () => {
    const minimalChargeTransaction = {
      amount: 25,
      currency: 'GBP',
      returnUrl: 'https://www.example.com/return'
    }

    const minimalChargeResponse = {
      count: 1,
      results: [minimalChargeTransaction]
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/charge`).reply(() => {
        return [200, minimalChargeResponse]
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
      const { data } = await transactionsV3.charge(keypairId, minimalChargeTransaction)
      expect(data).toEqual(minimalChargeTransaction)
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
    }
  })

  it('handles charge transaction with risk data', async () => {
    const transactionWithRisk = {
      amount: 500,
      currency: 'EUR',
      returnUrl: 'https://www.example.com/return',
      additionalTransactionData: {
        riskData: {
          threatMetrixId: 'risk-threat-789',
          customerGroup: 'HIGH_RISK',
          customerId: 'C-RISK-123',
          confirmedAmount: 1000,
          confirmedOrders: 5,
          internalScore: 40,
          registrationLevel: 0,
          registrationDate: 20230101
        }
      }
    }

    const riskTransactionResponse = {
      count: 1,
      results: [transactionWithRisk]
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/charge`).reply(() => {
        return [200, riskTransactionResponse]
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
      const { data } = await transactionsV3.charge(keypairId, transactionWithRisk)
      expect(data).toEqual(transactionWithRisk)
      expect(data.additionalTransactionData?.riskData?.customerGroup).toBe('HIGH_RISK')
      expect(data.additionalTransactionData?.riskData?.internalScore).toBe(40)
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
    }
  })

  it('handles charge transaction with shipping data', async () => {
    const transactionWithShipping = {
      amount: 75,
      currency: 'USD',
      returnUrl: 'https://www.example.com/return',
      additionalTransactionData: {
        shipping: {
          deliveryTrackingId: 'SHIP-123456789',
          deliveryService: 'FedEx',
          returnTrackingId: 'RETURN-123456789'
        }
      }
    }

    const shippingTransactionResponse = {
      count: 1,
      results: [transactionWithShipping]
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/charge`).reply(() => {
        return [200, shippingTransactionResponse]
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
      const { data } = await transactionsV3.charge(keypairId, transactionWithShipping)
      expect(data).toEqual(transactionWithShipping)
      expect(data.additionalTransactionData?.shipping?.deliveryService).toBe('FedEx')
    } catch (err: any) {
      expect(err.name).toBe('ChargeTransactionFailed')
    }
  })
})
