import * as dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const staffNumber = {
  provided_staff_number: '1234'
}
const queryString = qs.stringify(staffNumber, { addQueryPrefix: true })

describe('v0: Staff: can get a unique staff number', () => {
  it("Tillhub's staff are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/staff_number`)
        .reply(function (config) {
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

    const { data } = await Staff.getStaffNumber()

    expect(Array.isArray(data)).toBe(true)
  })

  it('can send a user provided staff number to determine if unique', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/staff_number${queryString}`)
        .reply(function (config) {
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

    const { data } = await Staff.getStaffNumber(staffNumber)

    expect(Array.isArray(data)).toBe(true)
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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/staff_number`)
        .reply(function (config) {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.staff().getStaffNumber()
    } catch (err) {
      expect(err.name).toBe('StaffNumberGetFailed')
    }
  })

  it('rejects on status code 409', async () => {
    const errorName = 'ErrorName'
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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/staff_number${queryString}`)
        .reply(function (config) {
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
      await th.staff().getStaffNumber(staffNumber)
    } catch (err) {
      expect(err.name).toBe('StaffNumberGetFailed')
      expect(err.properties.status).toBe(409)
      expect(err.properties.name).toBe(errorName)
    }
  })
})
