import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
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

describe('v0: Configurations: can bulk fetch', () => {
  it('Tillhub\'s Configurations bulk fetch returns configurations', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/configurations/${legacyId}/bulk-fetch`).reply(() => {
        return [
          200,
          {
            results: [
              {
                id: 'config-1',
                owner: 'owner-1',
                settings: { someSetting: true },
                features: { someFeature: false }
              },
              {
                id: 'config-2',
                owner: 'owner-2',
                settings: { someSetting: false },
                features: { someFeature: true }
              }
            ],
            metadata: {}
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

    const { data } = await configurations.bulkFetch({
      sections: ['settings', 'features'],
      owners: ['owner-1', 'owner-2']
    })

    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(2)
    expect(data[0].id).toBe('config-1')
    expect(data[0].owner).toBe('owner-1')
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
              legacy_id: legacyId
            }
          }
        ]
      })
      mock.onPost(`https://api.tillhub.com/api/v0/configurations/${legacyId}/bulk-fetch`).reply(() => {
        return [400]
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
      await th.configurations().bulkFetch({
        sections: ['settings'],
        owners: ['owner-1']
      })
    } catch (err: any) {
      expect(err.name).toBe('ConfigurationBulkFetchFailed')
    }
  })
})
