import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v1 } from '../../src/tillhub-js'

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
const mockRegister = {
  id: '1337',
  created_at: { iso: '2018-04-23T08:46:16.012Z', unix: 1524473176012 },
  updated_at: { iso: '2019-01-18T12:44:41.261Z', unix: 1547815481261 },
  device_id: 'someDeviceId',
  token_id: 'someTokenId',
  active: true,
  deleted: false,
  shop: null,
  name: null,
  description: null,
  metadata: null,
  register_number: 16,
  branch: 'someBranch',
  custom_ids: null,
  custom_id: null,
  configuration: null,
  client: null,
  external_custom_id: null,
  currency_default: null,
  timezone_default: null,
  device_configuration: {
    network: { ip: '192.168.13.37' },
    bundle_id: 'someBundle',
    device_token: 'someToken'
  },
  devices: null,
  branch_number: 1
}
const mockNotification = { aps: { alert: 'Hello, World!' } }
const notificationSuccessMsg = 'Sent notification to 1 device(s).'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Register', () => {
  it('queries the remote state of a register', async () => {
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
        .onGet(`https://api.tillhub.com/api/v1/registers/${legacyId}/${mockRegister.id}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [mockRegister]
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

    const registers = th.registers()

    expect(registers).toBeInstanceOf(v1.Registers)

    const { data } = await registers.get(mockRegister.id)

    expect(data).toEqual(mockRegister)
  })

  it('sends a notification to a register', async () => {
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
        .onPost(
          `https://api.tillhub.com/api/v1/registers/${legacyId}/${mockRegister.id}/notification`,
          mockNotification
        )
        .reply(() => {
          return [
            200,
            {
              status: 200,
              msg: notificationSuccessMsg
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

    const registers = th.registers()

    expect(registers).toBeInstanceOf(v1.Registers)

    const { data } = await registers.notify(mockRegister.id, { aps: { alert: 'Hello, World!' } })

    expect(data).toEqual(notificationSuccessMsg)
  })

  it('updates the device configuration of a register', async () => {
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
        .onPut(
          `https://api.tillhub.com/api/v1/registers/${legacyId}/${mockRegister.id}/device_configuration`,
          mockRegister.device_configuration
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [mockRegister]
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

    const registers = th.registers()

    expect(registers).toBeInstanceOf(v1.Registers)

    const { data } = await registers.updateDeviceConfiguration(
      mockRegister.id,
      mockRegister.device_configuration
    )

    expect(data).toEqual(mockRegister)
  })

  it('rejects on status codes that are not 200 when querying a register', async () => {
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
        .onGet(`https://api.tillhub.com/api/v1/registers/${legacyId}/${mockRegister.id}`)
        .reply(() => {
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

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.registers().get(mockRegister.id)
    } catch (err: any) {
      expect(err.name).toBe('RegisterFetchFailed')
    }
  })
})
