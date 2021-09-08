import qs from 'qs'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'

const legacyId = '4564'

const query = {
  limit: 15,
  embed: ['product', 'location'],
  start: '2018-10-05T10:27:12.929Z',
  end: '2019-02-04T12:29:52.929Z',
  product: 'a8fd68f1-3fc0-47bd-87c3-3b23e8750bc3',
  location: 'b1f8fb64-e468-43a4-a5da-f22d87ca9bd3',
  to: 'b1f8fb64-e468-43a4-a5da-f22d87ca9bd3',
  from: '9a638aa4-ce10-42d8-91b9-902ff0aba034'
}

const queryString = qs.stringify(query)

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: StocksBook: can get all', () => {
  it("Tillhub's stocksBook is instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/stock/${legacyId}/book?${queryString}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const stocksBook = th.stocksBook()

    expect(stocksBook).toBeInstanceOf(v0.StocksBook)

    const { data } = await stocksBook.getAll(query)

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
        .onGet(`https://api.tillhub.com/api/v0/stock/${legacyId}/book?${queryString}`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.stocksBook().getAll(query)
    } catch (err: any) {
      expect(err.name).toBe('StocksBookFetchFailed')
    }
  })
})
