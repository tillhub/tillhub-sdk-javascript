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

const storeId = '1234'
const deltaResult = {
  total_not_synced: 11
}

describe('v0: Storefronts: can fetch delta of the whitelisted products', () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/sync/delta`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [deltaResult]
            }
          ]
        })
    }

    const th = await initThInstance()

    const storefronts = th.storefronts()

    expect(storefronts).toBeInstanceOf(v0.Storefronts)

    const { data } = await storefronts.delta(storeId)

    expect(data).toMatchObject(deltaResult)
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
        .onGet(
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/sync/delta`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.storefronts().delta(storeId)
    } catch (err: any) {
      expect(err.name).toBe('StorefrontsDeltaFailed')
    }
  })
})
