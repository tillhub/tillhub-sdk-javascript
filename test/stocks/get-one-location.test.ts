import qs from 'qs'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const locationId = 'ec06a622-076d-4f5c-8cc3-105029e2b3f5'

const locationObject = {
  created_at: {
    iso: '2018-08-01T15:08:05.023Z',
    unix: 1533136085023
  },
  id: 'ec06a622-076d-4f5c-8cc3-105029e2b3f5',
  name: 'Branch Belvedere',
  insert_id: 15,
  type: 'branch',
  updated_at: null,
  qty: null
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Stock: Locations: can get one', () => {
  it("Tillhub's stocks is instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/stock/${legacyId}/locations/${locationId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [locationObject]
            }
          ]
        })
    }

    const th = await initThInstance()

    const stocks = th.stocks()

    expect(stocks).toBeInstanceOf(v0.Stocks)

    const { data } = await stocks.getOneLocation(locationId)

    expect(data).toEqual(locationObject)
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
        .onGet(`https://api.tillhub.com/api/v0/stock/${legacyId}/locations/${locationId}`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.stocks().getOneLocation(locationId)
    } catch (err) {
      expect(err.name).toBe('StocksLocationFetchOneFailed')
    }
  })
})
