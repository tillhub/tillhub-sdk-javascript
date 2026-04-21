import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const serviceAccountId = '11111111-1111-1111-1111-111111111111'
const configurationId = '22222222-2222-2222-2222-222222222222'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: RemoteOrderingServiceAccountConfigs: delete', () => {
  it('is instantiable and deletes a configuration (204)', async () => {
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
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}/configuration/${configurationId}`
        )
        .reply(() => {
          return [204]
        })
    }

    const th = await initThInstance()
    const api = th.remoteOrderingServiceAccountConfigs()

    expect(api).toBeInstanceOf(v0.RemoteOrderingServiceAccountConfigs)

    const { data } = await api.delete(serviceAccountId, configurationId)

    expect(data).toEqual({ success: true })
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
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}/configuration/${configurationId}`
        )
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingServiceAccountConfigs().delete(serviceAccountId, configurationId)
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingServiceAccountConfigsFailed')
    }
  })

  it('rejects when configurationId is missing or blank', async () => {
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
    const api = th.remoteOrderingServiceAccountConfigs()

    await expect(api.delete(serviceAccountId, '')).rejects.toMatchObject({
      name: 'RemoteOrderingServiceAccountConfigsFailed'
    })

    await expect(api.delete(serviceAccountId, '   ')).rejects.toMatchObject({
      name: 'RemoteOrderingServiceAccountConfigsFailed'
    })
  })
})
