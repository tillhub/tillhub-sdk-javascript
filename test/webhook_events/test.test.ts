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

const webhookId = 'asdf5566'
const webhook = {
  createdBy: 'creator_uuid',
  description: 'webhook to check products and transactions',
  eventList: [
    'products:create:v0',
    'products:update:v0',
    'products:delete:v0',
    'transactions:create:v1'
  ],
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
const payload = {
  events: ['balances.create.v0']
}

describe('v0: WebhooksEvents: can test the webhook', () => {
  it("Tillhub's webhooksEvents are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/events/${legacyId}/${webhookId}/test`)
        .reply(() => {
          return [
            200,
            {
              msg: 'Succes',
              results: [webhookEvent]
            }
          ]
        })
    }

    const th = await initThInstance()

    const webhooks = th.webhookEvents()

    expect(webhooks).toBeInstanceOf(v0.WebhookEvents)

    const { data } = await webhooks.test(webhookId, payload)

    expect(data).toMatchObject([webhookEvent])
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
        .onPost(`https://api.tillhub.com/api/v0/events/${legacyId}/${webhookId}/test`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.webhookEvents().test(webhookId, payload)
    } catch (err: any) {
      expect(err.name).toBe('WebhookEventTestFailed')
    }
  })
})
