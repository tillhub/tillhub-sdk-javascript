import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'
const mockTransactionId = '516976d6-4912-4021-af8a-d7e6e4ebfa08'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const mockImage = {
  '1x': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_1x.png',
  '2x': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_2x.png',
  '3x': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_3x.png',
  'original': 'https://storage.googleapis.com/tillhub-api-private-images-staging/FE9900870C4D328/transactions/bd3d1812-db1c-45fe-3cde-05dafa985a6c_original.png'
}

const updateObject = {
  id: mockTransactionId,
  images: mockImage
}

describe('v0: Transactions: can alter the image', () => {
  it("Tillhub's transactions are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() =>  {
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
        .onPost(`https://api.tillhub.com/api/v1/transactions/${legacyId}/${mockTransactionId}/images`)
        .reply(() =>  {
          return [
            200,
            {
              results: updateObject
            }
          ]
        })
    }

    const th = await initThInstance()

    const transactions = th.transactions()

    expect(transactions).toBeInstanceOf(v1.Transactions)

    const { data } = await transactions.createImage(mockTransactionId, mockImage)

    expect(data).toMatchObject(updateObject)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() =>  {
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
        .onPost(`https://api.tillhub.com/api/v1/transactions/${legacyId}/${mockTransactionId}/images`)
        .reply(() =>  {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.transactions().createImage(mockTransactionId, mockImage)
    } catch (err) {
      expect(err.name).toBe('TransactionsImageCreateFailed')
    }
  })
})
