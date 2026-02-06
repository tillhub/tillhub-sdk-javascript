import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { FileStatus } from '../../src/v0/transaction_batches'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: TransactionBatches: can get meta', () => {
  it('meta with query params returns filtered count', async () => {
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
        .onGet(/https:\/\/api\.tillhub\.com\/api\/v0\/transaction-batches\/4564\/meta\?.*/)
        .reply((config) => {
          const url = config.url ?? ''
          if (url.includes('limit=10') && url.includes('state=PROCESSING_DONE')) {
            return [
              200,
              {
                count: 7,
                results: [{ count: 7 }]
              }
            ]
          }
          return [404]
        })
    }

    const th = await initThInstance()
    const transactionBatches = th.transactionBatches()

    const meta = await transactionBatches.meta({
      limit: 10,
      query: { state: FileStatus.PROCESSING_DONE }
    })

    expect(meta).toHaveProperty('data')
    expect(meta).toHaveProperty('metadata')
    expect(meta.metadata).toHaveProperty('count')
    if (process.env.SYSTEM_TEST !== 'true') {
      expect(meta.metadata.count).toBe(7)
      expect(meta.data).toEqual({ count: 7 })
    }
  })

  it("Tillhub's transaction batches meta is returned", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}/meta`)
        .reply(() => {
          return [
            200,
            {
              count: 42,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()
    const transactionBatches = th.transactionBatches()

    expect(transactionBatches).toBeInstanceOf(v0.TransactionBatches)

    const meta = await transactionBatches.meta()

    expect(meta).toHaveProperty('data')
    expect(meta).toHaveProperty('metadata')
    expect(meta.metadata).toHaveProperty('count')
    expect(typeof meta.metadata.count).toBe('number')
    if (process.env.SYSTEM_TEST !== 'true') {
      expect(meta.metadata.count).toBe(42)
    }
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
        .onGet(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}/meta`)
        .reply(() => {
          return [500]
        })
    }

    try {
      const th = await initThInstance()
      await th.transactionBatches().meta()
    } catch (err: any) {
      expect(err.name).toBe('TransactionBatchesMetaFailed')
    }
  })
})
