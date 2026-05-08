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

describe('v0: IamUsers: can get user profile', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/profile`).reply(() => {
        return [200, {
          results: [{
            id: iamUserId,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            username: 'test@example.com',
            has2faConfigured: true,
            hasActiveSessions: true
          }],
          msg: 'ok',
          count: 1
        }]
      })
    }

    const th = await initThInstance()

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    const { data, msg, metadata } = await iamUsers.profile(iamUserId)

    expect(data).toEqual({
      id: iamUserId,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      username: 'test@example.com',
      has2faConfigured: true,
      hasActiveSessions: true
    })
    expect(msg).toBe('ok')
    expect(metadata).toEqual({ count: 1 })
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/profile`).reply(() => {
        return [404]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().profile(iamUserId)
    } catch (err: any) {
      expect(err.name).toBe('IamUserProfileFetchFailed')
    }
  })
})
