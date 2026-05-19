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

const progressRow = {
  started: true,
  finished: false,
  progress: 30,
  startedAt: '2026-05-01T00:00:00.000Z',
  lastUpdatedAt: '2026-05-01T01:00:00.000Z'
}

describe('v0: RemoteOrderingMigration: getProgress', () => {
  it('is instantiable and returns data migration progress', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/data-migration-progress`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              msg: 'Success',
              results: [progressRow]
            }
          ]
        })
    }

    const th = await initThInstance()
    const api = th.remoteOrderingMigration()

    expect(api).toBeInstanceOf(v0.RemoteOrderingMigration)

    const { data, metadata, msg } = await api.getProgress()

    expect(data).toEqual(progressRow)
    expect(metadata.count).toBe(1)
    expect(msg).toBe('Success')
  })

  it('returns null when results are missing', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/data-migration-progress`)
        .reply(() => {
          return [200, { count: 0, results: undefined }]
        })
    }

    const th = await initThInstance()
    const { data, metadata } = await th.remoteOrderingMigration().getProgress()

    expect(data).toBeNull()
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
        .onGet(`https://api.tillhub.com/api/v0/remote-ordering-inner/${legacyId}/data-migration-progress`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.remoteOrderingMigration().getProgress()
    } catch (err: any) {
      expect(err.name).toBe('RemoteOrderingMigrationProgressFetchFailed')
    }
  })
})
