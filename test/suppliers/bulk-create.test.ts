import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
dotenv.config()
import { initThInstance } from '../util'

const suppliersObjArray = [
  {
    bankAccounts: [],
    companyName: 'Steal infrastructure',
    email: 'max@fake.com',
    firstname: 'Max',
    lastname: 'Mustermann',
    number: '12345',
    paymentTerms: '30 days',
    phoneNumbers: [],
    taxNumber: '1234156'
  },
  {
    bankAccounts: [],
    companyName: 'ChatGTP',
    email: 'Erika@fake.com',
    firstname: 'Erika',
    glnNumber: null,
    lastname: 'Mustermann',
    number: '54321',
    paymentTerms: '60 days',
    phoneNumbers: [],
    taxNumber: '123456'
  }
]

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

describe('Create a bulk of new Suppliers', () => {
  it('bulk create', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/business-partners/${legacyId}/bulk_create`).reply(() => {
        return [
          200,
          {
            count: 2,
            invalid_suppliers: [],
            created_suppliers: [],
            updated_suppliers: suppliersObjArray
          }
        ]
      })
    }

    const th = await initThInstance()

    const suppliers = th.suppliers()

    expect(suppliers).toBeInstanceOf(v0.Suppliers)

    const { data, metadata } = await suppliers.bulkCreate(suppliersObjArray)

    expect(typeof data).toEqual('object')
    expect(data?.updated_suppliers?.length).toEqual(2)
    expect(metadata?.count).toEqual(2)
    expect(data?.updated_suppliers).toEqual(suppliersObjArray)
    expect(data?.invalid_suppliers).toEqual([])
    expect(data?.created_suppliers).toEqual([])
  })
})

it('rejects on status codes that are not 200/409', async () => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost(`https://api.tillhub.com/api/v0/business-partners/${legacyId}/bulk_create`).reply(() => {
      return [444]
    })
  }

  try {
    const th = await initThInstance()
    const suppliers = th.suppliers()
    expect(suppliers).toBeInstanceOf(v0.Suppliers)
    await suppliers.bulkCreate(suppliersObjArray)
  } catch (err: any) {
    expect(err.name).toBe('SuppliersBulkCreateFailed')
  }
})
