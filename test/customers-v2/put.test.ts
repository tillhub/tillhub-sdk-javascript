import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const customerId = '4a1c8b9e-1f2d-4c3b-8a7e-9d0f1e2c3b4a'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const customer = {
  firstname: 'Carol',
  lastname: 'Danvers',
  gender: 'female',
  email: 'carol.danvers@tillhub.com',
  customer_number: 'KD-1251563'
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

describe('v2: Customers: can update a customer', () => {
  it("Tillhub's customers are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock.onPut(`https://api.tillhub.com/api/v2/customers/${legacyId}/${customerId}`).reply(() => {
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

    const Customers = th.customersV2()

    expect(Customers).toBeInstanceOf(v2.Customers)

    const { data } = await Customers.put(customerId, customer)

    expect(data).toMatchObject(customer)
  })

  it('rejects a uniqueness conflict and keeps the conflict body reachable', async () => {
    const conflict = {
      status: 409,
      msg: 'Customer conflict',
      errorCode: 'customer_conflict',
      errors: [
        {
          path: 'customer_number',
          message: 'customer_number already exists',
          customer_id: 'd7c6b5a4-3e2f-4d1c-9b8a-7f6e5d4c3b2a'
        }
      ]
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock.onPut(`https://api.tillhub.com/api/v2/customers/${legacyId}/${customerId}`).reply(() => {
        return [409, conflict]
      })
    }

    const th = await initThInstance()

    await expect(th.customersV2().put(customerId, customer)).rejects.toMatchObject({
      name: 'CustomerPutFailed',
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

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()

      mock.onPut(`https://api.tillhub.com/api/v2/customers/${legacyId}/${customerId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    await expect(th.customersV2().put(customerId, customer)).rejects.toMatchObject({
      name: 'CustomerPutFailed'
    })
  })
})
