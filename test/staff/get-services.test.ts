import * as dotenv from 'dotenv'
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

const staffId = 'asdf5566'
const services = [
  {
    name: 'service name',
    category: null,
    duration: 35,
    description: 'description',
    linked_product: '0f20c60f-2ed9-4685-8cd1-23970071f7eb',
    id: '0f20c60f-2ed9-4685-8cd1-23970071f7eb',
    deleted: false
  }
]

describe('v0: Staff: can get services', () => {
  it('Can get services for existing staff member', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/${staffId}/services`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: services
            }
          ]
        })
    }

    const th = await initThInstance()

    const Staff = th.staff()

    expect(Staff).toBeInstanceOf(v0.Staff)

    const { data } = await Staff.getServices(staffId)

    expect(data).toMatchObject(services)
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

      mock.onGet(`https://api.tillhub.com/api/v0/staff/${legacyId}/${staffId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.staff().getServices(staffId)
    } catch (err: any) {
      expect(err.name).toBe('StaffFetchFailed')
    }
  })
})
