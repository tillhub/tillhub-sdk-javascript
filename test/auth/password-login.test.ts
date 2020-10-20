import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0, v1 } from '../../src/tillhub-js'
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

describe('Auth: make auth flow', () => {
  it('v0: Auth: Can make password auth implicitly', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564',
              scopes: ['admin'],
              role: 'manager',
              display_name: 'big org'
            },
            features: {
              inventory: true
            }
          }
        ]
      })
    }

    const auth = new v0.Auth(options)

    try {
      const data = await auth.authenticate()
      expect(data).toBeTruthy()
      expect(typeof data.token === 'string').toBe(true)
      expect(typeof data.user === 'string').toBe(true)
      expect(typeof data.features === 'object').toBe(true)
      expect(Array.isArray(data.scopes)).toBe(true)
      expect(typeof data.role === 'string').toBe(true)
      expect(typeof data.orgName === 'string').toBe(true)
      expect(data.features).toEqual({ inventory: true })
    } catch (err) {
      throw err
    }
  })

  it('v1: Auth: Can make password auth implicitly', async () => {
    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: '4564'
            },
            features: {
              inventory: true
            }
          }
        ]
      })
    }

    const auth = new v1.Auth(options)

    try {
      const data = await auth.authenticate()
      expect(data).toBeTruthy()
      expect(typeof data.token === 'string').toBe(true)
      expect(typeof data.user === 'string').toBe(true)
      expect(typeof data.features === 'object').toBe(true)
      expect(data.features).toEqual({ inventory: true })
    } catch (err) {
      throw err
    }
  })
})
