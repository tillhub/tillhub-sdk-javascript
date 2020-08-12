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

const externalCustomId = {
  provided_id: '1234'
}
const queryString = qs.stringify(externalCustomId, { addQueryPrefix: true })

describe('v0: Branches: can get a unique external_custom_id', () => {
  it("Tillhub's branches are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/branches/${legacyId}/external_id${queryString}`)
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

    const Branches = th.branches()

    expect(Branches).toBeInstanceOf(v0.Branches)

    const { data } = await Branches.getUniqueExternalId(externalCustomId)

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

      mock.onGet(`https://api.tillhub.com/api/v0/branches/${legacyId}/external_id`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.branches().getUniqueExternalId(externalCustomId)
    } catch (err) {
      expect(err.name).toBe('ExternalCustomIdGetUniqueFailed')
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

      mock
        .onGet(`https://api.tillhub.com/api/v0/branches/${legacyId}/external_id${queryString}`)
        .reply(() => {
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
      await th.branches().getUniqueExternalId(externalCustomId)
    } catch (err) {
      expect(err.name).toBe('ExternalCustomIdGetUniqueFailed')
      expect(err.properties.status).toBe(409)
      expect(err.properties.name).toBe(errorName)
    }
  })
})
