import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { TillhubClient, v1 } from '../src/tillhub-js'
import { Client } from '../src/client'
import { Auth } from '../src/v1'
import { LocalStorageMock } from './util'

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

describe('SDK: can destroy SDK', () => {
  const localStorage = new LocalStorageMock()

  it('Tillhub SDK is instantiable and is instance of Tillhub client', () => {
    expect(th).toBeInstanceOf(TillhubClient)
  })

  it('Base has been set automatically', () => {
    if (!th.options) throw new Error('Options must be defined')
    expect(th.options.base).toBe('https://api.tillhub.com')
  })

  it('Can call init with new options', () => {
    th.init({
      base: 'https://staging-api.tillhub.com'
    })

    if (!th.options) throw new Error('Options must be defined')
    expect(th.options.base).toBe('https://staging-api.tillhub.com')
    expect(th.auth).toBeInstanceOf(Auth)
  })

  it('Can do login from instance', async () => {
    th.destroy()
    const options = {
      username: user.username,
      password: user.password
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://staging-api.tillhub.com/api/v0/users/login').reply(() => {
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
      const { token, user } = await th.auth.loginUsername(options)

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

  it('can destroy and re-hydrate externally', () => {
    th.destroy()

    const clientInstance = Client.getInstance({})

    expect(clientInstance.getClient().defaults.headers.common.Authorization).toBeUndefined()

    expect(th.auth).toBeDefined()
    expect(th.options).toBeUndefined()
    expect(th.http).toBeUndefined()
    expect(th.auth.authenticated).toBe(false)

    th.init({
      base: 'https://staging-api.tillhub.com',
      credentials: {
        token: localStorage.getItem('token')
      },
      user: localStorage.getItem('user')
    })

    expect(th.auth.token).toBe('mockToken')
    expect(clientInstance.getClient().defaults.headers.common.Authorization).toBe(
      'Bearer mockToken'
    )
    expect(th.auth.authenticated).toBe(true)

    const transactions = th.transactions()

    expect(transactions).toBeInstanceOf(v1.Transactions)
  })

  it('can destroy and login', async () => {
    th.destroy()

    const clientInstance = Client.getInstance({})

    expect(clientInstance.getClient().defaults.headers.common.Authorization).toBeUndefined()

    expect(th.auth).toBeDefined()
    expect(th.options).toBeUndefined()
    expect(th.http).toBeUndefined()
    expect(th.auth.authenticated).toBe(false)

    const options = {
      username: user.username,
      password: user.password
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

      mock.onPost('https://staging-api.tillhub.com/api/v0/users/login').reply(() => {
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
      const { token, user } = await th.auth.loginUsername(options)

      expect(typeof token === 'string').toBe(true)
      expect(token).toBe('sometoken')
      expect(typeof user === 'string').toBe(true)
      expect(user).toBe('4564')
      expect(th.auth.token).toBe('sometoken')
      expect(th.auth.authenticated).toBe(true)
      expect(clientInstance.getClient().defaults.headers.common.Authorization).toBe(
        'Bearer sometoken'
      )
    } catch (err) {
      throw err
    }
  })
})
