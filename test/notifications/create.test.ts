import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const body = {
  email: 'andreas.hilbert@tillhub.de',
  lines: [
    {
      caption: 'tillhub.de',
      data: 'RT1B646F16',
      format: 'code128'
    },
    {
      caption: 'tillhub.de',
      data:
        '_R1-AT3_fiskaltrust3_ft5AB#1446_2019-01-28T17:30:06_0,00_0,00_0,00_0,00_18,00_H3UgNDo=_1e21054316210_r+rcj6xW+Ps=_hJML3CXjlt6jsZ0WhuDgSOkRSsuxkFpgL82nD1Rk1y/FbgZTPw8a56O15KFxIhkABng0W3vEUOZyYKo9tGyw7Q==',
      format: 'qr'
    }
  ],
  receipt_text: 'Some receipt text',
  text_items: {
    cart: {
      amount: {
        gross: 18,
        net: '15.13'
      },
      currency: 'EUR',
      tax: 2.87
    }
  },
  transaction_date: '2019-01-28T16:30:05.563Z'
}

const options = {
  type: 'receipts',
  body
}

describe('v0: Notifications: can email receipt', () => {
  it("Tillhub's notifications are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/notifications/${legacyId}/emails/receipts`)
        .reply(() => {
          return [
            200,
            {
              msg: 'Email for receipt sent.'
            }
          ]
        })
    }

    const th = await initThInstance()

    const Notifications = th.notifications()

    expect(Notifications).toBeInstanceOf(v0.Notifications)

    const resp = await Notifications.email(options)

    expect(resp).toMatchObject({ msg: 'Email for receipt sent.' })
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
        .onPost(`https://api.tillhub.com/api/v0/notifications/${legacyId}/emails/receipts`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.notifications().email(options)
    } catch (err) {
      expect(err.name).toBe('NotificationsEmailError')
    }
  })
})
