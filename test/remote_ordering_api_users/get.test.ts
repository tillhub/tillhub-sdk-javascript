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

const apiUser = {
  id: 'keycloak-user-uuid',
  username: 'api-user@example.com',
  exists: true
}

describe('v0: RemoteOrderingApiUsers: can get api user', () => {
  it("Tillhub's remote ordering api users are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-api-users/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [apiUser]
            }
          ]
        })
    }

    const th = await initThInstance()

    const remoteOrderingApiUsers = th.remoteOrderingApiUsers()

    expect(remoteOrderingApiUsers).toBeInstanceOf(v0.RemoteOrderingApiUsers)

    const { data } = await remoteOrderingApiUsers.get()

    expect(data).toMatchObject(apiUser)
    expect(data.exists).toBe(true)
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-api-users/${legacyId}`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingApiUsers().get()
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingApiUserFetchFailed')
    }
  })
})
