import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { PricebookEntries } from './../../src/v1/pricebook-entries'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const pricebookId = 'asdf5566'
const query = {
  price_book: pricebookId
}

describe('v1: PricebookEntries: can get all', () => {
  it("Tillhub's pricebook entries are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry?price_book=${pricebookId}`).reply(function (config) {
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

    const pricebookEntries = th.products().pricebookEntries()

    expect(pricebookEntries).toBeInstanceOf(PricebookEntries)

    const { data } = await pricebookEntries.getAll({ query })

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
      mock.onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry?price_book=${pricebookId}`).reply(function (config) {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.products().pricebookEntries().getAll({ query })
    } catch (err) {
      expect(err.name).toBe('PricebookEntriesFetchFailed')
    }
  })
})
