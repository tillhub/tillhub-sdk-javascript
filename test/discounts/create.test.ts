import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { DiscountType, DiscountGroupType } from '../../src/v0/discounts'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const discount = {
  amount: 123,
  type: 'percentage' as DiscountType,
  account: 'asdf',
  name: 'ewrt',
  group: 'cart' as DiscountGroupType,
  active: true,
  constraints: {}
}

describe('v0: Discounts: can create one discount', () => {
  it("Tillhub's discounts are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/discounts/${legacyId}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [discount]
          }
        ]
      })
    }

    const th = await initThInstance()

    const discounts = th.discounts()

    expect(discounts).toBeInstanceOf(v0.Discounts)

    const { data } = await discounts.create(discount)

    expect(data).toMatchObject(discount)
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

      mock.onPost(`https://api.tillhub.com/api/v0/discounts/${legacyId}`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.discounts().create(discount)
    } catch (err) {
      expect(err.name).toBe('DiscountCreationFailed')
    }
  })
})
