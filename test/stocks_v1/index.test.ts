import { StocksBookFetchFailed } from './../../src/v0/stocks'
import * as dotenv from 'dotenv'
import qs from 'qs'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

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

const query = {
  format: 'csv',
  start: '2019-03-18T22:59:59.999Z',
  end: '2019-03-07T23:00:00.000Z'
}

const stocksData = {
  correlationId: 'asdf-1234-zxcv-4567'
}

describe('v1: StocksBookV1', () => {
  it('can get stocks book export', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/stock/${legacyId}/book?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [stocksData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const stocks = th.stocksBookV1()

    expect(stocks).toBeInstanceOf(v1.StocksBook)

    const { data } = await stocks.getAll(query)

    expect(Array.isArray(data)).toBe(true)
    expect(data?.[0]).toEqual(stocksData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/stock/${legacyId}/book?${qs.stringify(query)}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const stocksBook = th.stocksBookV1()

    try {
      await stocksBook.getAll(query)
    } catch (err) {
      expect(err.name).toBe(StocksBookFetchFailed.name)
    }
  })
})
