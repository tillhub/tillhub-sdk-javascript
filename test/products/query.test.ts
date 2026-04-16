import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient } from '../../src/tillhub-js'
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

const legacyId = '4564'
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Products.query (POST list)', () => {
  it('POSTs large location arrays in the body and scalars in the query string', async () => {
    if (process.env.SYSTEM_TEST === 'true') {
      return
    }

    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(200, {
      token: '',
      user: {
        id: '123',
        legacy_id: legacyId
      }
    })

    mock.onPost(new RegExp(`/api/v1/products/${legacyId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(Array.isArray(body.location)).toBe(true)
      expect((body.location as string[]).length).toBe(300)
      expect(url).toContain('limit=25')
      expect(url).toContain('deleted=false')
      const qs = url.includes('?') ? url.split('?')[1] : ''
      expect(qs).not.toContain('location')

      return [
        200,
        {
          count: 2,
          results: [{ id: 'p1' }, { id: 'p2' }]
        }
      ]
    })

    const th = new TillhubClient()
    th.init({
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    })
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const locations = Array.from({ length: 300 }, (_, i) => `00000000-0000-4000-8000-${String(i).padStart(12, '0')}`)
    const { data, metadata } = await th.products().query({
      limit: 25,
      query: {
        location: locations,
        deleted: false
      }
    })

    expect(data).toEqual([{ id: 'p1' }, { id: 'p2' }])
    expect(metadata).toMatchObject({ count: 2 })
  })

  it('sends small filter payloads as a valid POST with scalars only in the query string', async () => {
    if (process.env.SYSTEM_TEST === 'true') {
      return
    }

    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(200, {
      token: '',
      user: {
        id: '123',
        legacy_id: legacyId
      }
    })

    mock.onPost(new RegExp(`/api/v1/products/${legacyId}/query`)).reply((config) => {
      const body =
        typeof config.data === 'string' ? (JSON.parse(config.data) as Record<string, unknown>) : config.data
      const url = String(config.url)

      expect(Object.keys(body).length).toBe(0)
      expect(url).toContain('active=true')

      return [
        200,
        {
          count: 1,
          results: [{}]
        }
      ]
    })

    const th = new TillhubClient()
    th.init({
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    })
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const { data } = await th.products().query({ query: { active: true } })

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST === 'true') {
      return
    }

    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(200, {
      token: '',
      user: {
        id: '123',
        legacy_id: legacyId
      }
    })

    mock.onPost(new RegExp(`/api/v1/products/${legacyId}/query`)).reply(205)

    const th = new TillhubClient()
    th.init({
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    })
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.products().query()
    } catch (err: any) {
      expect(err.name).toBe('ProductsFetchFailed')
    }
  })
})
