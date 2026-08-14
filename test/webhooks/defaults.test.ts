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

const defaults = {
  ratePerSecond: 10,
  burst: 20,
  maxInFlight: 5,
  connectTimeoutMs: 5000,
  requestTimeoutMs: 30000
}

describe('v0: Webhooks: can read the service-wide delivery-limit defaults', () => {
  it('calls GET /api/v0/webhooks/defaults (not tenant-scoped) and returns the normalized defaults', async () => {
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

      mock.onGet('https://api.tillhub.com/api/v0/webhooks/defaults').reply(() => {
        return [
          200,
          {
            msg: 'Success',
            count: 1,
            results: [defaults]
          }
        ]
      })
    }

    const th = await initThInstance()

    const webhooks = th.webhooks()
    expect(webhooks).toBeInstanceOf(v0.Webhooks)

    const { data } = await webhooks.defaults()

    expect(data).toMatchObject(defaults)
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

      mock.onGet('https://api.tillhub.com/api/v0/webhooks/defaults').reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.webhooks().defaults()
    } catch (err: any) {
      expect(err.name).toBe('WebhookDeliveryLimitDefaultsFetchFailed')
    }
  })
})
