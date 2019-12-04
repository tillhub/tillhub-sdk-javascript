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

const pricebookId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const pricebook = {
  name: 'testName3'
}

describe('v0: Pricebooks: can alter the pricebooks', () => {
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
        .onPut(`https://api.tillhub.com/api/v0/pricebooks/${legacyId}/${pricebookId}`)
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

    const pricebooks = th.pricebooks()

    expect(pricebooks).toBeInstanceOf(v0.Pricebooks)

    const { data } = await pricebooks.put(pricebookId, pricebook)

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
        .onPut(`https://api.tillhub.com/api/v0/pricebooks/${legacyId}/${pricebookId}`)
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.pricebooks().put(pricebookId, pricebook)
    } catch (err) {
      expect(err.name).toBe('PricebookPutFailed')
    }
  })
})
