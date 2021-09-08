import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { v0 } from '../../src/tillhub-js'
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

const deliveryId = 'abc123'
const respMsg = `Deleted delivery ${deliveryId}`

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Deliveries', () => {
  it('can delete one', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
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
        .onDelete(`https://api.tillhub.com/api/v0/deliveries/${legacyId}/${deliveryId}`)
        .reply(() => {
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

    const { msg } = await delivery.deleteDelivery(deliveryId)

    expect(msg).toEqual(respMsg)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
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
        .onDelete(`https://api.tillhub.com/api/v0/deliveries/${legacyId}/${deliveryId}`)
        .reply(() => {
          return [400]
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

    try {
      await th.deliveries().deleteDelivery(deliveryId)
    } catch (err: any) {
      expect(err.name).toBe('DeliveriesDeleteFailed')
    }
  })
})
