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

const productIds = ['12345', '67890']

const respMsg = `Deleted products`

describe('v1: Products: can bulk delete multiple products', () => {
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

      mock.onDelete(`https://api.tillhub.com/api/v1/products/${legacyId}/bulk`).reply(() => {
        return [
          200,
          {
            msg: respMsg,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Products = th.products()

    expect(Products).toBeInstanceOf(v1.Products)

    const { msg } = await Products.bulkDelete({ productIds })

    expect(msg).toEqual(respMsg)
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

      mock.onDelete(`https://api.tillhub.com/api/v1/products/${legacyId}/bulk`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.products().bulkDelete({ productIds })
    } catch (err: any) {
      expect(err.name).toBe('ProductsBulkDeleteFailed')
    }
  })
})
