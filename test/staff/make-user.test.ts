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

const staffID = '1Q2W3E4R'
const makeUserObj = { user: '1234-asdf' }
const staffMember = {
  firstname: 'asdf',
  lastname: 'asdf',
  displayname: 'asdf',
  user: makeUserObj.user
}

describe('v0: Staff: can make a staff member a user', () => {
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
        .onPost(`https://api.tillhub.com/api/v0/staff/${legacyId}/${staffID}/make_user`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [staffMember]
            }
          ]
        })
    }

    const th = await initThInstance()

    const Staff = th.staff()

    expect(Staff).toBeInstanceOf(v0.Staff)

    const { data } = await Staff.makeUser(staffID, makeUserObj)

    expect(data).toMatchObject(staffMember)
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
        .onPost(`https://api.tillhub.com/api/v0/staff/${legacyId}/${staffID}/make_user`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.staff().makeUser(staffID, makeUserObj)
    } catch (err: any) {
      expect(err.name).toBe('MakeUserStaffFailed')
    }
  })
})
