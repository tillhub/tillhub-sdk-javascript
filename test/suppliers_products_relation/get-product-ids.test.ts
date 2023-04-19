import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
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
const supplierId = faker.datatype.uuid()
const productId = faker.datatype.uuid()
const message = 'Successs'

describe('v0:SuppliersProductsRelation: can get product IDs', () => {
  const legacyId = '4564'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  it("Tillhub's instantiable and can get", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/business-partner-products/${legacyId}/${supplierId}`).reply(() => {
        return [
          200,
          {
            results: [{
              businessPartners: [supplier],
              productId: [productId]
            }],
            msg: message
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

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const SuppliersProductsRelation = th.suppliersProductsRelation()

    expect(SuppliersProductsRelation).toBeInstanceOf(v0.SuppliersProductsRelation)

    const { data, msg } = await SuppliersProductsRelation.getProductIds(supplierId)

    expect(data).toMatchObject({
      businessPartners: [supplier],
      productId: [productId]
    })
    expect(msg).toBe(message)
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

      mock.onGet(`https://api.tillhub.com/api/v0/business-partner-products/${legacyId}/${supplierId}`).reply(() => {
        return [205]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.suppliersProductsRelation().getProductIds(supplierId)
    } catch (err: any) {
      expect(err.name).toBe('SuppliersProductsRelationProductIdsFailed')
    }
  })
})
