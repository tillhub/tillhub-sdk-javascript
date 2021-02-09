import * as dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const pin = {
  provided_pin: '1234',
  pin_length: 4
}
const queryString = qs.stringify(pin, { addQueryPrefix: true })

describe('v0: Staff: can get a unique pin number', () => {
  it("Tillhub's staff are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/pin`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Staff = th.staff()

    expect(Staff).toBeInstanceOf(v0.Staff)

    const { data } = await Staff.getPin()

    expect(Array.isArray(data)).toBe(true)
  })

  it('can send a user provided pin to determine if unique', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock.onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/pin${queryString}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Staff = th.staff()

    expect(Staff).toBeInstanceOf(v0.Staff)

    const { data } = await Staff.getPin(pin)

    expect(Array.isArray(data)).toBe(true)
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

      mock.onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/pin`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.staff().getPin()
    } catch (err) {
      expect(err.name).toBe('StaffPinGetFailed')
    }
  })

  it('rejects on status code 409', async () => {
    const errorName = 'ErrorName'
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

      mock.onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/pin${queryString}`).reply(() => {
        return [
          409,
          {
            name: 'ErrorName'
          }
        ]
      })
    }

    try {
      const th = await initThInstance()
      await th.staff().getPin(pin)
    } catch (err) {
      expect(err.name).toBe('StaffPinGetFailed')
      expect(err.properties.status).toBe(409)
      expect(err.properties.name).toBe(errorName)
    }
  })
})
