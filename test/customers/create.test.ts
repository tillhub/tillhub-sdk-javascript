import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const customer = {
  firstname: 'Carol',
  lastname: 'Danvers',
  gender: 'female',
  company: {
    name: 'US Air Force'
  },
  active: false,
  displayname: 'Vers'
}

describe('v0: Customers: can create a customer', () => {
  const query = {
    customer_number_template: '{country}{-}{branch}',
    generate_customer_number: true
  }

  it("Tillhub's customers are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/customers/${legacyId}?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [customer],
              errors: []
            }
          ]
        })
    }

    const th = await initThInstance()

    const Customers = th.customers()

    expect(Customers).toBeInstanceOf(v0.Customers)

    const { data, errors } = await Customers.create(customer, { query })

    expect(data).toMatchObject(customer)
    expect(errors).toEqual([])
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

      mock.onPost(`https://api.tillhub.com/api/v0/customers/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.customers().create(customer)
    } catch (err) {
      expect(err.name).toBe('CustomerCreationFailed')
    }
  })
})
