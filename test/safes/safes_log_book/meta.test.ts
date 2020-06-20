import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { addMinutes, subMinutes } from 'date-fns'
import qs from 'qs'
dotenv.config()
import { TillhubClient, v0 } from '../../../src/tillhub-js'

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

const query = {
  operation: ['book'],
  exclude_errors: true,
  start: subMinutes(new Date(), 5).toISOString(),
  end: addMinutes(new Date(), 5).toISOString(),
  source_or_destination: '8f0e62c2-e457-4485-9e9e-fe6628295f8d',
  source: '5e9468f3-a064-498a-b0cf-69bc28a4aff3',
  destination: '95e22525-38f7-4640-8402-632c7722c254',
  transfer_type: ['safe_to_safe', 'pos_to_safe'],
  transfer_value_range_start: 10.5,
  transfer_value_range_end: 100,
  currency: 'EUR'
}

describe('v0: SafesLogBook: can get count of all safes log book entries', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })
  it("Tillhub's safes are instantiable", async () => {
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
          `https://api.tillhub.com/api/v0/safes/${legacyId}/logs/meta${qs.stringify(query, {
            addQueryPrefix: true
          })}`
        )
        .reply(() => {
          return [
            200,
            {
              results: [{ count: 50 }]
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

    const safesLogBook = th.safesLogBook()

    expect(safesLogBook).toBeInstanceOf(v0.SafesLogBook)

    const { data } = await safesLogBook.meta(query)

    expect(data).toEqual({ count: 50 })
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
        .onGet(
          `https://api.tillhub.com/api/v0/safes/${legacyId}/logs/meta${qs.stringify(query, {
            addQueryPrefix: true
          })}`
        )
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
      await th.safesLogBook().meta(query)
    } catch (err) {
      expect(err.name).toBe('SafesLogBookGetMetaFailed')
    }
  })
})
