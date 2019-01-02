import qs from 'qs'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { v1 } from '../../src/tillhub-js'

let user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

const requestObject = {
  transactionId: '4d471a6c-1561-4aca-a5b5-1fdf478b8e86',
  template: 'invoice',
  query: {
    format: 'uri'
  }
}

function queryString() {
  return qs.stringify(requestObject.query)
}

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const results = 'some pdf uri'

describe('v1: Transactions', () => {
  it('can get pdf uri', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onPost(
          `https://api.tillhub.com/api/v1/transactions/${legacyId}/${
            requestObject.transactionId
          }/legacy/${requestObject.template}/pdf?${queryString()}`
        )
        .reply(function (config) {
          return [
            200,
            {
              results
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const transaction = th.transactions()

    expect(transaction).toBeInstanceOf(v1.Transactions)

    const { data } = await transaction.pdfUri(requestObject)

    expect(data).toEqual(results)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onPost(
          `https://api.tillhub.com/api/v1/transactions/${legacyId}/${
            requestObject.transactionId
          }/legacy/${requestObject.template}/pdf?${queryString()}`
        )
        .reply(function (config) {
          return [400]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.transactions().pdfUri(requestObject)
    } catch (err) {
      expect(err.name).toBe('TransactionPdfFailed')
    }
  })
})
