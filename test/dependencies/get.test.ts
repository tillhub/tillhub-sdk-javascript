import { DependenciesTypes } from '../../src/v0/dependencies'
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

const dependenciesQuery = { resource: '12345678', type: 'product_group' as DependenciesTypes }
const queryString = qs.stringify(dependenciesQuery, { addQueryPrefix: true })

describe('v0: Dependencies: can get the number of dependencies for a specific resource', () => {
  it("Tillhub's products are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/dependencies/${legacyId}/${queryString}`)
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

    const Dependencies = th.dependencies()

    expect(Dependencies).toBeInstanceOf(v0.Dependencies)

    const { data } = await Dependencies.get(dependenciesQuery)

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

      mock.onGet(`https://api.tillhub.com/api/v0/products/${legacyId}/${queryString}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.dependencies().get(dependenciesQuery)
    } catch (err: any) {
      expect(err.name).toBe('DependenciesFetchFailed')
    }
  })
})
