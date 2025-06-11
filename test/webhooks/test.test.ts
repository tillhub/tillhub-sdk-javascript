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
const payload = {
  events: ['balances.create.v0']
}

describe('v0: Webhooks: can alter the webhook', () => {
  it("Tillhub's webhooks are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/webhooks/${legacyId}/${webhookId}/test`)
        .reply(() => {
          return [
            200,
            {
              msg: 'Succes',
              results: [webhook]
            }
          ]
        })
    }

    const th = await initThInstance()

    const webhooks = th.webhooks()

    expect(webhooks).toBeInstanceOf(v0.Webhooks)

    const { data } = await webhooks.test(webhookId, payload)

    expect(data).toMatchObject(webhook)
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
        .onPost(`https://api.tillhub.com/api/v0/webhooks/${legacyId}/${webhookId}/test`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.webhooks().test(webhookId, payload)
    } catch (err: any) {
      expect(err.name).toBe('WebhookTestFailed')
    }
  })
})
