import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
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

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Email: can get mailjet configuration', () => {
  const mockMailjetConfiguration = {
    credentials: {
      apiKey: 'test-api-key',
      apiSecret: 'test-api-secret'
    },
    settings: {
      emails: [
        {
          name: 'Test User',
          email: 'test@example.com',
          isDefault: true
        }
      ]
    }
  }

  it("Tillhub's email handler can get mailjet configuration", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/email/${legacyId}/mailjet-configuration`).reply(() => {
        return [
          200,
          {
            results: mockMailjetConfiguration,
            status: 200,
            msg: 'Success'
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

    const email = th.email()
    expect(email).toBeInstanceOf(v0.Email)

    const { data, status, msg } = await email.getMailjetConfiguration()

    expect(typeof data).toBe('object')
    expect(data?.credentials.apiKey).toBe('test-api-key')
    expect(data?.credentials.apiSecret).toBe('test-api-secret')
    expect(Array.isArray(data?.settings.emails)).toBe(true)
    expect(data?.settings.emails[0].name).toBe('Test User')
    expect(data?.settings.emails[0].email).toBe('test@example.com')
    expect(data?.settings.emails[0].isDefault).toBe(true)
    expect(status).toBe(200)
    expect(msg).toBe('Success')
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

      mock.onGet(`https://api.tillhub.com/api/v0/email/${legacyId}/mailjet-configuration`).reply(() => {
        return [500]
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
      await th.email().getMailjetConfiguration()
    } catch (err: any) {
      expect(err.name).toBe('EmailCredentialsFetchFailed')
    }
  })
})
