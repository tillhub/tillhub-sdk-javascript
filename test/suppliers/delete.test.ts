import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { TillhubClient, v0 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const supplierId = 'abc123'
const respMsg = `Deleted supplier ${supplierId}`
const legacyId = '4564'
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})
describe('v0: suppliers', () => {
  it('can delete one', async () => {
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
        .onDelete(`https://api.tillhub.com/api/v0/business-partners/${legacyId}/${supplierId}`)
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
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

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const supplier = th.suppliers()

    expect(supplier).toBeInstanceOf(v0.Suppliers)

    const { msg } = await supplier.delete(supplierId)

    expect(msg).toEqual(respMsg)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(() => {
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

        .onDelete(`https://api.tillhub.com/api/v0/business-partners/${legacyId}/${supplierId}`)
        .reply(() => {
          return [500]
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
      await th.suppliers().delete(supplierId)
    } catch (err: any) {
      expect(err.name).toBe('SupplierDeleteFailed')
    }
  })
})
