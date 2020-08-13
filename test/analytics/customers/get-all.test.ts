import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Customers } from '../../../src/v0/analytics/reports/customers'
import { TillhubClient } from '../../../src/tillhub-js'

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

const legacyId = '4564'
const branchNumber = 112233

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics: gets customers report', () => {
  it('gets customers report', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/customers`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const options = {
      credentials: { username: user.username, password: user.password },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const customers = th.analytics().customers()

    expect(customers).toBeInstanceOf(Customers)

    const { data } = await customers.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('takes a query string', async () => {
    const mockCustomersQuery = {
      format: 'csv',
      branch_number: branchNumber
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
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/customers?format=csv&branch_number=${branchNumber}`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
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

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const customers = th.analytics().customers()

    expect(customers).toBeInstanceOf(Customers)

    const { data } = await customers.getAll(mockCustomersQuery)

    expect(Array.isArray(data)).toBe(true)
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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/customers`)
        .reply(() => {
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

    try {
      await th.analytics().customers().getAll()
    } catch (err) {
      expect(err.name).toBe('CustomerFetchFailed')
    }
  })
})
