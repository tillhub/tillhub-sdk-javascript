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
const respMsg = `Deleted promotion ${promotionId}`

describe('v1: Promotions: can delete a promotion', () => {
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

      mock.onDelete(`https://api.tillhub.com/api/v1/promotions/${legacyId}/${promotionId}`).reply(() => {
        return [
          200,
          {
            msg: respMsg
          }
        ]
      })
    }

    const th = await initThInstance()

    const promotions = th.promotionsV1()

    expect(promotions).toBeInstanceOf(v1.Promotions)

    const { msg } = await promotions.delete(promotionId)

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
      mock.onDelete(`https://api.tillhub.com/api/v1/promotions/${legacyId}/${promotionId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.promotionsV1().delete(promotionId)
    } catch (err: any) {
      expect(err.name).toBe('PromotionDeleteFailed')
    }
  })
})
