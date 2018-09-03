import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { TillhubClient } from '../src/tillhub-js'
import { Client } from '../src/Client'
import { Auth } from '../src/v1/Auth'

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

    let [err, body] = await th.auth.loginUsername(options)

    expect(err).toBeNull()
    expect(body).toBeTruthy()
    expect(typeof body.token === 'string').toBe(true)
    expect(body.token).toBe('sometoken')
    expect(typeof body.user === 'string').toBe(true)
    expect(body.user).toBe('4564')
    expect(th.auth.token).toBe('sometoken')
  })
})
