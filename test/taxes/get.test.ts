import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from 'faker'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { TaxType, Jurisdictions, RateClasses, Tax } from '../../src/v0/taxes'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const taxId = faker.datatype.uuid()

const taxesResponse = [
  {
    id: faker.datatype.uuid(),
    name: faker.random.word(),
    fa_account_number: faker.datatype.number().toString(),
    type: 'vat' as TaxType,
    account: faker.finance.account(),
    rate: faker.datatype.number().toString(),
    percentage: '25%',
    is_fixed: faker.datatype.boolean(),
    jurisdiction: 'germany' as Jurisdictions,
    rate_class: 'normal' as RateClasses
  } as Tax
]

describe('v0: Taxes: can get a tax', () => {
  it("Tillhub's products are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/taxes/${legacyId}/${taxId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [taxesResponse]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Taxes = th.taxes()

    expect(Taxes).toBeInstanceOf(v0.Taxes)

    const { data } = await Taxes.get(taxId)

    expect(data).toMatchObject(taxesResponse)
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

      mock.onGet(`https://api.tillhub.com/api/v0/taxes/${legacyId}/${taxId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.taxes().get(taxId)
    } catch (err: any) {
      expect(err.name).toBe('TaxesFetchFailed')
    }
  })
})
