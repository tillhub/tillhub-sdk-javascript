import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const safe = {
  name: 'Safe 1',
  type: 'safe',
  account_number: '123456789',
  custom_id: 'xyz1',
  cost_center: 'cc4',
  location: '7b54cdc2-0b93-4af9-86ea-5541f53c8392',
  limit_upper: 1000000,
  limit_lower: 1000,
  items: [
    {
      currency: 'EUR',
      amount: 4456.39
    },
    {
      currency: 'USD',
      amount: 10.55
    }
  ]
}

describe('v0: Safes: can create one safe', () => {
  it("Tillhub's safes are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/safes/${legacyId}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [safe]
          }
        ]
      })
    }

    const th = await initThInstance()

    const safes = th.safes()

    expect(safes).toBeInstanceOf(v0.Safes)

    const { data } = await safes.create(safe)

    expect(data).toMatchObject(safe)
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

      mock.onPost(`https://api.tillhub.com/api/v0/safes/${legacyId}`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.safes().create(safe)
    } catch (err) {
      expect(err.name).toBe('SafesCreationFailed')
    }
  })
})
