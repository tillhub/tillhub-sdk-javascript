import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { PricebookEntries } from './../../src/v1/pricebook-entries'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const pricebookEntryId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const pricebookEntry = {
  price_book: '123456',
  product: 'qwerty'
}

describe('v0: PricebookEntries: can alter the pricebookEntries', () => {
  it("Tillhub's pricebookEntries are instantiable", async () => {
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
        .onPut(
          `https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry/${pricebookEntryId}`
        )
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

    const { data } = await pricebookEntries.put(pricebookEntryId, pricebookEntry)

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
        .onPut(
          `https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry/${pricebookEntryId}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.products().pricebookEntries().put(pricebookEntryId, pricebookEntry)
    } catch (err: any) {
      expect(err.name).toBe('PricebookEntryPutFailed')
    }
  })
})
