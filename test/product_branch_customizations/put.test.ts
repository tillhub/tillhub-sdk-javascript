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

const productBranchCustomizationsId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
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

describe('v0: Product branch customizations: can alter', () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/product_branch_customizations/${legacyId}/${productBranchCustomizationsId}`).reply(() => {
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

    const { data } = await ProductBranchCustomizations.put(productBranchCustomizationsId, productBranchCustomization)
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
      mock.onPut(`https://api.tillhub.com/api/v0/product_branch_customizations/${legacyId}/${productBranchCustomizationsId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.productBranchCustomizations().put(productBranchCustomizationsId, productBranchCustomization)
    } catch (err: any) {
      expect(err.name).toBe('ProductBranchCustomizationPutFailed')
    }
  })
})
