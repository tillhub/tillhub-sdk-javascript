import { TrashedTypes } from '../../src/v0/trash'
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

const trashQuery = { type: 'customers' as TrashedTypes, limit: 500 }
const queryString = qs.stringify(trashQuery, { addQueryPrefix: true })

describe('v0: Trash: can get the trashed object', () => {
  it("Tillhub's products are instantiable", async () => {

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function () {
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
        .onGet(`https://api.tillhub.com/api/v0/trash/${legacyId}/${queryString}`)
        .reply(function () {
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

    const Trash = th.trash()

    expect(Trash).toBeInstanceOf(v0.Trash)

    const { data } = await Trash.get(trashQuery)

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

      mock.onGet(`https://api.tillhub.com/api/v0/products/${legacyId}/${queryString}`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.trash().get(trashQuery)
    } catch (err) {
      expect(err.name).toBe('TrashFetchFailed')
    }
  })
})
