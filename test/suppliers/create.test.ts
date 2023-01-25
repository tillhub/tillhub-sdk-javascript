import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import qs from 'qs'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { Supplier } from '../../src/v0/suppliers'

dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const supplier = {
  bankAccounts: [
    { name: 'DKB', iban: '92347928347298347982374', swift: 'DE123-CE' }
  ],
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
  companyName: 'ChatGTP',
  email: 'fack@email.com',
  firstname: 'Max',
  lastname: 'Mustermann',
  number: '1234',
  paymentTerms: '30 days',
  phoneNumbers: { main: '030-12324567' },
  taxNumber: ''
}

describe('v0: Suppliers: can create a supplier', () => {
  const query = {
    supplier_number_template: '{country}{-}{branch}',
    generate_supplier_number: true
  }

  it("Tillhub's suppliers are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/business-partners/${legacyId}?${qs.stringify(query)}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [supplier],
              errors: []
            }
          ]
        })
    }

    const th = await initThInstance()

    const Suppliers = th.suppliers()

    expect(Suppliers).toBeInstanceOf(v0.Suppliers)

    const { data, errors } = await Suppliers.create(supplier as Supplier, { query })

    expect(data).toMatchObject(supplier)
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

      mock.onPost(`https://api.tillhub.com/api/v0/business-partners/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.suppliers().create(supplier as Supplier)
    } catch (err: any) {
      expect(err.name).toBe('SupplierCreationFailed')
    }
  })
})
