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
      error: undefined,
      emailsUpdated: false,
      defaultSenderChanged: false,
      updateCode: 'NONE',
      previousDefaultEmail: null,
      newDefaultEmail: null
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
    expect(data?.emailsUpdated).toBe(false)
    expect(data?.defaultSenderChanged).toBe(false)
    expect(data?.updateCode).toBe('NONE')
    expect(data?.previousDefaultEmail).toBeNull()
    expect(data?.newDefaultEmail).toBeNull()
    expect(status).toBe(200)
    expect(msg).toBe('Success')
  })

  it("Tillhub's email handler can get credential status with invalid credentials", async () => {
    const mockResponse = {
      hasCredentials: true,
      isValid: false,
      lastValidated: '2025-09-26T07:06:55.679Z',
      error: 'Credential validation failed: Unsuccessful: Status Code: "401" Message: "Request failed with status code 401"',
      emailsUpdated: false,
      defaultSenderChanged: false,
      updateCode: 'NONE',
      previousDefaultEmail: null,
      newDefaultEmail: null
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
    expect(data?.lastValidated).toBe('2025-09-26T07:06:55.679Z')
    expect(data?.error).toBe('Credential validation failed: Unsuccessful: Status Code: "401" Message: "Request failed with status code 401"')
    expect(data?.emailsUpdated).toBe(false)
    expect(data?.defaultSenderChanged).toBe(false)
    expect(data?.updateCode).toBe('NONE')
    expect(data?.previousDefaultEmail).toBeNull()
    expect(data?.newDefaultEmail).toBeNull()
    expect(status).toBe(200)
    expect(msg).toBe('Success')
  })

  it("Tillhub's email handler can get credential status with no credentials", async () => {
    const mockResponse = {
      hasCredentials: false,
      isValid: false,
      lastValidated: null,
      error: undefined,
      emailsUpdated: false,
      defaultSenderChanged: false,
      updateCode: 'NONE',
      previousDefaultEmail: null,
      newDefaultEmail: null
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
    expect(data?.emailsUpdated).toBe(false)
    expect(data?.defaultSenderChanged).toBe(false)
    expect(data?.updateCode).toBe('NONE')
    expect(data?.previousDefaultEmail).toBeNull()
    expect(data?.newDefaultEmail).toBeNull()
    expect(status).toBe(200)
    expect(msg).toBe('Success')
  })

  it("Tillhub's email handler handles complete backend response structure", async () => {
    const mockResponse = {
      hasCredentials: true,
      isValid: false,
      lastValidated: '2025-09-26T07:06:55.679Z',
      error: 'Credential validation failed: Unsuccessful: Status Code: "401" Message: "Request failed with status code 401"',
      emailsUpdated: false,
      defaultSenderChanged: false,
      updateCode: 'NONE',
      previousDefaultEmail: null,
      newDefaultEmail: null
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

    // Verify all fields match the exact backend response structure
    expect(typeof data).toBe('object')
    expect(data?.hasCredentials).toBe(true)
    expect(data?.isValid).toBe(false)
    expect(data?.lastValidated).toBe('2025-09-26T07:06:55.679Z')
    expect(data?.error).toBe('Credential validation failed: Unsuccessful: Status Code: "401" Message: "Request failed with status code 401"')
    expect(data?.emailsUpdated).toBe(false)
    expect(data?.defaultSenderChanged).toBe(false)
    expect(data?.updateCode).toBe('NONE')
    expect(data?.previousDefaultEmail).toBeNull()
    expect(data?.newDefaultEmail).toBeNull()
    expect(status).toBe(200)
    expect(msg).toBe('Success')
  })

  it("Tillhub's email handler handles response with sender list synced", async () => {
    const mockResponse = {
      hasCredentials: true,
      isValid: true,
      lastValidated: '2025-09-26T07:06:55.679Z',
      error: undefined,
      emailsUpdated: true,
      defaultSenderChanged: false,
      updateCode: 'MAILJET_SENDER_LIST_SYNCED',
      previousDefaultEmail: null,
      newDefaultEmail: 'new-sender@example.com'
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
    expect(data?.lastValidated).toBe('2025-09-26T07:06:55.679Z')
    expect(data?.error).toBeUndefined()
    expect(data?.emailsUpdated).toBe(true)
    expect(data?.defaultSenderChanged).toBe(false)
    expect(data?.updateCode).toBe('MAILJET_SENDER_LIST_SYNCED')
    expect(data?.previousDefaultEmail).toBeNull()
    expect(data?.newDefaultEmail).toBe('new-sender@example.com')
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
