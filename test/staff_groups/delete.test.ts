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

const staffGroupId = 'asdf5566'
const respMsg = `Deleted staff group ${staffGroupId}`

describe('v0: Staff Groups: can delete a staff group', () => {
  it("Tillhub's staff groups are instantiable", async () => {
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
        .onDelete(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}/${staffGroupId}`)
        .reply(function (config) {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const staffGroups = th.staffGroups()

    expect(staffGroups).toBeInstanceOf(v0.StaffGroups)

    const { msg } = await staffGroups.delete(staffGroupId)

    expect(msg).toEqual(respMsg)
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
        .onDelete(`https://api.tillhub.com/api/v0/staff_groups/${legacyId}/${staffGroupId}`)
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staffGroups().delete(staffGroupId)
    } catch (err) {
      expect(err.name).toBe('StaffGroupDeleteFailed')
    }
  })
})
