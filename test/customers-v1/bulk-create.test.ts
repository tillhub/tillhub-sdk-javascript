import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

afterEach(() => {
  mock.reset()
})

const customersObjArray = [
  {
    firstname: 'Carol',
    lastname: 'Danvers',
    email: 'carol@example.com',
    customer_number: '1001'
  },
  {
    firstname: 'Carola',
    lastname: 'Danvers',
    email: 'carola@example.com',
    customer_number: '1002'
  },
  {
    firstname: 'Nick',
    lastname: 'Fury'
  }
]

const bulkCreateBody = {
  status: 200,
  msg: 'Bulk customers creation finished.',
  metadata: { created: 1, skipped: 1, invalid: 1 },
  created_customers: [
    {
      input_index: 0,
      input: customersObjArray[0],
      customer: { id: 'abc', ...customersObjArray[0] }
    }
  ],
  skipped_customers: [
    {
      input_index: 1,
      input: customersObjArray[1],
      matches: [{ customer: { id: 'def', email: 'carola@example.com' }, matched_by: ['email'] }]
    }
  ],
  invalid_customers: [
    {
      input_index: 2,
      input: customersObjArray[2],
      errors: [{ message: 'At least one of email or phonenumber is required' }]
    }
  ]
}

describe('v1: Customers: can bulk create customers', () => {
  const query = { generate_customer_number: true }

  it('bulk creates with a query and passes the outcome buckets through', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(
          `https://api.tillhub.com/api/v1/customers/${legacyId}/bulk-create?${qs.stringify(query)}`
        )
        .reply(() => {
          return [200, bulkCreateBody]
        })
    }

    const th = await initThInstance()

    const Customers = th.customersV1()

    expect(Customers).toBeInstanceOf(v1.Customers)

    const { data, metadata, msg } = await Customers.bulkCreate(customersObjArray, { query })

    expect(metadata).toEqual({ created: 1, skipped: 1, invalid: 1 })
    expect(msg).toEqual('Bulk customers creation finished.')
    expect(data.created_customers).toEqual(bulkCreateBody.created_customers)
    expect(data.skipped_customers).toEqual(bulkCreateBody.skipped_customers)
    expect(data.invalid_customers).toEqual(bulkCreateBody.invalid_customers)
  })

  it('bulk creates without a query', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v1/customers/${legacyId}/bulk-create`).reply(() => {
        return [200, bulkCreateBody]
      })
    }

    const th = await initThInstance()

    const { metadata } = await th.customersV1().bulkCreate(customersObjArray)

    expect(metadata).toEqual({ created: 1, skipped: 1, invalid: 1 })
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v1/customers/${legacyId}/bulk-create`).reply(() => {
        return [422, { status: 422, msg: 'Request exceeds the maximum of 200 rows.' }]
      })
    }

    const th = await initThInstance()

    await expect(th.customersV1().bulkCreate(customersObjArray)).rejects.toMatchObject({
      name: 'CustomersBulkCreateFailed'
    })
  })
})
