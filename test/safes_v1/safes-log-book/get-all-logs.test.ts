import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { addMinutes, subMinutes } from 'date-fns'
import qs from 'qs'
dotenv.config()
import { v1 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'

const legacyId = '4564'

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const query = {
  limit: 10,
  operation: ['book'],
  embed: ['to', 'from'],
  exclude_errors: true,
  start: subMinutes(new Date(), 5).toISOString(),
  end: addMinutes(new Date(), 5).toISOString(),
  transaction_id: '6250c9e4-a484-49cc-a45b-6c1abbf5c887',
  cursor_field: 'initiated_at',
  format: 'csv',
  source_or_destination: '8f0e62c2-e457-4485-9e9e-fe6628295f8d',
  source: '5e9468f3-a064-498a-b0cf-69bc28a4aff3',
  destination: '95e22525-38f7-4640-8402-632c7722c254',
  transfer_type: ['safe_to_safe', 'pos_to_safe'],
  transfer_value_range_start: 10.5,
  transfer_value_range_end: 100,
  currency: 'EUR'
}

describe('v0: SafesLogBook', () => {
  it('can get all safes log book', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/safes/${legacyId}/logs${qs.stringify(query, {
            addQueryPrefix: true
          })}`
        )
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

    const safesLogBook = th.safesLogBookV1()

    expect(safesLogBook).toBeInstanceOf(v1.SafesLogBook)

    const { data } = await safesLogBook.getAll(query)

    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/safes/${legacyId}/logs${qs.stringify(query, {
            addQueryPrefix: true
          })}`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.safesLogBook().getAll(query)
    } catch (err) {
      expect(err.name).toBe('SafesLogBookFetchAllFailed')
    }
  })
})
