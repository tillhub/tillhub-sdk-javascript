import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
dotenv.config()
import { initThInstance } from '../util'
import { Supplier } from '../../src/v0/suppliers'

const suppliersObjArray = [
  {
    addresses: [
      {
        street: 'Berliner Str.',
        street_number: '87',
        region: 'Berlin',
        postal_code: '10777',
        country: 'DE',
        type: 'returns'
      }
    ],
    bankAccounts: [
      { name: 'DKB', iban: '92347928347298347982374', swift: 'DE123-CE' }
    ],
    companyName: 'Steal infrastructure',
    email: 'max@fake.com',
    firstname: 'Max',
    lastname: 'Mustermann',
    number: '12345',
    paymentTerms: '30 days',
    phoneNumbers: { main: '030-12345678' },
    taxNumber: '1234156'
  },
  {
    addresses: [
      {
        street: 'Kudamm',
        street_number: '100',
        region: 'Berlin',
        postal_code: '10717',
        country: 'DE',
        type: 'billing'
      }
    ],
    bankAccounts: [
      { name: 'Sparkasse', iban: '18751629587612985762318', swift: 'DE123123SDFH' }
    ],
    companyName: 'ChatGTP',
    email: 'Erika@fake.com',
    firstname: 'Erika',
    glnNumber: null,
    lastname: 'Mustermann',
    number: '54321',
    paymentTerms: '60 days',
    phoneNumbers: { mobile: '01575-12345678' },
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

    const { data, metadata } = await suppliers.bulkCreate(suppliersObjArray as Supplier[])

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
    await suppliers.bulkCreate(suppliersObjArray as Supplier[])
  } catch (err: any) {
    expect(err.name).toBe('SuppliersBulkCreateFailed')
  }
})
