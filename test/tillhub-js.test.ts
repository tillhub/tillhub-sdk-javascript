import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { TillhubClient } from '../src/tillhub-js'
import { Client } from '../src/Client'

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

    expect(th.options.base).toBe('https://api.tillhub.com')
  })
})
