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

afterEach(() => {
  mock.reset()
})

function mockLogin (): void {
  mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(200, {
    token: '',
    user: { id: '123', legacy_id: userId }
  })
}

async function login (): Promise<void> {
  th.init({
    credentials: { username: user.username, password: user.password },
    base: process.env.TILLHUB_BASE
  })
  await th.auth.loginUsername({ username: user.username, password: user.password })
}

describe('v2: Products.query (POST list)', () => {
  it('POSTs large location arrays in the body and scalars in the query string', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    mock.onPost(new RegExp(`/api/v2/products/${userId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(Array.isArray(body.location)).toBe(true)
      expect((body.location as string[]).length).toBe(300)
      expect(url).toContain('limit=25')
      expect(url).toContain('deleted=false')
      const qs = url.includes('?') ? url.split('?')[1] : ''
      expect(qs).not.toContain('location')

      return [200, {
        count: 2,
        results: [{ id: 'p1' }, { id: 'p2' }],
        pagination: { limit: 25, offset: 0 }
      }]
    })

    await login()
    const products = th.productsV2()
    expect(products).toBeInstanceOf(v2.Products)

    const locations = Array.from({ length: 300 }, (_, i) => `00000000-0000-4000-8000-${String(i).padStart(12, '0')}`)
    const { data, metaData } = await products.query({
      limit: 25,
      query: {
        location: locations,
        deleted: false
      }
    })

    expect(data).toEqual([{ id: 'p1' }, { id: 'p2' }])
    expect(metaData).toMatchObject({ pagination: { limit: 25, offset: 0 } })
  })

  it('sends small filter payloads as a valid POST with scalars only in the query string', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    mock.onPost(new RegExp(`/api/v2/products/${userId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(Object.keys(body).length).toBe(0)
      expect(url).toContain('active=true')

      return [200, {
        count: 1,
        results: [{ id: 'p1' }],
        pagination: { limit: 50, offset: 0 }
      }]
    })

    await login()
    const { data } = await th.productsV2().query({ query: { active: true } })

    expect(Array.isArray(data)).toBe(true)
  })

  it('attaches a next function when count equals pagination limit', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()

    mock.onPost(new RegExp(`/api/v2/products/${userId}/query`)).reply((config) => {
      const url = String(config.url)

      if (url.includes('offset=2')) {
        return [200, {
          count: 1,
          results: [{ id: 'p3' }],
          pagination: { limit: 2, offset: 2 }
        }]
      }

      return [200, {
        count: 2,
        results: [{ id: 'p1' }, { id: 'p2' }],
        pagination: { limit: 2, offset: 0 }
      }]
    })

    await login()
    const firstPage = await th.productsV2().query({ limit: 2, query: { active: true } })

    expect(firstPage.data).toEqual([{ id: 'p1' }, { id: 'p2' }])
    expect(typeof firstPage.next).toBe('function')

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const secondPage = await firstPage.next!()

    expect(secondPage.data).toEqual([{ id: 'p3' }])
    expect(secondPage.next).toBeUndefined()
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mockLogin()
    mock.onPost(new RegExp(`/api/v2/products/${userId}/query`)).reply(205)

    await login()

    try {
      await th.productsV2().query()
    } catch (err: any) {
      expect(err.name).toBe('ProductsFetchFailed')
    }
  })
})
