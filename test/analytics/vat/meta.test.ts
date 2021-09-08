import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Vat } from '../../../src/v0/analytics/reports/vat'
import { initThInstance } from '../../util'

const legacyId = '4564'

describe('v0: Analytics: gets vat report metadata', () => {
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })
  it('get metadata', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/vat/meta`)
        .reply(() => {
          return [
            200,
            {
              count: 50,
              results: [{ count: 50 }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const vat = th.analytics().vat()

    expect(vat).toBeInstanceOf(Vat)

    const { data } = await vat.meta()

    expect(data).toEqual({ count: 50 })
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
        .onGet(`https://api.tillhub.com/api/v0/analytics/${legacyId}/reports/vat/meta`)
        .reply(() => {
          return [205]
        })
    }
    const th = await initThInstance()

    try {
      await th.analytics().vat().meta()
    } catch (err: any) {
      expect(err.name).toBe('VatReportFetchMetaFailed')
    }
  })
})
