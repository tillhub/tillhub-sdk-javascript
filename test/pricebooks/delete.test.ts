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

const pricebookId = 'asdf5566'
const respMsg = `Deleted pricebook ${pricebookId}`

describe('v0: Pricebooks: can delete a pricebook', () => {
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
        .onDelete(`https://api.tillhub.com/api/v0/pricebooks/${legacyId}/${pricebookId}`)
        .reply(function (config) {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const pricebooks = th.pricebooks()

    expect(pricebooks).toBeInstanceOf(v0.Pricebooks)

    const { msg } = await pricebooks.delete(pricebookId)

    expect(msg).toEqual(respMsg)
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
        .onDelete(`https://api.tillhub.com/api/v0/pricebooks/${legacyId}/${pricebookId}`)
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.pricebooks().delete(pricebookId)
    } catch (err) {
      expect(err.name).toBe('PricebookDeleteFailed')
    }
  })
})
