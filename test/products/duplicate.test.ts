import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v1 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

const productIds = ['123456']
const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Products: can duplicate products', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/duplicate`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{ id: '12345' }]
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

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const products = th.products()

    expect(products).toBeInstanceOf(v1.Products)

    const { data } = await products.duplicate({ productIds })

    expect(data).toEqual([{ id: '12345' }])
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

        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/duplicate`)
        .reply(() => {
          return [404]
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
      await th.products().duplicate({ productIds })
    } catch (err: any) {
      expect(err.name).toBe('ProductsDuplicateFailed')
    }
  })
})
