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
const storefrontsSyncResponse = {
  msg: 'nice!'
}

describe('v0: Storefronts: can start the sync all products process', () => {
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
        .onPost(
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/sync`
        )
        .reply(() => {
          return [
            200,
            storefrontsSyncResponse
          ]
        })
    }

    const th = await initThInstance()

    const storefronts = th.storefronts()

    expect(storefronts).toBeInstanceOf(v0.Storefronts)

    const { msg } = await storefronts.syncAll(storeId)

    expect(msg).toBe(storefrontsSyncResponse.msg)
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
        .onPost(
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/sync`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.storefronts().syncAll(storeId)
    } catch (err) {
      expect(err.name).toBe('StorefrontsSyncAllFailed')
    }
  })
})
