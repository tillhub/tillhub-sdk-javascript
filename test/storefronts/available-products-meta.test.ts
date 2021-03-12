import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from 'faker'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

afterEach(() => {
  mock.reset()
})

const storeId = '1234'
const availableProductsResponse = {
  count: 50,
  results: [{ count: 50 }]
}

describe('v0: Storefronts: fetching meta data for available products', () => {
  it('fetching successfully', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/products/available/meta`
        )
        .reply(() => {
          return [
            200,
            availableProductsResponse
          ]
        })
    }

    const th = await initThInstance()

    const storefronts = th.storefronts()
    expect(storefronts).toBeInstanceOf(v0.Storefronts)

    const { metadata } = await storefronts.availableProductsMeta(storeId)
    expect(metadata).toMatchObject(availableProductsResponse.results[0])
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v0/storefronts/${legacyId}/${storeId}/products/available/meta`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.storefronts().availableProductsMeta(storeId)
    } catch (err) {
      expect(err.name).toBe('StorefrontsAvailableProductsMetaFailed')
    }
  })
})
