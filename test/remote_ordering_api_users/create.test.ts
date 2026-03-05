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

const createResponse = {
  id: 'keycloak-user-uuid',
  location: 'https://keycloak.example.com/admin/realms/realm/users/keycloak-user-uuid'
}

describe('v0: RemoteOrderingApiUsers: can create api user', () => {
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
        .onPost(`https://api.tillhub.com/api/v0/remote-ordering-api-users/${legacyId}`)
        .reply(() => {
          return [
            201,
            {
              count: 1,
              results: [createResponse]
            }
          ]
        })
    }

    const th = await initThInstance()

    const remoteOrderingApiUsers = th.remoteOrderingApiUsers()

    expect(remoteOrderingApiUsers).toBeInstanceOf(v0.RemoteOrderingApiUsers)

    const { data } = await remoteOrderingApiUsers.create({ password: 'SecureP4ss!' })

    expect(data).toMatchObject(createResponse)
    expect(data.id).toBe(createResponse.id)
  })

  it('rejects on status codes that are not 200 or 201', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/remote-ordering-api-users/${legacyId}`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingApiUsers().create({ password: 'SecureP4ss!' })
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingApiUserCreateFailed')
    }
  })
})
