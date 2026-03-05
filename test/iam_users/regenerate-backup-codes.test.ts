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

describe('v0: IamUsers: can send backup codes regeneration email for one user', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/send-backup-codes-regeneration-email`).reply(() => {
        return [200, {
          results: [{
            id: iamUserId,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            username: 'test@example.com'
          }],
          msg: 'Backup codes regeneration requested successfully',
          count: 1
        }]
      })
    }

    const th = await initThInstance()

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    await iamUsers.sendBackupCodesRegenerationEmail(iamUserId)
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/users/${legacyId}/${iamUserId}/send-backup-codes-regeneration-email`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().sendBackupCodesRegenerationEmail(iamUserId)
    } catch (err: any) {
      expect(err.name).toBe('IamUserRegenerateBackupCodesFailed')
    }
  })
})
