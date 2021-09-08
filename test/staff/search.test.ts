import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
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

const legacyId = '4564'
const query = {
  q: 'asdf',
  fields: ['firstname', 'lastname', 'staff_number']
}
const queryString = qs.stringify(query, { addQueryPrefix: true })
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Staff: can search for staff', () => {
  it('receives a search query of type string', async () => {
    const searchTerm = 'asdf'

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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/search?q=${searchTerm}`)
        .reply(() => {
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

    const staff = th.staff()

    expect(staff).toBeInstanceOf(v0.Staff)

    const { data } = await staff.search(searchTerm)

    expect(Array.isArray(data)).toBe(true)
  })

  it('receives a search query of type object', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/search${queryString}`)
        .reply(() => {
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

    const staff = th.staff()

    expect(staff).toBeInstanceOf(v0.Staff)

    const { data } = await staff.search(query)

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

      mock
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/search${queryString}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staff().search(query)
    } catch (err: any) {
      expect(err.name).toBe('StaffSearchFailed')
    }
  })
})
