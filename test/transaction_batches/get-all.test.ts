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

const batchResult = {
  id: 1,
  inputFileName: 'batch.csv',
  inputFileFormat: 'csv',
  uploadedOn: '2025-02-01T00:00:00Z',
  inputFileSize: 1024,
  state: FileStatus.PROCESSING_DONE,
  createdBy: 'user@example.com',
  outputFileName: 'batch-out.csv'
}

describe('v0: TransactionBatches: can get all', () => {
  it("Tillhub's transaction batches are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [batchResult]
            }
          ]
        })
    }

    const th = await initThInstance()
    const transactionBatches = th.transactionBatches()

    expect(transactionBatches).toBeInstanceOf(v0.TransactionBatches)

    const { data } = await transactionBatches.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data.length).toBeGreaterThanOrEqual(0)
    if (data.length > 0) {
      expect(data[0]).toMatchObject({
        id: batchResult.id,
        inputFileName: batchResult.inputFileName,
        state: batchResult.state
      })
    }
  })

  it('returns next function when response has cursors.after', async () => {
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

      const cursorAfter = `https://api.tillhub.com/api/v0/transaction-batches/${legacyId}?after=token`
      mock
        .onGet(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [batchResult],
              cursors: { after: cursorAfter }
            }
          ]
        })

      mock
        .onGet(cursorAfter)
        .reply(() => {
          return [
            200,
            {
              count: 0,
              results: [],
              cursors: {}
            }
          ]
        })
    }

    const th = await initThInstance()
    const result = await th.transactionBatches().getAll()

    expect(result.data).toHaveLength(1)
    expect(result.metadata).toHaveProperty('cursor')
    expect(result.next).toBeDefined()
    expect(typeof result.next).toBe('function')

    if (process.env.SYSTEM_TEST !== 'true' && result.next) {
      const nextResult = await result.next()
      expect(nextResult.data).toEqual([])
    }
  })

  it('supports query params (limit, query)', async () => {
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
        .onGet(/https:\/\/api\.tillhub\.com\/api\/v0\/transaction-batches\/4564\?.*/)
        .reply((config) => {
          const url = config.url ?? ''
          if (url.includes('limit=5') && url.includes('state=PROCESSING_DONE')) {
            return [
              200,
              {
                count: 1,
                results: [batchResult]
              }
            ]
          }
          return [404]
        })
    }

    const th = await initThInstance()
    const { data } = await th.transactionBatches().getAll({
      limit: 5,
      query: { state: FileStatus.PROCESSING_DONE }
    })

    expect(Array.isArray(data)).toBe(true)
    if (process.env.SYSTEM_TEST !== 'true' && data.length > 0) {
      expect(data[0].state).toBe(FileStatus.PROCESSING_DONE)
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
        .onGet(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}`)
        .reply(() => {
          return [400]
        })
    }

    try {
      const th = await initThInstance()
      await th.transactionBatches().getAll()
    } catch (err: any) {
      expect(err.name).toBe('TransactionBatchesFetchFailed')
    }
  })
})
