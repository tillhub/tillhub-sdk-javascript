import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
dotenv.config()
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const query = {
  type: ['product.create', 'product.update']
}

describe('v1: AuditLogs', () => {
  it('can get all audit logs', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/audits/${legacyId}/logs${qs.stringify(query, {
            addQueryPrefix: true
          })}`
        )
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

    const auditsLogBook = th.auditLogsV1()

    expect(auditsLogBook).toBeInstanceOf(v1.AuditLogs)

    const { data } = await auditsLogBook.getAll(query)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/audits/${legacyId}/logs${qs.stringify(query, {
            addQueryPrefix: true
          })}`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.auditLogsV1().getAll(query)
    } catch (err: any) {
      expect(err.name).toBe('AuditLogsFetchAllFailed')
    }
  })
})
