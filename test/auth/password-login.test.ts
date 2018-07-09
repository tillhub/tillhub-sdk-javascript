import dotenv from 'dotenv'
dotenv.config()
import Tillhub from '../../src/tillhub-js'

/**
 * Dummy test
 */
describe('Auth: make auth flow', () => {
  it('Can make password auth implicitly', async () => {
    const th = new Tillhub({
      user: process.env.TEST_USER,
      auth: {
        email: process.env.TEST_USER_EMAIL,
        password: process.env.TEST_USER_PASSWORD
      },
      endpoint: 'https://staging-api.tillhub.io'
    })

    let [err, body] = await th.auth.login()
    console.log(err)
    console.log(body)
  })
})
