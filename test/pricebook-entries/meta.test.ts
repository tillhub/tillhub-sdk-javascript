import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { PricebookEntries } from './../../src/v1/pricebook-entries'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

describe('v0: PricebookEntries: can get count number of all pricebook entries', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })
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
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry/meta`)
        .reply(() => {
          return [
            200,
            {
              count: 50,
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const pricebookEntries = th.products().pricebookEntries()

    expect(pricebookEntries).toBeInstanceOf(PricebookEntries)

    const { data } = await pricebookEntries.meta()

    expect(data).toEqual([{ count: 50 }])
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
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry/meta`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.products().pricebookEntries().meta()
    } catch (err: any) {
      expect(err.name).toBe('PricebookEntriesMetaFailed')
    }
  })
})
