import * as dotenv from 'dotenv'
dotenv.config()
import {Tillhub} from '../src/tillhub-js'

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
  it('Tillhub is instantiable', () => {
    expect(new Tillhub(null)).toBeInstanceOf(Tillhub)
  })

  it('Tillhub is instantiable', () => {

    // const options = {
    //   credentials: {
    //     username: user.username,
    //     password: user.password
    //   },
    //   base: process.env.TILLHUB_BASE
    // }

    expect(
      new Tillhub()
    ).toBeInstanceOf(Tillhub)
  })
})
