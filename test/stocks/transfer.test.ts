import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const transferRequest = {
  product: 'asdf123',
  qty: 6,
  from: {
    id: 'from-location-id',
    location_type: 'branch'
  },
  to: {
    id: 'to-location-id'
  }
}

const transferResponse = {
  id: 'asdf123'
}

describe('v0: Stocks: can transfer stocks from one location to another', () => {
  it("Tillhub's stocks are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/stock/${legacyId}/transfer`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [transferResponse]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Stocks = th.stocks()

    expect(Stocks).toBeInstanceOf(v0.Stocks)

    const { data } = await Stocks.transfer(transferRequest)

    expect(data).toMatchObject(transferResponse)
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

      mock.onPost(`https://api.tillhub.com/api/v0/stock/${legacyId}/transfer`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.stocks().transfer(transferRequest)
    } catch (err) {
      expect(err.name).toBe('StocksTransferFailed')
    }
  })
})
