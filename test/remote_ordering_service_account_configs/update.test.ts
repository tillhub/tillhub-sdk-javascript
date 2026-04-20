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

const updatedRow = {
  id: configurationId,
  serviceAccountId,
  locationId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa',
  registerId: 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'
}

describe('v0: RemoteOrderingServiceAccountConfigs: update', () => {
  it('is instantiable and puts an existing configuration', async () => {
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
        .onPut(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}/configuration/${configurationId}`
        )
        .reply((config) => {
          expect(JSON.parse(config.data)).toEqual({
            locationId: updatedRow.locationId,
            registerId: updatedRow.registerId
          })
          return [
            200,
            {
              count: 1,
              results: [updatedRow]
            }
          ]
        })
    }

    const th = await initThInstance()
    const api = th.remoteOrderingServiceAccountConfigs()

    expect(api).toBeInstanceOf(v0.RemoteOrderingServiceAccountConfigs)

    const { data } = await api.update(serviceAccountId, configurationId, {
      locationId: updatedRow.locationId,
      registerId: updatedRow.registerId
    })

    expect(data).toEqual(updatedRow)
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
        .onPut(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}/configuration/${configurationId}`
        )
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingServiceAccountConfigs().update(serviceAccountId, configurationId, {
        locationId: updatedRow.locationId,
        registerId: updatedRow.registerId
      })
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

    await expect(
      api.update(serviceAccountId, '', {
        locationId: updatedRow.locationId,
        registerId: updatedRow.registerId
      })
    ).rejects.toMatchObject({
      name: 'RemoteOrderingServiceAccountConfigsFailed'
    })

    await expect(
      api.update(serviceAccountId, '   ', {
        locationId: updatedRow.locationId,
        registerId: updatedRow.registerId
      })
    ).rejects.toMatchObject({
      name: 'RemoteOrderingServiceAccountConfigsFailed'
    })
  })
})
