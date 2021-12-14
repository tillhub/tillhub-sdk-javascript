import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import faker from 'faker'
import { BranchesMetaFailed } from '../../src/v1/branches'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

afterEach(() => {
  mock.reset()
})

const metaResponse = {
  count: 50,
  results: [{ count: 50 }]
}

describe('v1: Branches', () => {
  it('meta', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/branches/${legacyId}/meta`)
        .reply(() => {
          return [
            200,
            metaResponse
          ]
        })
    }

    const th = await initThInstance()

    const branches = th.branchesV1()
    expect(branches).toBeInstanceOf(v1.Branches)

    const { metadata } = await branches.meta()
    expect(metadata).toMatchObject(metaResponse.results[0])
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/branches/${legacyId}/meta`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.branchesV1().meta()
    } catch (err: any) {
      expect(err.name).toBe(BranchesMetaFailed.name)
    }
  })
})
