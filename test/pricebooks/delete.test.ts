import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Pricebooks } from './../../src/v1/pricebooks'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const pricebookId = 'asdf5566'
const respMsg = `Deleted pricebook ${pricebookId}`

describe('v0: Pricebooks: can delete a pricebook', () => {
  it("Tillhub's pricebooks are instantiable", async () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/${pricebookId}`)
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

    const pricebooks = th.products().pricebooks()

    expect(pricebooks).toBeInstanceOf(Pricebooks)

    const { msg } = await pricebooks.delete(pricebookId)

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
        .onDelete(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/${pricebookId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.products().pricebooks().delete(pricebookId)
    } catch (err) {
      expect(err.name).toBe('PricebookDeleteFailed')
    }
  })
})
