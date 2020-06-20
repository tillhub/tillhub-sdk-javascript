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

const branchId = 'asdf5566'
const respMsg = `Deleted branch ${branchId}`

describe('v0: Staff: can delete the branch', () => {
  it("Tillhub's branch are instantiable", async () => {
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

      mock.onDelete(`https://api.tillhub.com/api/v0/branches/${legacyId}/${branchId}`).reply(() => {
        return [
          200,
          {
            msg: respMsg
          }
        ]
      })
    }

    const th = await initThInstance()

    const branches = th.branches()

    expect(branches).toBeInstanceOf(v0.Branches)

    const { msg } = await branches.delete(branchId)

    expect(msg).toEqual(respMsg)
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
      mock.onDelete(`https://api.tillhub.com/api/v0/branches/${legacyId}/${branchId}`).reply(() => {
        return [
          400,
          {
            msg: 'Branch could not be deleted because it has 2 active registers.'
          }
        ]
      })
    }

    const th = await initThInstance()

    try {
      await th.branches().delete(branchId)
    } catch (err) {
      expect(err.name).toBe('BranchDeleteFailed')
      expect(err.message).toBe('Branch could not be deleted because it has 2 active registers.')
    }
  })
})
