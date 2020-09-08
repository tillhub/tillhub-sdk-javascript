import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Counting Protocols: can get meta of counting protocols', () => {
  it("Tillhub's countingProtocols are instantiable", async () => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v0/cashier_counting_protocols/${legacyId}/meta`)
        .reply(() => {
          return [
            200,
            {
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const CountingProtocols = th.countingProtocols()

    expect(CountingProtocols).toBeInstanceOf(v0.CountingProtocols)

    const { data } = await CountingProtocols.meta()

    expect(data).toEqual({ count: 50 })
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

      mock
        .onGet(`https://api.tillhub.com/api/v0/cashier_counting_protocols/${legacyId}/meta`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.countingProtocols().meta()
    } catch (err) {
      expect(err.name).toBe('CountingProtocolsMetaFailed')
    }
  })
})
