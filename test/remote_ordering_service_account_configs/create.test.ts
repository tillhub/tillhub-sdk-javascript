import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const serviceAccountId = '11111111-1111-1111-1111-111111111111'
const configId = '22222222-2222-2222-2222-222222222222'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const createdRow = {
  id: configId,
  serviceAccountId,
  locationId: '33333333-3333-3333-3333-333333333333',
  registerId: '44444444-4444-4444-4444-444444444444'
}

describe('v0: RemoteOrderingServiceAccountConfigs: create', () => {
  it('is instantiable and posts a new configuration', async () => {
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
        .onPost(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}`
        )
        .reply((config) => {
          expect(JSON.parse(config.data)).toEqual({
            locationId: createdRow.locationId,
            registerId: createdRow.registerId
          })
          return [
            201,
            {
              count: 1,
              results: [createdRow]
            }
          ]
        })
    }

    const th = await initThInstance()
    const api = th.remoteOrderingServiceAccountConfigs()

    expect(api).toBeInstanceOf(v0.RemoteOrderingServiceAccountConfigs)

    const { data } = await api.create(serviceAccountId, {
      locationId: createdRow.locationId,
      registerId: createdRow.registerId
    })

    expect(data).toEqual(createdRow)
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
        .onPost(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}`
        )
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingServiceAccountConfigs().create(serviceAccountId, {
        locationId: createdRow.locationId,
        registerId: createdRow.registerId
      })
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingServiceAccountConfigsFailed')
    }
  })
})
