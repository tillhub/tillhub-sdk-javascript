import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v2 } from '../../src/tillhub-js'
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

describe('v2: orders: can get keypairs', () => {
  const legacyId = '4564'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  const keypair = {
    keyPairId: 'kp-1',
    publicKey: 's-pub-xxx',
    secureLevel: 'SAQ-A',
    alias: 'ECOM key',
    productType: 'ECOM',
    keyPairState: 'ACTIVE',
    enableCrossChannelReferencing: false,
    unzerId: 'unzer-1',
    paymentTypes: []
  }

  it("Tillhub's orders are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v2/orders/${legacyId}/keypairs?type=ECOM`).reply(() => {
        return [
          200,
          {
            count: 1,
            msg: 'Success',
            results: [keypair]
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

    const ordersV2 = th.ordersV2()

    expect(ordersV2).toBeInstanceOf(v2.Orders)

    const { data, msg, metadata } = await ordersV2.keypairs({ type: 'ECOM' })
    expect(data).toEqual([keypair])
    expect(msg).toBe('Success')
    expect(metadata.count).toBe(1)
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

      mock.onGet(`https://api.tillhub.com/api/v2/orders/${legacyId}/keypairs?type=ECOM`).reply(() => {
        return [205]
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

    await expect(th.ordersV2().keypairs({ type: 'ECOM' })).rejects.toMatchObject({
      name: 'OrderKeypairsFetchFailed'
    })
  })

  it('can get PAYLATER keypairs', async () => {
    const paylaterKeypair = {
      ...keypair,
      alias: 'PAYLATER key',
      productType: 'PAYLATER'
    }

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

      mock.onGet(`https://api.tillhub.com/api/v2/orders/${legacyId}/keypairs?type=PAYLATER`).reply(() => {
        return [
          200,
          {
            count: 1,
            msg: 'Success',
            results: [paylaterKeypair]
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

    const { data, msg, metadata } = await th.ordersV2().keypairs({ type: 'PAYLATER' })
    expect(data).toEqual([paylaterKeypair])
    expect(msg).toBe('Success')
    expect(metadata.count).toBe(1)
  })
})
