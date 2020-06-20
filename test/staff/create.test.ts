import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import qs from 'qs'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const staffMember = {
  firstname: 'asdf',
  lastname: 'asdf',
  displayname: 'asdf',
  phonenumbers: {
    home: 123456798
  },
  email: 'asdf',
  addresses: {
    street: 'qert',
    street_number: 12,
    region: 'DE',
    postal_code: 12345,
    country: 'Germany'
  },
  pin: 4567,
  metadata: {},
  scopes: ['asdf.qwert.zxcv'],
  staff_number: 7894,
  discounts: {},
  short_code: 7894,
  default: true
}

describe('v0: Staff: can create one staff member', () => {
  const query = {
    staff_id_template: '{country}{-}{branch}',
    generate_staff_id: true
  }

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

      mock
        .onPost(`https://api.tillhub.com/api/v0/staff/${legacyId}?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [staffMember],
              errors: []
            }
          ]
        })
    }

    const th = await initThInstance()

    const Staff = th.staff()

    expect(Staff).toBeInstanceOf(v0.Staff)

    const { data, errors } = await Staff.create(staffMember, query)

    expect(data).toMatchObject(staffMember)
    expect(errors).toEqual([])
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

      mock.onPost(`https://api.tillhub.com/api/v0/staff/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.staff().create(staffMember)
    } catch (err) {
      expect(err.name).toBe('StaffMemberCreateFailed')
    }
  })
})
