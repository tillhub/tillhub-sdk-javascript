import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
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
const products = Array.from({ length: 5 }, () => faker.datatype.uuid())
const storefrontsWhitelistResponse = {
  results: products.map(item => ({ product_id: item })),
  count: products.length
}

describe('v0: Storefronts: can whitelist products', () => {
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
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/products/whitelist`
        )
        .reply(() => {
          return [
            200,
            storefrontsWhitelistResponse
          ]
        })
    }

    const th = await initThInstance()

    const storefronts = th.storefronts()

    expect(storefronts).toBeInstanceOf(v0.Storefronts)

    const { data } = await storefronts.whitelist(storeId, products)

    expect(data).toMatchObject(storefrontsWhitelistResponse.results)
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
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/products/whitelist`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.storefronts().whitelist(storeId, products)
    } catch (err: any) {
      expect(err.name).toBe('StorefrontsWhitelistFailed')
    }
  })
})
