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

describe('v0: Email: can get custom mailjet credential status', () => {
  it("Tillhub's email handler can get credential status with valid credentials", async () => {
    const mockResponse = {
      hasCredentials: true,
      isValid: true,
      lastValidated: '2025-01-15T10:30:00Z',
      error: undefined
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

      mock.onGet(`https://api.tillhub.com/api/v0/email/${legacyId}/custom-mailjet-credential-status`).reply(() => {
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

    const { data, status, msg } = await email.getCustomMailjetCredentialStatus()

    expect(typeof data).toBe('object')
    expect(data?.hasCredentials).toBe(true)
    expect(data?.isValid).toBe(true)
    expect(data?.lastValidated).toBe('2025-01-15T10:30:00Z')
    expect(data?.error).toBeUndefined()
    expect(status).toBe(200)
    expect(msg).toBe('Success')
  })

  it("Tillhub's email handler can get credential status with invalid credentials", async () => {
    const mockResponse = {
      hasCredentials: true,
      isValid: false,
      lastValidated: '2025-01-14T15:45:00Z',
      error: 'Invalid API key'
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

      mock.onGet(`https://api.tillhub.com/api/v0/email/${legacyId}/custom-mailjet-credential-status`).reply(() => {
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

    const { data, status, msg } = await email.getCustomMailjetCredentialStatus()

    expect(typeof data).toBe('object')
    expect(data?.hasCredentials).toBe(true)
    expect(data?.isValid).toBe(false)
    expect(data?.lastValidated).toBe('2025-01-14T15:45:00Z')
    expect(data?.error).toBe('Invalid API key')
    expect(status).toBe(200)
    expect(msg).toBe('Success')
  })

  it("Tillhub's email handler can get credential status with no credentials", async () => {
    const mockResponse = {
      hasCredentials: false,
      isValid: false,
      lastValidated: null,
      error: undefined
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

      mock.onGet(`https://api.tillhub.com/api/v0/email/${legacyId}/custom-mailjet-credential-status`).reply(() => {
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

    const { data, status, msg } = await email.getCustomMailjetCredentialStatus()

    expect(typeof data).toBe('object')
    expect(data?.hasCredentials).toBe(false)
    expect(data?.isValid).toBe(false)
    expect(data?.lastValidated).toBeNull()
    expect(data?.error).toBeUndefined()
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

      mock.onGet(`https://api.tillhub.com/api/v0/email/${legacyId}/custom-mailjet-credential-status`).reply(() => {
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
      await th.email().getCustomMailjetCredentialStatus()
    } catch (err: any) {
      expect(err.name).toBe('EmailCustomMailjetCredentialStatusGetFailed')
    }
  })
})
