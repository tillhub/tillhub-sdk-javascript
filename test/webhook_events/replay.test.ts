import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { EventType } from '../../src/v0/webhook_events'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const webhookId = '9999'

const webhook = {
  id: webhookId,
  createdBy: 'creator_uuid',
  description: 'webhook to check products and transactions',
  eventList: ['products:create:v0', 'products:update:v0', 'products:delete:v0', 'transactions:create:v1'],
  secret: 'myL1ttl3D1rtyS3cr3t',
  updatedBy: 'update_uuid',
  url: 'https://bestherethanthere.com'
}

const webhookEventId = 'asdf5566'
const webhookEvent = {
  id: webhookEventId,
  entityInstanceId: 'someuuid',
  entity: 'products:create:v0',
  nextTryAt: new Date().toISOString(),
  requestPayload: {},
  triesCount: 0,
  sentSuccessfully: null,
  url: webhook.url,
  version: 'v0',
  eventType: 'create' as EventType,
  webhook
}

describe('v0: WebhookEvents: can replay a webhookEvent', () => {
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

      mock.onPost(`https://api.tillhub.com/v0/events/${legacyId}/${webhookId}/replay`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [webhookEvent],
            errors: []
          }
        ]
      })
    }

    const th = await initThInstance()

    const WebhookEvents = th.webhookEvents()

    expect(WebhookEvents).toBeInstanceOf(v0.WebhookEvents)

    const { data } = await WebhookEvents.replay(webhookId)

    expect(data).toMatchObject(webhookEvent)
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

      mock.onPost(`https://api.tillhub.com/v0/events/${legacyId}/${webhookId}/replay`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.webhookEvents().replay(webhookId)
    } catch (err: any) {
      expect(err.name).toBe('WebhookEventReplayFailed')
    }
  })
})
