import * as dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import th, { TillhubClient, v1 } from '../../src/tillhub-js'

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

const productObj = {
  name: 'iPhone'
}
const userId = '4564'
const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Create a new Product', () => {
  it('create', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${userId}`).reply(() => {
        return [
          200,
          {
            results: [productObj],
            errors: []
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

    const { data, errors } = await products.create(productObj)

    expect(typeof data).toEqual('object')
    expect(data.name).toEqual('iPhone')
    expect(errors).toEqual([])
  })

  it('creates with returned errors array', async () => {
    const errorsObject = {
      message: 'An Error',
      code: '404',
      errorDetails: {}
    }

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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${userId}`).reply(() => {
        return [
          200,
          {
            results: [productObj],
            errors: [errorsObject]
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

    const { errors } = await products.create(productObj)

    expect(errors).toMatchObject([errorsObject])
  })

  it('creates with query params', async () => {
    const query = {
      product_id_template: '{country}{-}{branch}',
      generate_product_id: true
    }

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

      mock
        .onPost(`https://api.tillhub.com/api/v1/products/${userId}?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              results: [productObj]
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

    const { data } = await products.create(productObj, query)

    expect(data).toMatchObject(productObj)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      const mock = new MockAdapter(axios)

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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${userId}`).reply(() => {
        return [205]
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
      await th.products().create(productObj)
    } catch (err) {
      expect(err.name).toBe('ProductsCreateFailed')
    }
  })
})
