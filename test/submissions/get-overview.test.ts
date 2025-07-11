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

const submissionsResults = [
  { id: '1', name: 'Berlin' }
]

describe('v0: Submissions: can get submissions overview', () => {
  it("Tillhub's webhooks are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/submissions/${legacyId}/submissions/overview`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: submissionsResults
          }
        ]
      })
    }

    const th = await initThInstance()

    const submissions = th.submissions()

    expect(submissions).toBeInstanceOf(v0.Submissions)

    const { data } = await submissions.getOverview()

    expect(data).toEqual(submissionsResults)
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

      mock.onGet(`https://api.tillhub.com/api/v0/submissions/${legacyId}/submissions/overview`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.submissions().getOverview()
    } catch (err: any) {
      expect(err.name).toBe('SubmissionsGetOverviewFailed')
    }
  })
})
