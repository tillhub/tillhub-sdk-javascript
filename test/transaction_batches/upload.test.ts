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

describe('v0: TransactionBatches: can upload', () => {
  it("Tillhub's transaction batches upload succeeds", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}/upload`)
        .reply(() => {
          return [
            200,
            {
              results: { id: 'batch-1', state: 'UPLOADED' },
              msg: 'Upload successful'
            }
          ]
        })
    }

    const th = await initThInstance()
    const transactionBatches = th.transactionBatches()

    expect(transactionBatches).toBeInstanceOf(v0.TransactionBatches)

    const file =
      typeof File !== 'undefined'
        ? new File(['content'], 'batch.csv', { type: 'text/csv' })
        : (new Blob(['content'], { type: 'text/csv' }) as File)
    const payload = {
      publicKey: 'pk-test',
      file
    }

    const result = await transactionBatches.upload(payload)

    expect(result).toHaveProperty('data')
    expect(result.data).toBeDefined()
    if (process.env.SYSTEM_TEST !== 'true') {
      expect(result.data).toMatchObject({ state: 'UPLOADED' })
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
        .onPost(`https://api.tillhub.com/api/v0/transaction-batches/${legacyId}/upload`)
        .reply(() => {
          return [400]
        })
    }

    const th = await initThInstance()
    const file =
      typeof File !== 'undefined'
        ? new File(['content'], 'batch.csv', { type: 'text/csv' })
        : (new Blob(['content'], { type: 'text/csv' }) as File)
    const payload = {
      publicKey: 'pk-test',
      file
    }

    try {
      await th.transactionBatches().upload(payload)
    } catch (err: any) {
      expect(err.name).toBe('TransactionBatchUploadFailed')
    }
  })
})
