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
const secretObject = {
  secret: 'myL1ttl3D1rtyS3cr3tGotUpdat3d',
}

describe('v0: Webhooks: can regenerate the secret of the webhook', () => {
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
        .onPost(`https://api.tillhub.com/api/v0/webhooks/${legacyId}/${webhookId}/regenerate-secret`)
        .reply(() => {
          return [
            200,
            {
              msg: 'Success',
              results: [secretObject]
            }
          ]
        })
    }

    const th = await initThInstance()

    const webhooks = th.webhooks()

    expect(webhooks).toBeInstanceOf(v0.Webhooks)

    const { data } = await webhooks.regenerateSecret(webhookId)

    expect(data).toMatchObject(secretObject)
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
        .onPost(`https://api.tillhub.com/api/v0/webhooks/${legacyId}/${webhookId}/regenerate-secret`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.webhooks().regenerateSecret(webhookId)
    } catch (err: any) {
      expect(err.name).toBe('WebhookRegenerateSecretFailed')
    }
  })
})
