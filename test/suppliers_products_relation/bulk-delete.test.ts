import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import th, { TillhubClient, v0 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const supplierId = 'abc123'
const productId = faker.datatype.uuid()
const respMsg = `Deleted relation ${supplierId}`
const legacyId = '4564'
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})
describe('v0: SuppliersProductsRelation: can bulk delete supplier to product relation', () => {
  it('can delete one', async () => {
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

      mock
        .onDelete(`https://api.tillhub.com/api/v0/business-partner-products/${legacyId}/${supplierId}`)
        .reply(() => {
          return [
            200,
            {
              results: [{
                businessPartners: [],
                productId: []
              }],
              msg: respMsg
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const suppliersProductsRelation = th.suppliersProductsRelation()

    expect(suppliersProductsRelation).toBeInstanceOf(v0.SuppliersProductsRelation)

    const { data, msg } = await suppliersProductsRelation.bulkDelete(supplierId, {
      productId: [productId]
    })

    expect(data).toMatchObject({
      businessPartners: [],
      productId: []
    })
    expect(msg).toEqual(respMsg)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(() => {
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

        .onDelete(`https://api.tillhub.com/api/v0/business-partner-products/${legacyId}/${supplierId}`)
        .reply(() => {
          return [500]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.suppliersProductsRelation().bulkDelete(supplierId, {
        productId: [productId]
      })
    } catch (err: any) {
      expect(err.name).toBe('SuppliersProductsRelationBulkDeleteFailed')
    }
  })
})
