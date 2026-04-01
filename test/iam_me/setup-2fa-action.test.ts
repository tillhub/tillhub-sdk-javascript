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
const tenantId = 'abc12345'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: IamMeClass: can setup 2FA action for the current user', () => {
  it('successfully resets 2FA', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/iam/me/${tenantId}/reset-2fa`)
        .reply(() => {
          return [
            200,
            {
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

    const iamMeClass = th.iamMeClass()

    expect(iamMeClass).toBeInstanceOf(v0.IamMeClass)

    const result = await iamMeClass.setup2faActionMe(tenantId)

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

      mock
        .onPost(`https://api.tillhub.com/api/v0/iam/me/${tenantId}/reset-2fa`)
        .reply(() => {
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
      await th.iamMeClass().setup2faActionMe(tenantId)
    } catch (err: any) {
      expect(err.name).toBe('IamMeSetup2faActionFailed')
    }
  })

  it('handles server errors correctly', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/iam/me/${tenantId}/reset-2fa`)
        .reply(() => {
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
      await th.iamMeClass().setup2faActionMe(tenantId)
    } catch (err: any) {
      expect(err.name).toBe('IamMeSetup2faActionFailed')
    }
  })
})
