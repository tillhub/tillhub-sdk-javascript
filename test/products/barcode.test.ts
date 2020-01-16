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
const queryString = qs.stringify(code, { addQueryPrefix: true })

describe('v1: Products: can check if a barcode is unique', () => {
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
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/barcode${queryString}`)
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

    const { data } = await Products.checkBarcode(code)

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

      mock.onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/barcode`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.products().checkBarcode(code)
    } catch (err) {
      expect(err.name).toBe('BarcodeGetFailed')
    }
  })

  it('rejects on status code 409 - barcode is not unique', async () => {
    const errorName = 'BarcodeNotUnique'
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
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/barcode${queryString}`)
        .reply(function (config) {
          return [
            409,
            {
              name: errorName
            }
          ]
        })
    }

    try {
      const th = await initThInstance()
      await th.products().checkBarcode(code)
    } catch (err) {
      expect(err.name).toBe('BarcodeGetFailed')
      expect(err.properties.status).toBe(409)
      expect(err.properties.name).toBe(errorName)
    }
  })
})
