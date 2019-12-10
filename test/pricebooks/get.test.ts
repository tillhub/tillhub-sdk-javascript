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

const pricebookId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const pricebook = {
  name: 'testName1'
}

describe('v0: Pricebooks: can get one pricebook', () => {
  it("Tillhub's pricebooks are instantiable", async () => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/${pricebookId}`)
        .reply(function (config) {
          return [
            200,
            {
              count: 1,
              results: [pricebook]
            }
          ]
        })
    }

    const th = await initThInstance()

    const pricebooks = th.products().pricebooks()

    expect(pricebooks).toBeInstanceOf(Pricebooks)

    const { data } = await pricebooks.get(pricebookId)

    expect(data).toMatchObject(pricebook)
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/${pricebookId}`)
        .reply(function (config) {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.products().pricebooks().get(pricebookId)
    } catch (err) {
      expect(err.name).toBe('PricebookFetchFailed')
    }
  })
})
