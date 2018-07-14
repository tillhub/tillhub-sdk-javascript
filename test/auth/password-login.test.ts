import * as dotenv from 'dotenv'
dotenv.config()
// import {Tillhub} from '../../src/tillhub-js'
import { v0, v1 } from '../../src/tillhub-js'

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

describe('Auth: make auth flow', () => {
  it('v0: Auth: Can make password auth implicitly', async () => {

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const auth = new v0.Auth(options)

    let [err, body] = await auth.authenticate()

    expect(err).toBeNull()
    expect(body).toBeTruthy()
    expect(typeof body.token === 'string').toBe(true)
    expect(typeof body.user === 'string').toBe(true)
  })

  it('v1: Auth: Can make password auth implicitly', async () => {

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const auth = new v1.Auth(options)

    let [err, body] = await auth.authenticate()

    expect(err).toBeNull()
    expect(body).toBeTruthy()
    expect(typeof body.token === 'string').toBe(true)
    expect(typeof body.user === 'string').toBe(true)
  })
})
