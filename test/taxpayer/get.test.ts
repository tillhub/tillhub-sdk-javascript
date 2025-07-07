import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { initThInstance } from '../util'
import { Taxpayer } from '../../src/v0/taxpayer'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const taxpayerEntity = {
  organizationId: 'testName1'
}

describe('v0: Taxpayer: can get taxpayer', () => {
  it("Tillhub's taxpayer is instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/submissions/${legacyId}/taxpayer`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [taxpayerEntity]
            }
          ]
        })
    }

    const th = await initThInstance()

    const taxpayer = th.submissions().taxpayer()

    expect(taxpayer).toBeInstanceOf(Taxpayer)

    const { data } = await taxpayer.get()

    expect(data).toMatchObject(taxpayerEntity)
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
        .onGet(`https://api.tillhub.com/api/v0/submissions/${legacyId}/taxpayer`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.submissions().taxpayer().get()
    } catch (err: any) {
      expect(err.name).toBe('TaxpayerFetchFailed')
    }
  })
})
