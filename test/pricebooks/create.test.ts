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

const pricebook = {
  name: 'Test name',
  constraints: {}
}

describe('v0: Pricebook: can create one pricebook', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book`).reply(() => {
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

    const { data } = await pricebooks.create(pricebook)

    expect(data).toMatchObject(pricebook)
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

      mock.onPost(`https://api.tillhub.com/api/v1/products/${legacyId}/prices/book`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.products().pricebooks().create(pricebook)
    } catch (err: any) {
      expect(err.name).toBe('PricebookCreationFailed')
    }
  })
})
