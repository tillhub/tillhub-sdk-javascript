import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient, v0 } from '../../src/tillhub-js'

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
const queryString = 'description=1&product_group_id=2&qty%5Bfrom%5D=10&qty%5Bto%5D=20&revenue%5Bfrom%5D=10&revenue%5Bto%5D=20&net_revenue%5Bfrom%5D=10&net_revenue%5Bto%5D=20&q=thisSearch'

const queryObject = {
  description: '1',
  product_group_id: '2',
  qty: {
    from: 10,
    to: 20
  },
  revenue: {
    from: 10,
    to: 20
  },
  net_revenue: {
    from: 10,
    to: 20
  },
  q: 'thisSearch'
}
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics Report Groups - getReportGroups', () => {
  it("Tillhub's Analytics are instantiable", async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/product_groups?${queryString}`
        )
        .reply(function (config) {
          return [
            200,
            {
              count: 25,
              table_size: '123',
              results: [
                {
                  values: [{}]
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

    const analytics = th.analytics()

    expect(analytics).toBeInstanceOf(v0.Analytics)

    const { data } = await analytics.getProductGroups(queryObject)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/product_groups?${queryString}`
        )
        .reply(function (config) {
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

    try {
      await th.analytics().getProductGroups(queryObject)
    } catch (err) {
      expect(err.name).toBe('ProductGroupsFetchFailed')
    }
  })
})
