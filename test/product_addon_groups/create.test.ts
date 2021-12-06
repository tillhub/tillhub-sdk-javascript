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

const productAddonGroup = {
  name: 'Group 1',
  multiselect: false,
  skippable: false,
  active: true
}

describe('v0: Product addon groups: can create', () => {
  it("Tillhub's Product addon groups are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/product_addon_groups/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [productAddonGroup]
          }
        ]
      })
    }

    const th = await initThInstance()

    const ProductAddonsGroups = th.productAddonGroups()

    expect(ProductAddonsGroups).toBeInstanceOf(v0.ProductAddonGroups)

    const { data } = await ProductAddonsGroups.create(productAddonGroup)

    expect(data).toMatchObject(productAddonGroup)
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

      mock.onPost(`https://api.tillhub.com/api/v0/product_addon_groups/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.productAddonGroups().create(productAddonGroup)
    } catch (err: any) {
      expect(err.name).toBe('ProductAddonGroupCreationFailed')
    }
  })
})
