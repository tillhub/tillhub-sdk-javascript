import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const promotionId = 'asdf5566'
const promotion = {
  barcode: '12345',
  name: 'test',
  locations: [],
  description: 'test',
  type: 'cart_map_function'
}

describe('v1: Promotions: can get one promotion', () => {
  it("Tillhub's reasons are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/promotions/${legacyId}/${promotionId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [promotion]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Promotions = th.promotionsV1()

    expect(Promotions).toBeInstanceOf(v1.Promotions)

    const { data } = await Promotions.get(promotionId)

    expect(data).toMatchObject(promotion)
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

      mock.onGet(`https://api.tillhub.com/api/v1/promotions/${legacyId}/${promotionId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.promotionsV1().get(promotionId)
    } catch (err: any) {
      expect(err.name).toBe('PromotionFetchFailed')
    }
  })
})
