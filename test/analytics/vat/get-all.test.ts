import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Vat } from '../../../src/v0/analytics/reports/vat'
import { initThInstance } from '../../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Analytics: gets vat report', () => {
  it('gets vat report', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock.onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/vat`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const vat = th.analytics().vat()

    expect(vat).toBeInstanceOf(Vat)

    const { data } = await vat.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('takes a query string', async () => {
    const mockVatQuery = {
      format: 'csv'
    }

    const mockString = 'format=csv'

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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/vat?${mockString}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const vat = th.analytics().vat()

    expect(vat).toBeInstanceOf(Vat)

    const { data } = await vat.getAll(mockVatQuery)

    expect(Array.isArray(data)).toBe(true)
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

      mock.onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/vat`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.analytics().vat().getAll()
    } catch (err: any) {
      expect(err.name).toBe('VatReportFetchFailed')
    }
  })
})
