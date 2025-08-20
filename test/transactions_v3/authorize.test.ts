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

describe('v3: transactions: can authorize transaction', () => {
  const legacyId = '4564'
  const keypairId = 'test-keypair-123'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  const mockTransaction = {
    amount: 100,
    currency: 'EUR',
    returnUrl: 'https://www.example.com/return',
    card3ds: false,
    paymentReference: 'payment-ref-123',
    orderId: 'order-123',
    invoiceId: 'invoice-123',
    effectiveInterestRate: '5.5',
    resources: {
      customerId: 's-cst-123456',
      typeId: 's-crd-123456',
      metadataId: 's-mtd-123456',
      basketId: 's-bsk-123456'
    },
    linkpayId: 'linkpay-123',
    additionalTransactionData: {
      card: {
        recurrenceType: 'unscheduled',
        brandTransactionId: 'brand-txn-123',
        settlementDay: '0312',
        exemptionType: 'lvp',
        liability: 'merchant',
        authentication: {
          verificationId: 'verify-123',
          resultIndicator: 'Y',
          dsTransactionId: 'ds-txn-123',
          protocolVersion: '2.1.0',
          authenticationStatus: 'Y',
          messageType: 'ARes',
          xId: 'x-id-123'
        }
      },
      riskData: {
        threatMetrixId: 'threat-123',
        customerGroup: 'NEUTRAL',
        customerId: 'C-122345',
        confirmedAmount: 2569,
        confirmedOrders: 14,
        internalScore: 95,
        registrationLevel: 1,
        registrationDate: 20160412
      },
      shipping: {
        deliveryTrackingId: '00340434286851877897',
        deliveryService: 'DHL',
        returnTrackingId: '00340434286851877898'
      },
      paypal: {
        checkoutType: 'express'
      },
      paylater: {
        targetDueDate: '2023-10-12',
        merchantComment: 'Test payment',
        merchantOrderId: 'merchant-order-123'
      },
      onlineTransfer: {
        targetDueDate: '2023-10-12 23:34:54'
      },
      termsAndConditionUrl: 'https://merchant-terms-url.com',
      privacyPolicyUrl: 'https://merchant-data-privacy-url.com'
    }
  }

  const mockTransactionResponse = {
    count: 1,
    results: [mockTransaction],
    msg: 'Transaction authorized successfully'
  }

  it("Tillhub's transactions can authorize transaction", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/authorize`).reply(() => {
        return [200, mockTransactionResponse]
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
      const { data } = await transactionsV3.authorize(keypairId, mockTransaction)
      expect(data).toEqual(mockTransaction)
    } catch (err: any) {
      expect(err.name).toBe('AuthorizeTransactionFailed')
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/authorize`).reply(() => {
        return [400, { error: 'Bad request' }]
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
      await transactionsV3.authorize(keypairId, mockTransaction)
    } catch (err: any) {
      expect(err.name).toBe('AuthorizeTransactionFailed')
    }
  })

  it('handles transaction with minimal data', async () => {
    const minimalTransaction = {
      amount: 50,
      currency: 'USD',
      returnUrl: 'https://www.example.com/return'
    }

    const minimalTransactionResponse = {
      count: 1,
      results: [minimalTransaction]
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/authorize`).reply(() => {
        return [200, minimalTransactionResponse]
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
      const { data } = await transactionsV3.authorize(keypairId, minimalTransaction)
      expect(data).toEqual(minimalTransaction)
    } catch (err: any) {
      expect(err.name).toBe('AuthorizeTransactionFailed')
    }
  })

  it('handles transaction with card authentication data', async () => {
    const transactionWithAuth = {
      amount: 200,
      currency: 'EUR',
      returnUrl: 'https://www.example.com/return',
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

    const authTransactionResponse = {
      count: 1,
      results: [transactionWithAuth]
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

      mock.onPost(`https://api.tillhub.com/api/v3/transactions/${legacyId}/authorize`).reply(() => {
        return [200, authTransactionResponse]
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
      const { data } = await transactionsV3.authorize(keypairId, transactionWithAuth)
      expect(data).toEqual(transactionWithAuth)
      expect(data.card3ds).toBe(true)
      expect(data.additionalTransactionData?.card?.authentication?.authenticationStatus).toBe('Y')
    } catch (err: any) {
      expect(err.name).toBe('AuthorizeTransactionFailed')
    }
  })
})
