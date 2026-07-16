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

describe('v0: IamUsers: can resend an invitation for one user', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/resend-invite`).reply(() => {
        return [200, {
          results: [{
            id: iamUserId,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            username: 'test@example.com',
            hasPasswordConfigured: false,
            lastInviteSentAt: '2026-07-09T12:00:00.000Z',
            invitationExpired: false
          }],
          msg: 'Invitation resent successfully',
          count: 1
        }]
      })
    }

    const th = await initThInstance()

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    const { data } = await iamUsers.resendInvite(iamUserId)
    expect(data.lastInviteSentAt).toBe('2026-07-09T12:00:00.000Z')
    expect(data.invitationExpired).toBe(false)
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/resend-invite`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().resendInvite(iamUserId)
    } catch (err: any) {
      expect(err.name).toBe('IamUserResendInviteFailed')
    }
  })
})
