import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { v2 } from '../../src/tillhub-js'
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

const userId = '4564'
const mock = new MockAdapter(axios)

const mockProductsResponse = {
  results: [
    {
      id: 'product-1',
      name: 'Test Product 1',
      description: 'A test product',
      active: true,
      type: 'product',
      sku: 'TEST-001'
    },
    {
      id: 'product-2',
      name: 'Test Product 2',
      description: 'Another test product',
      active: true,
      type: 'product',
      sku: 'TEST-002'
    }
  ],
  pagination: {
    total: 2,
    limit: 50,
    offset: 0
  }
}

afterEach(() => {
  mock.reset()
})

describe('v2: Products: can get all products', () => {
  it('Tillhubs ProductsV2.getAll() returns products successfully', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v2/products/${userId}`).reply(() => {
        return [
          200,
          mockProductsResponse
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

    const products = th.productsV2()

    expect(products).toBeInstanceOf(v2.Products)

    const response = await products.getAll()

    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.data?.length).toBe(2)
    expect(response.metaData).toBeDefined()
    expect(response.metaData?.count).toBe(2)
    expect(response.metaData?.pagination).toBeDefined()
  })

  it('can pass query options to getAll()', async () => {
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

      mock.onGet(new RegExp(`https://api.tillhub.com/api/v2/products/${userId}.*`)).reply((config) => {
        // Check if query parameters are included
        if (config.url?.includes('active=true') && config.url?.includes('limit=10')) {
          return [
            200,
            {
              ...mockProductsResponse,
              results: mockProductsResponse.results.filter(p => p.active),
              pagination: {
                ...mockProductsResponse.pagination,
                limit: 10
              }
            }
          ]
        }
        return [
          200,
          mockProductsResponse
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

    const products = th.productsV2()

    const response = await products.getAll({
      query: {
        active: true
      },
      limit: 10
    })

    expect(response.data).toBeDefined()
    expect(Array.isArray(response.data)).toBe(true)
    expect(response.metaData?.pagination).toBeDefined()
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
              legacy_id: userId
            }
          }
        ]
      })

      mock.onGet(`https://api.tillhub.com/api/v2/products/${userId}`).reply(() => {
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

    th.init(options)

    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const products = th.productsV2()

    try {
      await products.getAll()
    } catch (err: any) {
      expect(err.name).toBe('ProductsFetchFailed')
    }
  })

  it('handles network errors gracefully', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v2/products/${userId}`).networkError()
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

    const products = th.productsV2()

    try {
      await products.getAll()
    } catch (err: any) {
      expect(err.name).toBe('ProductsFetchFailed')
    }
  })
})
