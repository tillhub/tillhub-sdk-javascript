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
const deviceGroupId = 'abc123'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: DeviceGroups: Actions: can get one', () => {
  it("Tillhub's deviceGroups are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/device_groups/${legacyId}/${deviceGroupId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{ testKey: 'testKey' }]
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

    const deviceGroups = th.deviceGroups()

    expect(deviceGroups).toBeInstanceOf(v0.DeviceGroups)

    const { data } = await deviceGroups.get(deviceGroupId)

    expect(data).toEqual({ testKey: 'testKey' })
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

      mock
        .onGet(`https://api.tillhub.com/api/v0/device_groups/${legacyId}/${deviceGroupId}`)
        .reply(() => {
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
      await th.deviceGroups().get(deviceGroupId)
    } catch (err: any) {
      expect(err.name).toBe('DeviceGroupFetchFailed')
    }
  })
})
