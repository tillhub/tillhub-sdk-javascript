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

const staffId = 'asdf5566'
const updateObject = {
  firstname: 'Charlie',
  lastname: 'Chaplin',
  pin: 1234,
  services: null
}

describe('v0: Staff: can alter the Staff member', () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/staff/${legacyId}/${staffId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [updateObject]
          }
        ]
      })
    }

    const th = await initThInstance()

    const staff = th.staff()

    expect(staff).toBeInstanceOf(v0.Staff)

    const { data } = await staff.put(staffId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock.onPut(`https://api.tillhub.com/api/v0/staff/${legacyId}/${staffId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.staff().put(staffId, updateObject)
    } catch (err: any) {
      expect(err.name).toBe('StaffPutFailed')
    }
  })
})
