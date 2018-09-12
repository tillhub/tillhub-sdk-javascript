import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { TillhubClient, v0 } from '../src/tillhub-js'
import { Client } from '../src/client'
import { Auth } from '../src/v1'

let user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

describe('SDK: can instantiate SDK', () => {
  class LocalStorageMock {
    private store = {}

    clear() {
      this.store = {}
    }

    getItem(key: string) {
      return this.store[key] || null
    }

    setItem(key: string, value: string) {
      this.store[key] = value
    }

    removeItem(key: string) {
      delete this.store[key]
    }
  }

  const localStorage = new LocalStorageMock()

  it('Tillhub SDK is instantiable and is instance of Tillhub client', () => {
    expect(th).toBeInstanceOf(TillhubClient)
  })

  it('Base has been set automatically', () => {
    expect(th.options.base).toBe('https://api.tillhub.com')
  })

  it('Can call init with new options', () => {
    th.init({
      base: 'https://staging-api.tillhub.com'
    })

    expect(th.options.base).toBe('https://staging-api.tillhub.com')
    expect(th.auth).toBeInstanceOf(Auth)
  })

  it('Can do login from instance', async () => {
    const options = {
      username: user.username,
      password: user.password
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://staging-api.tillhub.com/api/v0/users/login').reply(function(config) {
        return [
          200,
          {
            token: 'sometoken',
            user: {
              id: '123',
              legacy_id: '4564'
            }
          }
        ]
      })
    }

    try {
      let { token, user } = await th.auth.loginUsername(options)

      localStorage.setItem('token', 'mockToken')
      localStorage.setItem('user', 'mockUser')

      expect(typeof token === 'string').toBe(true)
      expect(token).toBe('sometoken')
      expect(typeof user === 'string').toBe(true)
      expect(user).toBe('4564')
      expect(th.auth.token).toBe('sometoken')
      expect(th.auth.authenticated).toBe(true)
    } catch (err) {
      throw err
    }
  })

  it('can rehydrate', () => {
    th.init({
      base: 'https://staging-api.tillhub.com',
      credentials: {
        token: localStorage.getItem('token')
      },
      user: localStorage.getItem('user')
    })

    expect(th.auth.token).toBe('mockToken')
    expect(th.auth.authenticated).toBe(true)

    const transactions = th.transactions()

    expect(transactions).toBeInstanceOf(v0.Transactions)
  })
})
