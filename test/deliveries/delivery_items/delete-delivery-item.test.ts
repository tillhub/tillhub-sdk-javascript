import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { v0 } from '../../../src/tillhub-js'

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

const itemId = 'abc123'
const respMsg = `Deleted delivery item ${itemId}`

describe('v0: Deliveries', () => {
  it('can delete one', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)
      const legacyId = '4564'

      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function(config) {
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
        .onDelete(`https://api.tillhub.com/api/v0/deliveries/${legacyId}/items/${itemId}`)
        .reply(function(config) {
          return [
            200,
            {
              msg: respMsg
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

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const delivery = th.deliveries()

    expect(delivery).toBeInstanceOf(v0.Deliveries)

    const { msg } = await delivery.deleteDeliveryItem(itemId)

    expect(msg).toEqual(respMsg)
  })
})
