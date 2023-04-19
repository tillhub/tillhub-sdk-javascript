import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import faker from '@faker-js/faker'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

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
  paymentTerms: 30,
  phoneNumbers: [{ main: '030-12324567' }],
  taxNumber: ''
}

describe('v0: SuppliersProductsRelation: can bulk create supplier to product relations', () => {
  const query = {
    productId: [faker.datatype.uuid()]
  }
  const supplierId = faker.datatype.uuid()
  const message = 'Successs'

  it("Tillhub's instantiable and can create", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/business-partner-products/${legacyId}/${supplierId}`)
        .reply(() => {
          return [
            200,
            {
              results: [{
                businessPartners: [supplier],
                productId: query.productId
              }],
              msg: message
            }
          ]
        })
    }

    const th = await initThInstance()

    const SuppliersProductsRelation = th.suppliersProductsRelation()

    expect(SuppliersProductsRelation).toBeInstanceOf(v0.SuppliersProductsRelation)

    const { data, msg } = await SuppliersProductsRelation.bulkCreate(supplierId, query)

    expect(data).toMatchObject({
      businessPartners: [supplier],
      productId: query.productId
    })
    expect(msg).toBe(message)
  })

  it('rejects on status codes that are not 200', async () => {
    const supplierId = faker.datatype.uuid()
    const query = {
      productId: [faker.datatype.uuid()]
    }
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

      mock.onPost(`https://api.tillhub.com/api/v0/business-partner-products/${legacyId}/${supplierId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.suppliersProductsRelation().bulkCreate(supplierId, query)
    } catch (err: any) {
      expect(err.name).toBe('SuppliersProductsRelationBulkCreationFailed')
    }
  })
})
