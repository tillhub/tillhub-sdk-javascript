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

const productAddon = {
  name: 'Bier 0.5L',
  addon_group: '70b1fc3e-57bc-4509-ad6b-d33228ada3d1',
  product: 'cf10cc3f-ed3b-4cdf-8650-36b11c07432e',
  price_change: [
    {
      amount: 3.5,
      currency: 'EUR'
    }
  ],
  stock_quantity: 1,
  add_to_cart: true,
  allow_quantity_edit: false,
  max_quantity: 1,
  order_index: 3,
  active: true
}

describe('v0: Product addon: can create', () => {
  it("Tillhub's Product addon are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/product_addons/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [productAddon]
          }
        ]
      })
    }

    const th = await initThInstance()
    const ProductAddons = th.productAddons()

    expect(ProductAddons).toBeInstanceOf(v0.ProductAddons)

    const { data } = await ProductAddons.create(productAddon)
    expect(data).toMatchObject(productAddon)
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

      mock.onPost(`https://api.tillhub.com/api/v0/product_addons/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.productAddons().create(productAddon)
    } catch (err: any) {
      expect(err.name).toBe('ProductAddonCreationFailed')
    }
  })
})
