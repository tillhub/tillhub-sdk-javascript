import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
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

describe('Auth: reset password flow', () => {
  it('v0: Auth: Can make password reset with email', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login/reset').reply(({ data }) => {
        const { email } = JSON.parse(data) as { email: string }
        return [
          200,
          {
            msg: email
          }
        ]
      })
    }

    const auth = new v0.Auth(options)

    try {
      const data = await auth.requestPasswordReset({
        email: 'test@test.de'
      })
      expect(data).toBeTruthy()
      expect(data.msg).toBe('test@test.de')
    } catch (err: any) {
      throw err
    }
  })

  it('v0: Auth: Can make password reset with email and organisation', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login/reset').reply(({ data }) => {
        const { email, organisation } = JSON.parse(data) as { email: string, organisation: string }
        return [
          200,
          {
            msg: `${email} - ${organisation}`
          }
        ]
      })
    }

    const auth = new v0.Auth(options)

    try {
      const data = await auth.requestPasswordResetWithOrganisation({
        email: 'test@test.de',
        organisation: 'Test'
      })
      expect(data).toBeTruthy()
      expect(data.msg).toBe('test@test.de - Test')
    } catch (err: any) {
      throw err
    }
  })
})
