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

const meResponse = {
  role: 'owner',
  scopes: ['products:read', 'products:create', 'products:delete']
}

describe('v0: Me: can get me data', () => {
  it("Tillhub's Me is instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/me`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [meResponse]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Me = th.me()

    expect(Me).toBeInstanceOf(v0.Me)

    const { data } = await Me.get()

    expect(data).toMatchObject(meResponse)
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

      mock.onGet(`https://api.tillhub.com/api/v0/me`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.me().get()
    } catch (err) {
      expect(err.name).toBe('MeFetchFailed')
    }
  })

  it('can send errors attached to the response', async () => {
    const errorsArr = [
      {
        id: '1234',
        label: 'some.error.key',
        errorDetails: { msg: 'Error message' }
      }
    ]

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

      mock.onGet(`https://api.tillhub.com/api/v0/me`).reply(() => {
        return [
          200,
          {
            count: 1,
            errors: errorsArr,
            results: [meResponse]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Me = th.me()

    expect(Me).toBeInstanceOf(v0.Me)

    const { data, errors } = await Me.get()

    expect(data).toMatchObject(meResponse)
    expect(errors).toMatchObject(errorsArr)
  })
})
