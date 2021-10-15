import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import th, { v0 } from '../../src/tillhub-js'
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

const customersObjArray = [{
  firstname: 'Carol',
  lastname: 'Danvers',
  gender: 'female',
  company: {
    name: 'US Air Force'
  },
  active: false,
  displayname: 'Vers'
}, {
  firstname: 'Carola',
  lastname: 'Danvers',
  gender: 'female',
  company: {
    name: 'US Air Force'
  },
  active: false,
  displayname: 'Vers'
}]
const userId = '4564'
const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Create a bulk of new Customers', () => {
  it('bulk create', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [
          200,
          {
            token: '',
            user: {
              id: '123',
              legacy_id: userId
            }
          }
        ]
      })

      mock.onPost(`https://api.tillhub.com/api/v0/customers/${userId}/bulk_create`).reply(() => {
        return [
          200,
          {
            count: 2,
            invalid_customers: [],
            created_customers: [],
            updated_customers: customersObjArray
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

    const customers = th.customers()

    expect(customers).toBeInstanceOf(v0.Customers)

    const { results } = await customers.bulkCreate(customersObjArray)

    expect(typeof results).toEqual('object')
    expect(results?.updated_customers?.length).toEqual(2)
    expect(results?.count).toEqual(2)
    expect(results?.updated_customers).toEqual(customersObjArray)
    expect(results?.invalid_customers).toEqual([])
    expect(results?.created_customers).toEqual([])
  })
})

it('rejects on status codes that are not 200/409', async () => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [
        200,
        {
          token: '',
          user: {
            id: '123',
            legacy_id: userId
          }
        }
      ]
    })

    mock.onPost(`https://api.tillhub.com/api/v0/customers/${userId}/bulk_create`).reply(() => {
      return [444]
    })
  }

  try {
    const customers = th.customers()
    expect(customers).toBeInstanceOf(v0.Customers)
    await customers.bulkCreate(customersObjArray)
  } catch (err: any) {
    expect(err.name).toBe('CustomersBulkCreateFailed')
  }
})
