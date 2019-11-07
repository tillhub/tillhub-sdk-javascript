import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'
const searchTerm = 'asdf'
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Branches: can search for branches', () => {
  it("Tillhub's Branches are instantiable", async () => {
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
