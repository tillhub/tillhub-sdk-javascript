import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v3 } from '../../src/tillhub-js'
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

describe('v3: transactions: export', () => {
  const legacyId = '4564'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  it("Tillhub's transactions are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v3/transactions/${legacyId}/export`).reply(() => {
        return [
          200,
          {
            results: { correlationId: '12345' }
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

    const transactionsV3 = th.transactionsV3()

    expect(transactionsV3).toBeInstanceOf(v3.Transactions)

    try {
      const { data } = await transactionsV3.export({
        exportMetaData: {
          show_column_name: true,
          column_selection: ['column1', 'column2'],
          delimiter: 'semicolon',
          documentType: 'documentTypeSomething',
          enclosure: 'single',
          email: 'email@email.de',
          emailTemplate: 'template_xxxx',
          timezone: 'Europe/Berlin',
          filename_prefix: 'Prefix--',
          format: 'csv',
          interval: '1 day',
          startDate: '2024-02-27'
        }
      })
      expect(data).toEqual({ correlationId: '12345' })
    } catch (err: any) {
      expect(err.name).toBe('TransactionsExportFetchFailed')
    }
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

      mock.onGet(`https://api.tillhub.com/api/v3/transactions/${legacyId}/export`).reply(() => {
        return [205]
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
      await th.transactionsV3().export({
        exportMetaData: {
          columnNames: false,
          columns: null,
          delimiter: '',
          documentType: '',
          enclosure: '\'',
          email: '',
          emailTemplate: undefined,
          format: 'CSV',
          recurringInterval: undefined,
          recurringStartDate: undefined
        }
      })
    } catch (err: any) {
      expect(err.name).toBe('TransactionsExportFetchFailed')
    }
  })
})
