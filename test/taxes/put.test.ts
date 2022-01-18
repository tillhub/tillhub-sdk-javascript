import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { TaxType, Jurisdictions, RateClasses } from '../../src/v0/taxes'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const taxId = faker.datatype.uuid()

const updateObject = {
  name: faker.random.word(),
  type: 'vat' as TaxType,
  account: faker.finance.account(),
  is_fixed: faker.datatype.boolean(),
  jurisdiction: 'austria' as Jurisdictions,
  rate_class: 'super_reduced' as RateClasses
}

describe('v0: Taxes: can alter the tax class', () => {
  it("Tillhub's taxes are instantiable", async () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/taxes/${legacyId}/${taxId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [updateObject]
          }
        ]
      })
    }

    const th = await initThInstance()

    const taxes = th.taxes()

    expect(taxes).toBeInstanceOf(v0.Taxes)

    const { data } = await taxes.put(taxId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock.onPut(`https://api.tillhub.com/api/v0/taxes/${legacyId}/${taxId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.taxes().put(taxId, updateObject)
    } catch (err: any) {
      expect(err.name).toBe('TaxesPutFailed')
    }
  })
})
