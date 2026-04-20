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

const listRow = {
  id: 'keycloak-user-uuid',
  username: 'api-user',
  email: 'api-user@so-use.partners.tillhub.com',
  groups: ['remote-ordering']
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [listRow]
            }
          ]
        })
    }

    const th = await initThInstance()

    const remoteOrderingApiUsers = th.remoteOrderingApiUsers()

    expect(remoteOrderingApiUsers).toBeInstanceOf(v0.RemoteOrderingApiUsers)

    const { data, metadata } = await remoteOrderingApiUsers.get()

    expect(data).toEqual([listRow])
    expect(metadata.count).toBe(1)
  })

  it('returns an empty list when results are missing or not an array', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts`)
        .reply(() => {
          return [200, { count: 0, results: undefined }]
        })
    }

    const th = await initThInstance()
    const { data, metadata } = await th.remoteOrderingApiUsers().get()

    expect(data).toEqual([])
    expect(metadata.count).toBe(0)
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts`)
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
