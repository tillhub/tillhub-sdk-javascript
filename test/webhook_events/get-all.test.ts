import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const webhookId = '9999'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: WebhookEventEvents: can get all the webhookEvents', () => {
  it("Tillhub's webhookEvents are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/events/${legacyId}/${webhookId}`).reply(() => {
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

    const webhookEvents = th.webhookEvents()

    expect(webhookEvents).toBeInstanceOf(v0.WebhookEvents)

    const { data } = await webhookEvents.getAll(webhookId)

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

      mock.onGet(`https://api.tillhub.com/api/v0/events/${legacyId}/${webhookId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.webhookEvents().getAll(webhookId)
    } catch (err: any) {
      expect(err.name).toBe('WebhookEventFetchFailed')
    }
  })
})
