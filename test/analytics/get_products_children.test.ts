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

const productNumber = '1234'
const legacyId = '4564'
const queryString =
  'start=2018-07-29T14%253A55%253A05.000Z&end=2018-08-29T14%253A55%253A05.000Z&branch_id=1&register_id=1&staff_id=1&limit=200&offset=10&q=thisSearch'
const queryObject = {
  start: '2018-07-29T14%3A55%3A05.000Z',
  end: '2018-08-29T14%3A55%3A05.000Z',
  branch_id: '1',
  register_id: '1',
  staff_id: '1',
  limit: 200,
  offset: 10,
  q: 'thisSearch'
}
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics Products Children- getProductsChildren', () => {
  it("Tillhub's Analytics are instantiable", async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/products/${productNumber}?${queryString}`
        )
        .reply(() => {
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

    const { data } = await analytics.getProductsChildren(productNumber, queryObject)

    expect(Array.isArray(data)).toBe(true)
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
        .onGet(
          `https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/products/${productNumber}?${queryString}`
        )
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

    try {
      await th.analytics().getProductsChildren(productNumber, queryObject)
    } catch (err) {
      expect(err.name).toBe('StatisticsProductChildrenFetchFailed')
    }
  })
})
