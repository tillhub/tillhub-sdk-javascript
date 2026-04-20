import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const serviceAccountId = 'svc-acc-id'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: RemoteOrderingApiUsers: can delete api user', () => {
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
        .onDelete(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts/${serviceAccountId}`
        )
        .reply(() => {
          return [204]
        })
    }

    const th = await initThInstance()

    const remoteOrderingApiUsers = th.remoteOrderingApiUsers()

    expect(remoteOrderingApiUsers).toBeInstanceOf(v0.RemoteOrderingApiUsers)

    const { data } = await remoteOrderingApiUsers.delete(serviceAccountId)

    expect(data).toBeNull()
  })

  it('rejects on status codes that are not 200 or 204', async () => {
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
        .onDelete(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts/${serviceAccountId}`
        )
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingApiUsers().delete(serviceAccountId)
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingApiUserDeleteFailed')
    }
  })

  it('rejects when serviceAccountId is missing or blank (no list/delete-first)', async () => {
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
    }

    const th = await initThInstance()

    await expect(th.remoteOrderingApiUsers().delete('')).rejects.toMatchObject({
      name: 'RemoteOrderingApiUserDeleteFailed'
    })

    await expect(th.remoteOrderingApiUsers().delete('   ')).rejects.toMatchObject({
      name: 'RemoteOrderingApiUserDeleteFailed'
    })
  })
})
