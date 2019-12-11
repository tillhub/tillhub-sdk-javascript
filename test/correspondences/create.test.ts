import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { Correspondences } from './../../src/v0/correspondences'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const correspondence = {
  recipient: { address: { type: 'billing',
    lines: null,
    region: 'Berlin',
    street: 'Neue Flora Str',
    country: 'DE',
    locality: 'Berlin',
    postal_code: '11223',
    street_number: '28a' },
    company: 'Floristika',
    lastname: 'Schmidt',
    firstname: 'Annemarie' },
  customer: 'c0ec105d-df1c-47e4-81a5-9939ea95d968',
  status: 'sent'
}

describe('v0: Correspondence: can create one correspondence', () => {
  it("Tillhub's correspondences are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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

      mock.onPost(`https://api.tillhub.com/api/v0/correspondences/${legacyId}`).reply(function (config) {
        return [
          200,
          {
            count: 1,
            results: [correspondence]
          }
        ]
      })
    }

    const th = await initThInstance()

    const correspondences = th.correspondences()

    expect(correspondences).toBeInstanceOf(Correspondences)

    const { data } = await correspondences.create(correspondence)

    expect(data).toMatchObject(correspondence)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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

      mock.onPost(`https://api.tillhub.com/api/v0/correspondences/${legacyId}`).reply(function (config) {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.correspondences().create(correspondence)
    } catch (err) {
      expect(err.name).toBe('CorrespondenceCreationFailed')
    }
  })
})
