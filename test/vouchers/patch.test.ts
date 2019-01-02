import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient, v0 } from '../../src/tillhub-js'

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

const legacyId = '4564'
const voucherId = '4564'

const voucherSource = {
  id: voucherId,
  amount: 9.99
}

const voucherTarget = {
  id: voucherId,
  amount: 10.99
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: vouchers: can patch one', () => {
  it("Tillhub's vouchers are instantiable", async () => {
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

      mock
        .onPatch(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}`)
        .reply(function (config) {
          return [
            200,
            {
              count: 1,
              results: [
                {
                  id: voucherId,
                  amount: 10.99
                }
              ]
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

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const vouchers = th.vouchers()

    expect(vouchers).toBeInstanceOf(v0.Vouchers)

    const { data, metadata } = await vouchers.patch(voucherSource as any, voucherTarget as any)

    if (!metadata) throw new Error('metadata must be defined')

    expect(metadata.patch).toEqual([{ op: 'replace', path: '/amount', value: 10.99 }])

    expect(Array.isArray(data)).toBe(false)
    expect((data as any).id).toBe(voucherId)
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

      mock
        .onPatch(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}`)
        .reply(function (config) {
          return [500]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.vouchers().patch(voucherSource as any, voucherTarget as any)
    } catch (err) {
      expect(err.name).toBe('VoucherPatchFailed')
    }
  })
})
