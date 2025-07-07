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
  organizationId: 'testName3'
}

describe('v0: Taxpayer: can alter taxpayer', () => {
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
        .onPut(`https://api.tillhub.com/api/v0/submissions/${legacyId}/taxpayer`)
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

    const { data } = await taxpayer.put(taxpayerEntity)

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
        .onPut(`https://api.tillhub.com/api/v0/submissions/${legacyId}/taxpayer`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.submissions().taxpayer().put(taxpayerEntity)
    } catch (err: any) {
      expect(err.name).toBe('TaxpayerPutFailed')
    }
  })
})
