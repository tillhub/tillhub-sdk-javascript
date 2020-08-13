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

const safeId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const safe = {
  name: 'testName1'
}

describe('v0: Safes: can get one safe', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/safes/${legacyId}/${safeId}`).reply(() => {
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

    const Safes = th.safes()

    expect(Safes).toBeInstanceOf(v0.Safes)

    const { data } = await Safes.get(safeId)

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

      mock.onGet(`https://api.tillhub.com/api/v0/safes/${legacyId}/${safeId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.safes().get(safeId)
    } catch (err) {
      expect(err.name).toBe('SafesFetchOneFailed')
    }
  })
})
