import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const responseData = { msg: 'Chunk stored', results: [] }

const products = [
  { productName: 'Product 1', id: '123123' },
  { productName: 'Product 2', id: '321321' }
]

const chunksPayload = {
  correlationId: '123',
  isDone: false,
  index: 0,
  type: 'product',
  chunk: products
}

describe('v1: Import: can import chunks', () => {
  it("Tillhub's documents are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/import/${legacyId}/chunks`).reply(() => {
        return [200, responseData]
      })
    }

    const th = await initThInstance()

    expect(th.import()).toBeInstanceOf(v1.Import)

    const { data } = await th.import().chunks(chunksPayload)
    expect(data).toMatchObject(responseData.results)
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

      mock.onPost(`https://api.tillhub.com/api/v1/import/${legacyId}/chunks`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.import().chunks(chunksPayload)
    } catch (err: any) {
      expect(err.name).toBe('ImportChunksFailed')
    }
  })
})
