import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const products = [
  { id: '12345' },
  { id: '67890' }
]

describe('v1: Products: can bulk add multiple products', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/bulk_create`).reply(() => {
        return [
          202,
          {
            results: {
              count: 1,
              invalidProducts: [],
              updatedProducts: products
            }
          }
        ]
      })
    }

    const th = await initThInstance()

    const Products = th.products()

    expect(Products).toBeInstanceOf(v1.Products)

    const { results } = await Products.bulkCreate(products)

    expect(Array.isArray(results?.updatedProducts)).toBe(products)
  })

  it('rejects on status codes that are not 200/422', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/bulk_create`).reply(() => {
        return [444]
      })
    }

    try {
      const th = await initThInstance()
      await th.products().bulkCreate(products)
    } catch (err) {
      expect(err.name).toBe('ProductsBulkCreateFailed')
    }
  })
})
