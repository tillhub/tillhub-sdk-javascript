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

const pricebook = {
  name: 'Test name',
  constraints: {}
}

describe('v0: Pricebook: can create one pricebook', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/pricebooks/${legacyId}`).reply(function (config) {
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

    const pricebooks = th.pricebooks()

    expect(pricebooks).toBeInstanceOf(v0.Pricebooks)

    const { data } = await pricebooks.create(pricebook)

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

      mock.onPost(`https://api.tillhub.com/api/v0/pricebooks/${legacyId}`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.pricebooks().create(pricebook)
    } catch (err) {
      expect(err.name).toBe('PricebookCreationFailed')
    }
  })
})
