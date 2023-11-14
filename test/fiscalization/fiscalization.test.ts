import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { FiscalizationItem } from '../../src/v0/fiscalization'
dotenv.config()

const legacyId = '4564'
const branchId = '1234'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const fiscalizationConfiguration: FiscalizationItem = {
  provider: 'at_fiskaly',
  payload: {
    branchId: faker.datatype.uuid(),
    organization: {
      name: faker.company.companyName(),
      address_line1: faker.address.streetAddress(true),
      zip: faker.address.zipCode(),
      town: faker.address.cityName(),
      country_code: faker.address.countryCode('alpha-3')
    },
    fon: {
      fon_participant_id: faker.datatype.string(10),
      fon_user_id: faker.datatype.string(10),
      fon_user_pin: faker.datatype.string(10)
    }
  }
}

describe('v0: Fiscalization: can send emails', () => {
  it("Tillhub's fiscalization are instantiable", async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/fiscalization/${legacyId}/branches/${branchId}/set-license`)
        .reply(() => {
          return [
            200,
            {
              results: [fiscalizationConfiguration]
            }
          ]
        })
    }

    const th = await initThInstance()

    const fiscalization = th.fiscalization()

    expect(fiscalization).toBeInstanceOf(v0.Fiscalization)

    const { data } = await fiscalization.setLicense(branchId, fiscalizationConfiguration)
    expect(data).toMatchObject(fiscalizationConfiguration)
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

      mock
        .onPut(`https://api.tillhub.com/api/v0/fiscalization/${legacyId}/branches/${branchId}/set-license`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.fiscalization().setLicense(branchId, fiscalizationConfiguration)
    } catch (err: any) {
      expect(err.name).toBe('FiscalizationInitFailed')
    }
  })
})
