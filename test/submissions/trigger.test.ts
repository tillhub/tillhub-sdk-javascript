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

const branch = {
  id: '1',
  name: 'Berlin'
}

const submission = {
  id: '2'
}

describe('v0: Submissions: can trigger submission', () => {
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

      mock
        .onPut(
          `https://api.tillhub.com/api/v0/submissions/${legacyId}/branches/${branch.id}/submissions/${submission.id}/trigger`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [submission]
            }
          ]
        })
    }

    const th = await initThInstance()

    const submissions = th.submissions()

    expect(submissions).toBeInstanceOf(v0.Submissions)

    const { data } = await submissions.trigger(branch.id, submission.id)

    expect(data).toEqual(submission)
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
        .onPut(
          `https://api.tillhub.com/api/v0/submissions/${legacyId}/branches/${branch.id}/submissions/${submission.id}/trigger`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.submissions().trigger(branch.id, submission.id)
    } catch (err: any) {
      expect(err.name).toBe('SubmissionTriggerFailed')
    }
  })
})
