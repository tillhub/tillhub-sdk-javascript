import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { PricebookEntries } from '../../src/v1/pricebook-entries'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const pricebookEntry = {
  price_book: '123456id',
  product: 'asdf2345'
}

describe('v0: PricebookEntries: can create one pricebook', () => {
  it("Tillhub's pricebook entries are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [pricebookEntry]
            }
          ]
        })
    }

    const th = await initThInstance()

    const pricebookEntries = th.products().pricebookEntries()

    expect(pricebookEntries).toBeInstanceOf(PricebookEntries)

    const { data } = await pricebookEntries.create(pricebookEntry)

    expect(data).toMatchObject(pricebookEntry)
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
        .onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th
        .products()
        .pricebookEntries()
        .create(pricebookEntry)
    } catch (err) {
      expect(err.name).toBe('PricebookEntryCreationFailed')
    }
  })
})
