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

const mockSaleStream = {
  id: 'stream-123',
  active: true,
  name: 'Main Sales Stream',
  type: 'online',
  businessUnit: {
    unzerId: 'unzer-123',
    type: 'moto'
  },
  keyPairIds: ['key-1', 'key-2']
}

describe('v0: SaleStreams: can get MOTO sale streams', () => {
  it("Tillhub's sale streams are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/sale-streams/${legacyId}/moto`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockSaleStream]
          }
        ]
      })
    }

    const th = await initThInstance()

    const saleStreams = th.saleStreams()

    expect(saleStreams).toBeInstanceOf(v0.SaleStreams)

    const { data } = await saleStreams.getMotoSaleStreams()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toContainEqual(mockSaleStream)
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

      mock.onGet(`https://api.tillhub.com/api/v0/sale-streams/${legacyId}/moto`).reply(() => {
        return [404, { error: 'Not found' }]
      })
    }

    try {
      const th = await initThInstance()
      await th.saleStreams().getMotoSaleStreams()
    } catch (err: any) {
      expect(err.name).toBe('SaleStreamsFetchFailed')
    }
  })
})
