import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Pricebooks } from './../../src/v1/pricebooks'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const pricebookIds = ['123', '456']

describe('v0: Pricebook: can copy pricebooks', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/copy`).reply(() => {
        return [
          200,
          {
            results: pricebookIds
          }
        ]
      })
    }

    const th = await initThInstance()

    const pricebooks = th.products().pricebooks()

    expect(pricebooks).toBeInstanceOf(Pricebooks)

    const { data } = await pricebooks.copy(pricebookIds)

    expect(data).toMatchObject(pricebookIds)
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book/copy`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.products().pricebooks().copy(pricebookIds)
    } catch (err: any) {
      expect(err.name).toBe('PricebooksCopyFailed')
    }
  })
})
