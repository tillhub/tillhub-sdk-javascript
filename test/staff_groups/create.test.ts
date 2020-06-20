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

const staffGroup = {
  name: 'Test name'
}

describe('v0: Staff Group: can create one staff group', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}`).reply(() => {
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

    const { data } = await staffGroups.create(staffGroup)

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

      mock.onPost(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.staffGroups().create(staffGroup)
    } catch (err) {
      expect(err.name).toBe('StaffGroupCreationFailed')
    }
  })
})
