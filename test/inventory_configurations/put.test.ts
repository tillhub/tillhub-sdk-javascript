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
const configId = '1337'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const configuration = { template: '{SEQUENCE,3,0}{-}{FULL_DATE}', autoGenerate: true } as v0.InventoryConfiguration

describe('v0: Configurations: put existing inventory configuration', () => {
  it('can put an existing inventory configuration', async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/inventory-configurations/${legacyId}/${configId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [configuration]
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

    const configurations = th.inventoryConfiguration()

    expect(configurations).toBeInstanceOf(v0.InventoryConfiguration)

    const { data } = await configurations.put(configId, configuration)

    expect(Array.isArray(data)).toBe(false)
    expect(data).toEqual(configuration)
  })
})
