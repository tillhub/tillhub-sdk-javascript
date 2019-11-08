import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import qs from 'qs'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'
const searchTerm = 'asdf'
const query = {
  q: searchTerm,
  fields: ['city', 'name', 'branch_number']
}
const queryString = qs.stringify(query, { addQueryPrefix: true })

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Branches: can search for branches', () => {
  it('receives a search query of type string', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => [200, {
        token: '',
        user: {
          id: '123',
          legacy_id: legacyId
        }
      }])

      mock
        .onGet(`https://api.tillhub.com/api/v0/branches/${legacyId}/search?q=${searchTerm}`)
        .reply(() => [200, {
          count: 1,
          results: [{}]
        }])
    }

    const th = await initThInstance()

    const branches = th.branches()

    expect(branches).toBeInstanceOf(v0.Branches)

    const { data } = await branches.search(searchTerm)

    expect(Array.isArray(data)).toBe(true)
  })

  it('receives a search query of type object', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/search${queryString}`)
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

    const staff = th.staff()

    expect(staff).toBeInstanceOf(v0.Staff)

    const { data } = await staff.search(query)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => [200, {
        token: '',
        user: {
          id: '123',
          legacy_id: legacyId
        }
      }])

      mock
        .onGet(`https://api.tillhub.com/api/v0/branches/${legacyId}/search?q=${searchTerm}`)
        .reply(() => [205])
    }

    const th = await initThInstance()

    try {
      await th.branches().search(searchTerm)
    } catch (err) {
      expect(err.name).toBe('BranchesSearchFailed')
    }
  })
})
