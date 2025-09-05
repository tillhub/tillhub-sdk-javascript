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

describe('v0: Email: can set custom mailjet default sender', () => {
  it("Tillhub's email handler can set custom mailjet default sender", async () => {
    const request = { email: 'sender@example.com' }
    const mockResponse = { success: true }

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

      mock.onPost(`https://api.tillhub.com/api/v0/email/${legacyId}/custom-mailjet-default-sender`).reply(() => {
        return [
          200,
          {
            results: mockResponse,
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

    const { data, status, msg } = await email.setCustomMailjetDefaultSender(request)

    expect(typeof data).toBe('object')
    expect(data?.success).toBe(true)
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

      mock.onPost(`https://api.tillhub.com/api/v0/email/${legacyId}/custom-mailjet-default-sender`).reply(() => {
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

    const th = new TillhubClient()
    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.email().setCustomMailjetDefaultSender({ email: 'sender@example.com' })
    } catch (err: any) {
      expect(err.name).toBe('EmailCustomMailjetDefaultSenderSetFailed')
    }
  })
})
