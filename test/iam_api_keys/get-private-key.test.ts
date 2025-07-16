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

const iamPrivateKey = {
  privateKey: '123'
}

describe('v0: IamApiKeys: can get private key', () => {
  it("Tillhub's iam api keys are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/api-keys/${legacyId}/private-key`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: ['123']
          }
        ]
      })
    }

    const th = await initThInstance()

    const iamApiKeys = th.iamApiKeys()

    expect(iamApiKeys).toBeInstanceOf(v0.IamApiKeys)

    const result = await iamApiKeys.getPrivateKey(iamPrivateKey.privateKey)

    expect(result).toMatchObject(iamPrivateKey)
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam/api-keys/${legacyId}/private-key`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamApiKeys().getPrivateKey(iamPrivateKey.privateKey)
    } catch (err: any) {
      expect(err.name).toBe('IamApiKeysPrivateKeyFetchFailed')
    }
  })
})
