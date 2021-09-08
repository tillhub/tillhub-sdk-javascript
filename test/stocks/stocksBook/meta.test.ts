import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: StocksBook: can get meta', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/stock/${legacyId}/book/meta`).reply(() => {
        return [
          200,
          {
            results: [{ count: 900 }]
          }
        ]
      })
    }

    const th = await initThInstance()

    const stocksBook = th.stocksBook()

    expect(stocksBook).toBeInstanceOf(v0.StocksBook)

    const { data } = await stocksBook.meta()

    expect(data).toEqual({ count: 900 })
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
      mock.onGet(`https://api.tillhub.com/api/v0/stock/${legacyId}/book/meta`).reply(() => {
        return [400]
      })
    }

    try {
      const th = await initThInstance()
      await th.stocksBook().meta()
    } catch (err: any) {
      expect(err.name).toBe('StocksBookGetMetaFailed')
    }
  })
})
