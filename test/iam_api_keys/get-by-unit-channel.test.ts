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

const businessUnitUnzerId = '123'
const channel = '123'

const iamApiKeysResponse = {
  data: [{
    publicKey: '123',
    secureLevel: '123'
  }]
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/api-keys/${legacyId}?businessUnitUnzerId=${businessUnitUnzerId}&channel=${channel}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{
              publicKey: '123',
              secureLevel: '123'
            }]
          }
        ]
      })
    }

    const th = await initThInstance()

    const iamApiKeys = th.iamApiKeys()

    expect(iamApiKeys).toBeInstanceOf(v0.IamApiKeys)

    const result = await iamApiKeys.getKeypairsByUnitAndChannel({
      businessUnitUnzerId,
      channel
    })

    expect(result).toMatchObject(iamApiKeysResponse)
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/api-keys/${legacyId}?businessUnitUnzerId=${businessUnitUnzerId}&channel=${channel}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamApiKeys().getKeypairsByUnitAndChannel({
        businessUnitUnzerId,
        channel
      })
    } catch (err: any) {
      expect(err.name).toBe('IamApiKeysGetByUnitAndChannelFailed')
    }
  })
})
