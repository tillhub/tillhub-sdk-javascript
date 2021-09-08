import { TrashedTypes } from '../../src/v0/trash'
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

const trashQuery = {
  limit: 500,
  query: { type: 'customers' as TrashedTypes }
}

const queryString = `?limit=${trashQuery.limit}&${qs.stringify(trashQuery.query)}`

describe('v0: Trash: can get the trashed object', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/trash/${legacyId}/${queryString}`).reply(() => {
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

    const { data } = await Trash.getAll(trashQuery)

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
      await th.trash().getAll(trashQuery)
    } catch (err: any) {
      expect(err.name).toBe('TrashFetchFailed')
    }
  })
})
