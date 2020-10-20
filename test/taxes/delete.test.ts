import * as dotenv from 'dotenv'
import faker from 'faker'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const taxId = faker.random.uuid()
const respMsg = `Deleted tax ${taxId}`

describe('v0: Taxes: can delete the tax', () => {
  it("Tillhub's Taxes is instantiable", async () => {
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

      mock.onDelete(`https://api.tillhub.com/api/v0/taxes/${legacyId}/${taxId}`).reply(() => {
        return [
          200,
          {
            msg: respMsg
          }
        ]
      })
    }

    const th = await initThInstance()

    const taxes = th.taxes()

    expect(taxes).toBeInstanceOf(v0.Taxes)

    const { msg } = await taxes.delete(taxId)

    expect(msg).toEqual(respMsg)
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
      mock.onDelete(`https://api.tillhub.com/api/v0/taxes/${legacyId}/${taxId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.taxes().delete(taxId)
    } catch (err) {
      expect(err.name).toBe('TaxDeleteFailed')
    }
  })
})
