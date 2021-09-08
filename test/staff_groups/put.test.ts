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

const staffGroupId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const staffGroup = {
  name: 'testName3'
}

describe('v0: Staff Groups: can alter the staff groups', () => {
  it("Tillhub's staff groups are instantiable", async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}/${staffGroupId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [staffGroup]
            }
          ]
        })
    }

    const th = await initThInstance()

    const staffGroups = th.staffGroups()

    expect(staffGroups).toBeInstanceOf(v0.StaffGroups)

    const { data } = await staffGroups.put(staffGroupId, staffGroup)

    expect(data).toMatchObject(staffGroup)
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
        .onPut(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}/${staffGroupId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staffGroups().put(staffGroupId, staffGroup)
    } catch (err: any) {
      expect(err.name).toBe('StaffGroupPutFailed')
    }
  })
})
