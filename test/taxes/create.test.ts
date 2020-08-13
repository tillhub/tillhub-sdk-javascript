import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from 'faker'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { TaxType, Jurisdictions, RateClasses } from '../../src/v0/taxes'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const taxObj = {
  name: faker.random.word(),
  fa_account_number: faker.random.number().toString(),
  type: 'vat' as TaxType,
  account: faker.finance.account(),
  rate: faker.random.number().toString(),
  percentage: '25%',
  is_fixed: faker.random.boolean(),
  jurisdiction: 'germany' as Jurisdictions,
  rate_class: 'normal' as RateClasses
}

describe('v0: Taxes: can create one tax class', () => {
  it("Tillhub's taxes is instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/taxes/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [taxObj]
          }
        ]
      })
    }

    const th = await initThInstance()

    const Taxes = th.taxes()

    expect(Taxes).toBeInstanceOf(v0.Taxes)

    const { data } = await Taxes.create(taxObj)

    expect(data).toMatchObject(taxObj)
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

      mock.onPost(`https://api.tillhub.com/api/v0/taxes/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.taxes().create(taxObj)
    } catch (err) {
      expect(err.name).toBe('TaxesCreationFailed')
    }
  })
})
