import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { WarehouseAddressType } from '../../src/v0/warehouses'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const warehouse = {
  name: 'asdf',
  short_name: 'asdf',
  custom_id: 'qwert',
  capacity: 15000,
  barcode: '123456789132456',
  phonenumbers: {
    line_main: 123456798,
    line_1: 123456798,
    line_2: 123456798
  },
  addresses: [
    {
      type: 'local' as WarehouseAddressType,
      street: 'qert',
      street_number: '12',
      region: 'DE',
      postal_code: '12345',
      country: 'Germany'
    }
  ]
}

describe('v0: Warehouses: can create a warehouse', () => {
  it("Tillhub's warehouses are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/warehouses/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [warehouse],
            errors: []
          }
        ]
      })
    }

    const th = await initThInstance()

    const Warehouses = th.warehouses()

    expect(Warehouses).toBeInstanceOf(v0.Warehouses)

    const { data } = await Warehouses.create(warehouse)

    expect(data).toMatchObject(warehouse)
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

      mock.onPost(`https://api.tillhub.com/api/v0/warehouses/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.warehouses().create(warehouse)
    } catch (err: any) {
      expect(err.name).toBe('WarehouseCreateFailed')
    }
  })
})
