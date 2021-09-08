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

const safeId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const safe = {
  name: 'testName3'
}

describe('v0: Safes: can alter the Safes', () => {
  it("Tillhub's safes are instantiable", async () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/safes/${legacyId}/${safeId}`).reply(() => {
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

    const { data } = await safes.put(safeId, safe)

    expect(data).toMatchObject(safe)
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
      mock.onPut(`https://api.tillhub.com/api/v0/safes/${legacyId}/${safeId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.safes().put(safeId, safe)
    } catch (err: any) {
      expect(err.name).toBe('SafesPutFailed')
    }
  })
})
