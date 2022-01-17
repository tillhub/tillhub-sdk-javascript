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

const voucher = {
  format: 'xxxx',
  format_type: null,
  code: '1234'
}

describe('v0: Vouchers: can create a voucher', () => {
  it("Tillhub's Vouchers are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/vouchers/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [voucher],
            errors: []
          }
        ]
      })
    }

    const th = await initThInstance()

    const Vouchers = th.vouchers()

    expect(Vouchers).toBeInstanceOf(v0.Vouchers)

    const { data } = await Vouchers.create(voucher)

    expect(data).toMatchObject(voucher)
  })

  it('rejects on status codes that are not 200 with default message', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/vouchers/${legacyId}`).reply(() => {
        return [
          500,
          {
            msg: 'Something broke unexpectedly',
            request: {
              id: '1939cfba-5bd7-4535-9eb9-b98e11e45427'
            }
          }
        ]
      })
    }

    try {
      const th = await initThInstance()
      await th.vouchers().create(voucher)
    } catch (err: any) {
      expect(err.name).toBe('VoucherPostFailed')
    }
  })

  it('rejects on status codes that are not 409 with VoucherCodeConflict error', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/vouchers/${legacyId}`).reply(() => {
        return [
          409,
          {
            msg: 'this code has a conflict',
            request: {
              id: '1939cfba-5bd7-4535-9eb9-b98e11e45427'
            },
            error: {
              name: 'VoucherCodeConflict',
              message: 'some message'
            }
          }
        ]
      })
    }

    try {
      const th = await initThInstance()
      await th.vouchers().create(voucher)
    } catch (err: any) {
      expect(err.name).toBe('VoucherCodeConflict')
    }
  })
})
