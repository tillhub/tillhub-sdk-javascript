import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const body = {
  'to': '4f98a8da-294a-4371-a970-901cae6b39f7',
  'items': [
    {
      'transfer_value': 123.45,
      'currency': 'EUR'
    }
  ],
  'comment': 'asdfgh',
  'initiated_at': '2019-05-22T09:27:59.945Z',
  'from': '09a9a469-c16b-4b54-835d-692d05d218f9',
  'issuer': '456E438E3E0E47219FE9900870C4D328'
}

describe('v0: Safes: book a transfer', () => {
  it("Tillhub's safes are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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

      mock.onPost(`https://api.tillhub.com/api/v0/safes/${legacyId}/book`).reply(function (config) {
        return [
          200,
          {
            msg: 'Safes transfer was booked.'
          }
        ]
      })
    }

    const th = await initThInstance()

    const safes = th.safes()

    expect(safes).toBeInstanceOf(v0.Safes)

    const { data } = await safes.book(body)

    expect(data).toMatchObject({ msg: 'Safes transfer was booked.' })
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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

      mock.onPost(`https://api.tillhub.com/api/v0/safes/${legacyId}/book`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.safes().book(body)
    } catch (err) {
      expect(err.name).toBe('SafesBookFailed')
    }
  })
})
