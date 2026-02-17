import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const batchId = '123'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const blobContent = 'original-input-file-content'
const inputFileName = 'input.csv'

describe('v0: TransactionBatches: can download input file', () => {
  it("Tillhub's transaction batches downloadInput returns blob", async () => {
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
          new RegExp(
            `https://api\\.tillhub\\.com/api/v0/transaction-batches/${legacyId}/${batchId}/download-input\\?.*inputFileName=`
          )
        )
        .reply((config) => {
          if (config.responseType === 'blob') {
            return [200, blobContent]
          }
          return [400, 'Bad input']
        })
    }

    const th = await initThInstance()
    const transactionBatches = th.transactionBatches()

    expect(transactionBatches).toBeInstanceOf(v0.TransactionBatches)

    const result = await transactionBatches.downloadInput(batchId, inputFileName)

    expect(result).toBeDefined()
    if (process.env.SYSTEM_TEST !== 'true') {
      expect(result).toEqual(blobContent)
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
        .onGet(
          new RegExp(
            `https://api\\.tillhub\\.com/api/v0/transaction-batches/${legacyId}/${batchId}/download-input\\?.*inputFileName=`
          )
        )
        .reply(() => {
          return [404]
        })
    }

    try {
      const th = await initThInstance()
      await th.transactionBatches().downloadInput(batchId, inputFileName)
    } catch (err: any) {
      expect(err.name).toBe('TransactionBatchDownloadInputFailed')
    }
  })
})
