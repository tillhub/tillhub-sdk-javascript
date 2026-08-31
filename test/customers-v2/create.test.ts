import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v2 } from '../../src/tillhub-js'
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
  email: 'carol.danvers@tillhub.com',
  customer_number: 'KD-1251563',
  source: 'DASHBOARD'
}

const mockLogin = (): void => {
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
}

describe('v2: Customers: can create a customer', () => {
  const query = {
    customer_number_template: '{country}{-}{branch}',
    generate_customer_number: true
  }

  it("Tillhub's customers are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock
        .onPost(`https://api.tillhub.com/api/v2/customers/${legacyId}?${qs.stringify(query)}`)
        .reply(() => {
          return [
            201,
            {
              count: 1,
              results: [customer],
              errors: []
            }
          ]
        })
    }

    const th = await initThInstance()

    const Customers = th.customersV2()

    expect(Customers).toBeInstanceOf(v2.Customers)

    const { data, errors } = await Customers.create(customer, { query })

    expect(data).toMatchObject(customer)
    expect(errors).toEqual([])
  })

  it('resolves a client_id replay, which answers 200 instead of 201', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock.onPost(`https://api.tillhub.com/api/v2/customers/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [customer]
          }
        ]
      })
    }

    const th = await initThInstance()

    const { data } = await th.customersV2().create(customer)

    expect(data).toMatchObject(customer)
  })

  it('rejects a uniqueness conflict and keeps the conflict body reachable', async () => {
    const conflict = {
      status: 409,
      msg: 'Customer conflict',
      errorCode: 'customer_conflict',
      errors: [
        {
          path: 'email',
          message: 'email already exists',
          customer_id: '4a1c8b9e-1f2d-4c3b-8a7e-9d0f1e2c3b4a'
        }
      ]
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock.onPost(`https://api.tillhub.com/api/v2/customers/${legacyId}`).reply(() => {
        return [409, conflict]
      })
    }

    const th = await initThInstance()

    // consumers read the conflict off the wrapped axios error, so the SDK must not swallow it
    await expect(th.customersV2().create(customer)).rejects.toMatchObject({
      name: 'CustomerCreationFailed',
      properties: {
        error: {
          response: {
            status: 409,
            data: conflict
          }
        }
      }
    })
  })

  it('rejects on status codes that are not 200 or 201', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock.onPost(`https://api.tillhub.com/api/v2/customers/${legacyId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    await expect(th.customersV2().create(customer)).rejects.toMatchObject({
      name: 'CustomerCreationFailed'
    })
  })
})
