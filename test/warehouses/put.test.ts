import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const warehouseId = 'asdf5566'
const updateObject = {
  name: 'Mediocre Foods & Co.',
  short_name: 'MFC',
  barcore: '123asdg123adfg132sdfg132'
}

describe('v0: Warehouses: can alter the warehouse', () => {
  it("Tillhub's warehouses are instantiable", async () => {
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

      mock
        .onPut(`https://api.tillhub.com/api/v0/warehouses/${legacyId}/${warehouseId}`)
        .reply(function (config) {
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

    const warehouses = th.warehouses()

    expect(warehouses).toBeInstanceOf(v0.Warehouses)

    const { data } = await warehouses.put(warehouseId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock
        .onPut(`https://api.tillhub.com/api/v0/warehouses/${legacyId}/${warehouseId}`)
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.warehouses().put(warehouseId, updateObject)
    } catch (err) {
      expect(err.name).toBe('WarehousePutFailed')
    }
  })
})
