import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'

dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

const exportPayload = {
  documentType: 'InventoryReportExport',
  email: 'email@email.com',
  filter: {
    query: {
      timezone: 'Europe/Berlin',
      delimiter: 'semicolon',
      format: 'xls',
      enclosure: 'double',
      email: 'email@email.com',
      documentType: 'InventoryReportExport',
      filename_prefix: 'inventory_report',
      show_column_name: true,
      column_selection: []
    }
  }
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

describe('v0: document exports: can create', () => {
  const legacyId = '4564'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  it("Tillhub's document exports are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/documents/exports/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [
              {
                correlationId: '123-123-123'
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

    const exports = th.documentExports()

    expect(exports).toBeInstanceOf(v0.DocumentExports)

    const { data } = await exports.create(exportPayload)

    expect(data).toEqual({
      correlationId: '123-123-123'
    })
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

      mock.onPost(`https://api.tillhub.com/api/v0/documents/exports/${legacyId}`).reply(() => {
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
      await th.documentExports().create(exportPayload)
    } catch (err: any) {
      expect(err.name).toBe('DocumentExportsCreateFailed')
    }
  })
})
