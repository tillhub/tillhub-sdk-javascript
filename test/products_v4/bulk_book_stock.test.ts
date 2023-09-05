import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { v4 } from '../../src/tillhub-js'
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

const bookStockObj = {
  location: '37a486d4-b53a-4fa5-ac50-2ff2c269b2a3',
  consignmentNoteNumber: '001-2',
  purchaseOrderId: '2597c953-71bb-4f06-9554-25e8a1c5006a',
  reason: '99a5f1ed-82a9-417e-bfb2-57974dcf371f',
  items: [
    {
      productId: '32de0c64-9a9e-4e5c-a7ac-9020a0cdf91c',
      qty: 2
    }
  ]
}
const userId = '4564'
const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Book bulk Products', () => {
  it('bulk book', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v4/products/${userId}/stock/book/bulk`).reply(() => {
        return [
          200,
          {
            status: 200,
            msg: '',
            results: [{}]
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

    const products = th.productsV4()

    expect(products).toBeInstanceOf(v4.Products)

    const { msg, status } = await products.bulkBookStock({ body: bookStockObj })

    expect(typeof msg).toEqual('string')
    expect(typeof status).toEqual('number')
  })
})
