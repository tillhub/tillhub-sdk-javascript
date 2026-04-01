import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '45641'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const iamUserId = '1234'

describe('v0: IamUsers: can reset 2FA for the current user (me)', () => {
  it("Tillhub's iam users are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/reset-2fa`).reply(() => {
        return [200, {
          results: [{
            id: '123',
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            username: 'test@example.com',
            has2faConfigured: false
          }],
          msg: '2FA reset successfully',
          count: 1
        }]
      })
    }

    const th = await initThInstance()

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    const result = await iamUsers.setup2faActionMe()

    expect(result.data.has2faConfigured).toBe(false)
    expect(result.msg).toBe('2FA reset successfully')
    expect(result.metadata.count).toBe(1)
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/reset-2fa`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().setup2faActionMe()
    } catch (err: any) {
      expect(err.name).toBe('IamUserReset2faFailed')
    }
  })
})

describe('v0: IamUsers: can reset 2FA for one user', () => {
  it("Tillhub's iam users are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/reset-2fa`).reply(() => {
        return [200, {
          results: [{
            id: iamUserId,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            username: 'test@example.com',
            has2faConfigured: false
          }],
          msg: '2FA reset successfully',
          count: 1
        }]
      })
    }

    const th = await initThInstance()

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    await iamUsers.reset2fa(iamUserId)
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/reset-2fa`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().reset2fa(iamUserId)
    } catch (err: any) {
      expect(err.name).toBe('IamUserReset2faFailed')
    }
  })
})
