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

const staffGroupId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const staffGroup = {
  name: 'testName1'
}

describe('v0: StaffGroups: can get one staff group', () => {
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
        .onGet(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}/${staffGroupId}`)
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

    const { data } = await staffGroups.get(staffGroupId)

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
        .onGet(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}/${staffGroupId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.staffGroups().get(staffGroupId)
    } catch (err: any) {
      expect(err.name).toBe('StaffGroupFetchFailed')
    }
  })
})
