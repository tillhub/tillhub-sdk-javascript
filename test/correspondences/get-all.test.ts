import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Correspondences } from './../../src/v0/correspondences'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Correspondences: can get all', () => {
  it("Tillhub's Correspondences are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/correspondences/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const correspondences = th.correspondences()

    expect(correspondences).toBeInstanceOf(Correspondences)

    const { data } = await correspondences.getAll()

    expect(Array.isArray(data)).toBe(true)
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
      mock.onGet(`https://api.tillhub.com/api/v0/correspondences/${legacyId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.correspondences().getAll()
    } catch (err) {
      expect(err.name).toBe('CorrespondencesFetchFailed')
    }
  })
})
