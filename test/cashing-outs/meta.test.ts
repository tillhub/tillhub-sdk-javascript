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

describe('v0: Cashing Outs: can get meta of cashing outs', () => {
  it("Tillhub's cashingOuts are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/cashier_counting_protocol/${legacyId}/meta`)
        .reply(function (config) {
          return [
            200,
            {
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const CashingOuts = th.cashingOuts()

    expect(CashingOuts).toBeInstanceOf(v0.CashingOuts)

    const { data } = await CashingOuts.meta()

    expect(data).toEqual({ count: 50 })
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
        .onGet(`https://api.tillhub.com/api/v0/cashier_counting_protocol/${legacyId}/meta`)
        .reply(function (config) {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.cashingOuts().meta()
    } catch (err) {
      expect(err.name).toBe('CashingOutsMetaFailed')
    }
  })
})
