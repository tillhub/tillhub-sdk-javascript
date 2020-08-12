import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient, v0 } from '../../src/tillhub-js'

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

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Configurations: can get client account config', () => {
  it("Tillhub's CLient Account Configurations are instantiable from query", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/configurations/${legacyId}?owner=self`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [
                {
                  owner: 'self'
                }
              ]
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

    const configurations = th.configurations()

    expect(configurations).toBeInstanceOf(v0.Configurations)

    const { data } = await configurations.getAll({ query: { owner: 'self' } })

    expect(Array.isArray(data)).toBe(true)
    expect((data[0] as any).owner).toBe('self')
  })

  it("Tillhub's CLient Account Configurations are instantiable from option", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/configurations/${legacyId}?owner=self`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [
                {
                  owner: 'self'
                }
              ]
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

    const configurations = th.configurations()

    expect(configurations).toBeInstanceOf(v0.Configurations)

    const { data } = await configurations.getAll({ owner: 'self' })

    expect(Array.isArray(data)).toBe(true)
    expect((data[0] as any).owner).toBe('self')
  })
})
