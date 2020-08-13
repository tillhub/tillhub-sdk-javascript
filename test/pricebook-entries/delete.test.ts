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

const pricebookEntryId = 'asdf5566'
const respMsg = `Deleted pricebook entry ${pricebookEntryId}`

describe('v0: PricebookEntries: can delete a pricebook', () => {
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
        .onDelete(
          `https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry/${pricebookEntryId}`
        )
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const pricebookEntries = th.products().pricebookEntries()

    expect(pricebookEntries).toBeInstanceOf(PricebookEntries)

    const { msg } = await pricebookEntries.delete(pricebookEntryId)

    expect(msg).toEqual(respMsg)
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
        .onDelete(
          `https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/entry/${pricebookEntryId}`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.products().pricebookEntries().delete(pricebookEntryId)
    } catch (err) {
      expect(err.name).toBe('PricebookEntryDeleteFailed')
    }
  })
})
