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

const legacyId = '4564'
const iamUserId = 'abc123'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: IamUser: can get one user', () => {
  it("Tillhub's devices are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{ id: iamUserId }]
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

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    const { data } = await iamUsers.get(iamUserId)

    expect(data).toEqual({ id: iamUserId })
  })

  it('can get user with has2faConfigured field', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [
              {
                id: iamUserId,
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                has2faConfigured: true
              }
            ]
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

    const iamUsers = th.iamUsers()

    const { data } = await iamUsers.get(iamUserId)

    expect(data).toEqual({
      id: iamUserId,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      has2faConfigured: true
    })
    expect(data.has2faConfigured).toBe(true)
  })

  it('can get user with hasBackupCodesConfigured field', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [
              {
                id: iamUserId,
                email: 'test@example.com',
                firstName: 'Test',
                lastName: 'User',
                has2faConfigured: true,
                hasBackupCodesConfigured: true
              }
            ]
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

    const iamUsers = th.iamUsers()

    const { data } = await iamUsers.get(iamUserId)

    expect(data).toEqual({
      id: iamUserId,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      has2faConfigured: true,
      hasBackupCodesConfigured: true
    })
    expect(data.hasBackupCodesConfigured).toBe(true)
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}`).reply(() => {
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
      await th.iamUsers().get(iamUserId)
    } catch (err: any) {
      expect(err.name).toBe('IamUserFetchFailed')
    }
  })
})
