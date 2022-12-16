import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
dotenv.config()
import { initThInstance } from '../util'

const productGroupsObjArray = [{
  name: 'group A',
  product_group_id: '54321',
  tax: '8085',
  active: true,
  account: '666',
  images: { name: 'images/1.jpeg' },
  color: 'blue'
}, {
  name: 'group B',
  product_group_id: '12345',
  tax: '8085',
  active: true,
  account: '66666',
  images: { name: 'images/2.jpeg' },
  color: 'red'
}]

const legacyId = '4564'

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Create a bulk of new product groups', () => {
  it('bulk create', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/product_groups/${legacyId}/bulk_create`).reply(() => {
        return [
          200,
          {
            count: 2,
            invalid_product_groups: [],
            created_product_groups: [],
            updated_product_groups: productGroupsObjArray
          }
        ]
      })
    }

    const th = await initThInstance()

    const productGroups = th.productGroups()

    expect(productGroups).toBeInstanceOf(v0.ProductGroups)

    const { data, metadata } = await productGroups.bulkCreate(productGroupsObjArray)

    expect(typeof data).toEqual('object')
    expect(data?.updated_product_groups?.length).toEqual(2)
    expect(metadata?.count).toEqual(2)
    expect(data?.updated_product_groups).toEqual(productGroupsObjArray)
    expect(data?.invalid_product_groups).toEqual([])
    expect(data?.created_product_groups).toEqual([])
  })
})

it('rejects on status codes that are not 200/409', async () => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost(`https://api.tillhub.com/api/v0/product_groups/${legacyId}/bulk_create`).reply(() => {
      return [444]
    })
  }

  try {
    const th = await initThInstance()
    const productGroups = th.productGroups()
    expect(productGroups).toBeInstanceOf(v0.ProductGroups)
    await productGroups.bulkCreate(productGroupsObjArray)
  } catch (err: any) {
    expect(err.name).toBe('ProductGroupBulkCreationFailed')
  }
})
