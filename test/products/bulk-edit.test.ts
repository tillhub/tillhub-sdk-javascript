import * as dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const code = '12345678'

const products = [
  { id: '12345', product_group: 'good one' },
  { id: '67890', product_group: 'other one' }
]

describe('v1: Products: can bulk edit multiple products', () => {
  it("Tillhub's products are instantiable", async () => {

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

      mock
        .onPut(`https://api.tillhub.com/api/v1/products/${legacyId}/bulk`)
        .reply(function (config) {
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

    const Products = th.products()

    expect(Products).toBeInstanceOf(v1.Products)

    const { data } = await Products.bulkEdit(products)

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

      mock.onPut(`https://api.tillhub.com/api/v1/products/${legacyId}/bulk`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.products().bulkEdit(products)
    } catch (err) {
      expect(err.name).toBe('ProductsBulkEditFailed')
    }
  })
})
