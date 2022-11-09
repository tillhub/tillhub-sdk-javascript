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
  id: webhookId,
  createdBy: 'creator_uuid',
  description: 'webhook to check products and transactions',
  eventList: ['products:create:v0', 'products:update:v0', 'products:delete:v0', 'transactions:create:v1'],
  secret: 'myL1ttl3D1rtyS3cr3t',
  updatedBy: 'update_uuid',
  url: 'https://bestherethanthere.com',
  active: true
}

describe('v0: Webhooks: can get one webhook', () => {
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
        .onGet(`https://api.tillhub.com/api/v0/webhooks/${legacyId}/${webhookId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [webhook]
            }
          ]
        })
    }

    const th = await initThInstance()

    const Webhooks = th.webhooks()

    expect(Webhooks).toBeInstanceOf(v0.Webhooks)

    const { data } = await Webhooks.get(webhookId)

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
        .onGet(`https://api.tillhub.com/api/v0/webhooks/${legacyId}/${webhookId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.webhooks().get(webhookId)
    } catch (err: any) {
      expect(err.name).toBe('WebhookFetchOneFailed')
    }
  })
})
