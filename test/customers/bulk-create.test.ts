import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
dotenv.config()
import { initThInstance } from '../util'

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

const legacyId = '4564'

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

describe('Create a bulk of new Customers', () => {
  it('bulk create', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/customers/${legacyId}/bulk_create`).reply(() => {
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

    const th = await initThInstance()

    const customers = th.customers()

    expect(customers).toBeInstanceOf(v0.Customers)

    const { data, metadata } = await customers.bulkCreate(customersObjArray)

    expect(typeof data).toEqual('object')
    expect(data?.updated_customers?.length).toEqual(2)
    expect(metadata?.count).toEqual(2)
    expect(data?.updated_customers).toEqual(customersObjArray)
    expect(data?.invalid_customers).toEqual([])
    expect(data?.created_customers).toEqual([])
  })
})

it('rejects on status codes that are not 200/409', async () => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost(`https://api.tillhub.com/api/v0/customers/${legacyId}/bulk_create`).reply(() => {
      return [444]
    })
  }

  try {
    const th = await initThInstance()
    const customers = th.customers()
    expect(customers).toBeInstanceOf(v0.Customers)
    await customers.bulkCreate(customersObjArray)
  } catch (err: any) {
    expect(err.name).toBe('CustomersBulkCreateFailed')
  }
})
