import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { v1 } from '../../src/tillhub-js'
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

const productsObjArray = [{
  name: 'iPhone'
}, {
  name: 'iPhone 2'
}]
const userId = '4564'
const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Create a bulk of new Product', () => {
  it('bulk create', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: userId
            }
          }
        ]
      })

      mock.onPost(`https://api.tillhub.com/api/v1/products/${userId}/bulk_create`).reply(() => {
        return [
          200,
          {
            count: 2,
            invalid_products: [],
            updated_products: productsObjArray
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

    const products = th.products()

    expect(products).toBeInstanceOf(v1.Products)

    const { results } = await products.bulkCreate(productsObjArray)

    expect(typeof results).toEqual('object')
    expect(results?.updated_products?.length).toEqual(2)
    expect(results?.count).toEqual(2)
    expect(results?.updated_products).toEqual(productsObjArray)
    expect(results?.invalid_products).toEqual([])
  })
})

it('rejects on status codes that are not 200/409', async () => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [
        200,
        {
          token: '',
          user: {
            id: '123',
            legacy_id: userId
          }
        }
      ]
    })

    mock.onPost(`https://api.tillhub.com/api/v1/products/${userId}/bulk_create`).reply(() => {
      return [444]
    })
  }

  try {
    const products = th.products()
    expect(products).toBeInstanceOf(v1.Products)
    await products.bulkCreate(productsObjArray)
  } catch (err) {
    expect(err.name).toBe('ProductsBulkCreateFailed')
  }
})
