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

describe('v0: Configurations: can bulk update', () => {
  it('Tillhub\'s Configurations bulk update returns results', async () => {
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

      mock.onPatch(`https://api.tillhub.com/api/v0/configurations/${legacyId}/bulk-update`).reply(() => {
        return [
          200,
          {
            results: [
              {
                id: 'config-1',
                success: true
              },
              {
                id: 'config-2',
                success: true
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

    const { data } = await configurations.bulkUpdate({
      configurations: [
        {
          id: 'config-1',
          owner: 'owner-1',
          features: { someFeature: true }
        },
        {
          id: 'config-2',
          features: { someFeature: false }
        }
      ]
    })

    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBe(2)
    expect(data[0].id).toBe('config-1')
    expect(data[0].success).toBe(true)
    expect(data[1].id).toBe('config-2')
    expect(data[1].success).toBe(true)
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
      mock.onPatch(`https://api.tillhub.com/api/v0/configurations/${legacyId}/bulk-update`).reply(() => {
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
      await th.configurations().bulkUpdate({
        configurations: [
          {
            id: 'config-1',
            features: { someFeature: true }
          }
        ]
      })
    } catch (err: any) {
      expect(err.name).toBe('ConfigurationBulkUpdateFailed')
    }
  })
})
