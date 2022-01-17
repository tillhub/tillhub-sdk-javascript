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

const branchId = 'asdf5566'
const updateObject = {
  name: 'some branch name'
}

describe('v0: Branches: can alter a branch', () => {
  it("Tillhub's branches are instantiable", async () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/branches/${legacyId}/${branchId}`).reply(() => {
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

    const branches = th.branches()

    expect(branches).toBeInstanceOf(v0.Branches)

    const { data } = await branches.put(branchId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock.onPut(`https://api.tillhub.com/api/v0/branches/${legacyId}/${branchId}`).reply(() => {
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
      await th.branches().put(branchId, updateObject)
    } catch (err: any) {
      expect(err.name).toBe('BranchPutFailed')
    }
  })
})
