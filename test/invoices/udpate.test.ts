import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { v0 } from '../../src/tillhub-js'

const user = {
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
  invoiceId: 'abc123',
  query: {
    embed: ['customer', 'assignee', 'assigned_by']
  },
  body: {
    balance: 800,
    comments: 'test comment',
    customer: '9a125371-a7cd-413b-a7ad-9ed2c0070a6f',
    customer_external_reference_id: 'woeiru',
    amount: {
      net: 30.5
    },
    currency: 'EUR',
    issued_at: '2018-10-12T16:01:01.000Z',
    due_date: '2018-12-12T16:01:01.000Z',
    status: 'issued',
    archived: false,
    client_id: 'alksdjlaskdj',
    external_reference_id: 'sodijsdofij',
    external_reference: {
      id: 'someid'
    },
    metadata: {
      sku: '102938'
    },
    origins: ['02938'],
    related_to: ['34534'],
    depends_on: ['029345538'],
    deleted: false,
    active: true,
    assignee: 'cec7f3c3-099b-4562-9284-b4ab31b8b087',
    assigned_by: '25505ba1-277f-4fad-9c8f-d5d08c1ec47e'
  }
}

const queryString = requestObject.query.embed
  .map((item) => {
    return `embed[]=${item}`
  })
  .join('&')

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Invoices', () => {
  it('can update one', async () => {
    const { body } = requestObject

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
        .onPut(
          `https://api.tillhub.com/api/v0/invoices/${legacyId}/${requestObject.invoiceId}?${queryString}`
        )
        .reply(() => {
          return [
            200,
            {
              results: body
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

    const invoice = th.invoices()

    expect(invoice).toBeInstanceOf(v0.Invoices)

    const { data } = await invoice.update(requestObject)

    expect(data).toEqual(body)
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
      mock
        .onPut(
          `https://api.tillhub.com/api/v0/invoices/${legacyId}/${requestObject.invoiceId}?${queryString}`
        )
        .reply(() => {
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
      await th.invoices().update(requestObject)
    } catch (err) {
      expect(err.name).toBe('InvoicesUpdateFailed')
    }
  })
})
