import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
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

const customerId = 'abc123'
const respMsg = `Deleted customer ${customerId}`
const legacyId = '4564'
const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})
describe('v0: customers', () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/customers/${legacyId}/${customerId}`)
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const CustomersV1 = th.customersV1()

    expect(CustomersV1).toBeInstanceOf(v1.Customers)

    const { msg } = await CustomersV1.delete(customerId)

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

        .onDelete(`https://api.tillhub.com/api/v1/customers/${legacyId}/${customerId}`)
        .reply(() => {
          return [500]
        })
    }
    const th = await initThInstance()

    try {
      await th.customersV1().delete(customerId)
    } catch (err) {
      expect(err.name).toBe('CustomerDeleteFailed')
    }
  })
})
