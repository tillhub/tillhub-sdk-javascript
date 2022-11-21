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

const productBranchCustomizationId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const productBranchCustomization = {
  product: 'cf10cc3f-ed3b-4cdf-8650-36b11c07432e',
  name: 'Bier 0.5L',
  description: 'Bier description',
  summary: 'Bier summary',
  default_tile_color: 'yellow',
  branches: ['cf10cc3f-ed3b-4cdf-8650-36b11c07432f', 'cf10cc3f-ed3b-4cdf-8650-36b11c07432g'],
  branch_groups: ['cf10cc3f-ed3b-4cdf-8650-36b11c07432h', 'cf10cc3f-ed3b-4cdf-8650-36b11c07432i'],
  deleted: false,
  active: true
}

describe('v0: Product branch customizations: can get one', () => {
  it("Tillhub's Product branch customizations are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/product_branch_customizations/${legacyId}/${productBranchCustomizationId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [productBranchCustomization]
          }
        ]
      })
    }

    const th = await initThInstance()
    const ProductBranchCustomizations = th.productBranchCustomizations()

    expect(ProductBranchCustomizations).toBeInstanceOf(v0.ProductBranchCustomizations)

    const { data } = await ProductBranchCustomizations.get(productBranchCustomizationId)
    expect(data).toMatchObject(productBranchCustomization)
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

      mock.onGet(`https://api.tillhub.com/api/v0/product_branch_customizations/${legacyId}/${productBranchCustomizationId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.productBranchCustomizations().get(productBranchCustomizationId)
    } catch (err: any) {
      expect(err.name).toBe('ProductBranchCustomizationFetchOneFailed')
    }
  })
})
