import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import {
  VouchersBoundedCustomerGetFailed,
  VouchersBoundedCustomerCreateFailed,
  VouchersBoundedCustomerPutFailed
} from '../../src/v0/vouchers'

import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import faker from 'faker'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const legacyId = faker.datatype.uuid()
const voucherId = faker.datatype.uuid()
const customers = [faker.datatype.uuid()]

const mockCreatePutResponse = [
  {
    id: faker.datatype.uuid(),
    voucher_id: voucherId,
    customer_id: customers[0]
  }
]

describe('v0: Vouchers: Voucher Bounded Customer', () => {
  it('retrieves the voucher bounded customers of a voucher', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}/customers`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()

    const vouchers = th.vouchers()

    expect(vouchers).toBeInstanceOf(v0.Vouchers)

    const { data } = await vouchers.getBoundedCustomers(voucherId)

    expect(Array.isArray(data)).toBe(true)
  })

  it('creates voucher bounded customers', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}/customers`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: mockCreatePutResponse
            }
          ]
        })
    }

    const th = await initThInstance()

    const vouchers = th.vouchers()

    const { data } = await vouchers.createBoundedCustomers(voucherId, customers)
    expect(data).toEqual(mockCreatePutResponse)
  })

  it('updates voucher bounded customers', async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}/customers`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: mockCreatePutResponse
            }
          ]
        })
    }

    const th = await initThInstance()

    const vouchers = th.vouchers()

    const { data } = await vouchers.updateBoundedCustomers(voucherId, customers)
    expect(data).toEqual(mockCreatePutResponse)
  })

  it('rejects getBoundedCustomers() if status code is not 200', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}/customers`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.vouchers().getBoundedCustomers(voucherId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(VouchersBoundedCustomerGetFailed.name)
    }
  })

  it('rejects createBoundedCustomers() if status code is not 200', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}/customers}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.vouchers().createBoundedCustomers(voucherId, customers)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(VouchersBoundedCustomerCreateFailed.name)
    }
  })

  it('rejects updateBoundedCustomers() if status code is not 200', async () => {
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
        .onPatch(`https://api.tillhub.com/api/v0/vouchers/${legacyId}/${voucherId}/customers}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.vouchers().updateBoundedCustomers(voucherId, customers)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(VouchersBoundedCustomerPutFailed.name)
    }
  })
})
