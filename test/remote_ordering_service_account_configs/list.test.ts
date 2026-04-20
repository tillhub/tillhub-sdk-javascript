import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const serviceAccountId = '11111111-1111-1111-1111-111111111111'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const configRow = {
  id: '22222222-2222-2222-2222-222222222222',
  serviceAccountId,
  locationId: '33333333-3333-3333-3333-333333333333',
  registerId: '44444444-4444-4444-4444-444444444444'
}

describe('v0: RemoteOrderingServiceAccountConfigs: list', () => {
  it('is instantiable and returns configuration rows', async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [configRow],
              cursors: { after: null, before: null }
            }
          ]
        })
    }

    const th = await initThInstance()
    const api = th.remoteOrderingServiceAccountConfigs()

    expect(api).toBeInstanceOf(v0.RemoteOrderingServiceAccountConfigs)

    const { data, metadata } = await api.list(serviceAccountId)

    expect(data).toEqual([configRow])
    expect(metadata.count).toBe(1)
  })

  it('listAll aggregates all pages', async () => {
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

      const page2Url = `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}?cursor=next`

      mock
        .onGet(
          `https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/service-accounts-configuration/${serviceAccountId}`
        )
        .replyOnce(() => {
          return [
            200,
            {
              count: 2,
              results: [configRow],
              cursors: { after: page2Url, before: null }
            }
          ]
        })

      mock.onGet(page2Url).replyOnce(() => {
        return [
          200,
          {
            count: 2,
            results: [
              {
                id: '55555555-5555-5555-5555-555555555555',
                serviceAccountId,
                locationId: '66666666-6666-6666-6666-666666666666',
                registerId: '77777777-7777-7777-7777-777777777777'
              }
            ],
            cursors: { after: null, before: null }
          }
        ]
      })
    }

    const th = await initThInstance()
    const all = await th.remoteOrderingServiceAccountConfigs().listAll(serviceAccountId)

    expect(all).toHaveLength(2)
    expect(all[0].id).toBe(configRow.id)
    expect(all[1].id).toBe('55555555-5555-5555-5555-555555555555')
  })

  it('rejects when serviceAccountId is missing or blank', async () => {
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

    await expect(api.list('')).rejects.toMatchObject({
      name: 'RemoteOrderingServiceAccountConfigsFailed'
    })

    await expect(api.list('   ')).rejects.toMatchObject({
      name: 'RemoteOrderingServiceAccountConfigsFailed'
    })
  })
})
