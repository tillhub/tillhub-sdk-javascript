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

const result = 'pdf'

describe('v0: Submissions: can get preview pdf', () => {
  it("Tillhub's submissions are instantiable", async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/submissions/${legacyId}/branches/${branch.id}/submissions/${submission.id}/preview`
        )
        .reply((config) => {
          if (config.responseType === 'blob') {
            return [200, result]
          }

          return [400, 'Bad input']
        })
    }

    const th = await initThInstance()

    const submissions = th.submissions()

    expect(submissions).toBeInstanceOf(v0.Submissions)

    const response = await submissions.getPreviewPdf(branch.id, submission.id)

    expect(response).toEqual(result)
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
        .onGet(
          `https://api.tillhub.com/api/v0/submissions/${legacyId}/branches/${branch.id}/submissions/${submission.id}/preview`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.submissions().getPreviewPdf(branch.id, submission.id)
    } catch (err: any) {
      expect(err.name).toBe('SubmissionsGetPreviewPdfFailed')
    }
  })
})
