import qs from 'qs'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
import faker from '@faker-js/faker'

dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

const urlPath = faker.internet.url()

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const query = {
  deleted: false
}

function queryString () {
  return qs.stringify(query)
}

const legacyId = '4564'

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

afterEach(() => {
  mock.reset()
})

describe('v0: purchase orders:', () => {
  it('can export transactions items reports', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/purchase-orders/${legacyId}/export?${queryString()}`)
        .reply(() => {
          return [200, { results: [{ url: urlPath, filename: 'filename' }] }]
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

    const purchaseOrders = th.purchaseOrders()
    expect(purchaseOrders).toBeInstanceOf(v0.PurchaseOrders)

    const { data = {} } = await purchaseOrders.export(query)

    expect(data.url).toBe(urlPath)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v0/purchase-orders/${legacyId}/export?${queryString()}`)
        .reply(() => {
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

    const purchaseOrders = th.purchaseOrders()
    expect(purchaseOrders).toBeInstanceOf(v0.PurchaseOrders)

    try {
      await purchaseOrders.export()
    } catch (err: any) {
      expect(err.name).toBe('PurchaseOrdersExportFailed')
    }
  })
})
