import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

const legacyId = '4564'
const iamApiKeyId = 'abc123'
const branchUnzerId = '12345678'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: IamApiKey: can get one user', () => {
  it("Tillhub's devices are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/api-keys/${legacyId}/${branchUnzerId}/${iamApiKeyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{ id: iamApiKeyId }]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const iamApiKeys = th.iamApiKeys()

    expect(iamApiKeys).toBeInstanceOf(v0.IamApiKeys)

    const { data } = await iamApiKeys.get(branchUnzerId, iamApiKeyId)

    expect(data).toEqual({ id: iamApiKeyId })
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

      mock.onGet(`https://api.tillhub.com/api/v0/iam/api-keys/${legacyId}/${branchUnzerId}/${iamApiKeyId}`).reply(() => {
        return [400]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.iamApiKeys().get(branchUnzerId, iamApiKeyId)
    } catch (err: any) {
      expect(err.name).toBe('IamApiKeyFetchFailed')
    }
  })
})
