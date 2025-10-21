import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v1 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const legacyId = '4564'

const query = {
  date_start: '2025-10-20T11:25:06.229Z',
  date_end: '2025-10-20T13:25:06.229Z'
}

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Transactions: can export questionnaire', () => {
  it('Tillhub can export questionnaire', async () => {
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
        .onGet(/exports\/questionnaire/)
        .reply(() => {
          return [
            200,
            {
              status: 200,
              msg: 'Transactions questionnaire CSV generating.',
              messages: [],
              localized_messages: [],
              errors: [],
              request: {
                host: 'int-api.tillhub.com',
                id: '9b9b0265-ee3a-4864-80e0-9129f099f80d'
              },
              count: 1,
              results: [
                {
                  correlationId: '856ea892-00e4-472e-9b7e-f80f44c5ebe4'
                }
              ]
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const transactions = th.transactions()

    expect(transactions).toBeInstanceOf(v1.Transactions)

    const results = await transactions.exportQuestionnaire(query)

    expect(Array.isArray(results)).toBe(true)
    expect(results[0]).toHaveProperty('correlationId')
    expect(results[0].correlationId).toBe('856ea892-00e4-472e-9b7e-f80f44c5ebe4')
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
        .onGet(/exports\/questionnaire/)
        .reply(() => {
          return [400]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.transactions().exportQuestionnaire(query)
    } catch (err: any) {
      expect(err.name).toBe('TransactionQuestionnaireExportFailed')
    }
  })
})
