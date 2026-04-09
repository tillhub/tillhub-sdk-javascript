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

const createResultRow = {
  id: 'keycloak-user-uuid',
  username: 'john.doe',
  email: 'john.doe@so-use.partners.tillhub.com',
  enabled: true,
  attributes: {
    clientAccountId: legacyId,
    partner: 'so-use'
  }
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
        .onPost(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts`)
        .reply((config) => {
          expect(JSON.parse(config.data)).toEqual({
            partner: 'so-use',
            password: 'SecureP4ss!'
          })
          return [
            201,
            {
              count: 1,
              results: [createResultRow]
            }
          ]
        })
    }

    const th = await initThInstance()

    const remoteOrderingApiUsers = th.remoteOrderingApiUsers()

    expect(remoteOrderingApiUsers).toBeInstanceOf(v0.RemoteOrderingApiUsers)

    const { data } = await remoteOrderingApiUsers.create({
      partner: 'so-use',
      password: 'SecureP4ss!'
    })

    expect(data).toEqual(createResultRow)
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
        .onPost(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th
        .remoteOrderingApiUsers()
        .create({ partner: 'so-use', password: 'SecureP4ss!' })
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingApiUserCreateFailed')
    }
  })
})
