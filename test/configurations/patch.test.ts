import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient, v1, v0 } from '../../src/tillhub-js'

let user = {
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
const configId = '1337'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const baseConf = {
  owner: 'self'
}

const patchConf = {
  label_printer: { foo: 'bar' }
}

const combinedConf = { ...baseConf, ...patchConf }

describe('v0: Configurations: patch existing config', () => {
  it('can patch an existing config', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onPatch(`https://api.tillhub.com/api/v0/configurations/${legacyId}/${configId}`)
        .reply(function (config) {
          return [
            200,
            {
              count: 1,
              results: [
                combinedConf
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

    const { data } = await configurations.patch(configId, patchConf)

    expect(Array.isArray(data)).toBe(false)
    expect(data).toEqual(combinedConf)
  })
})
