import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'
const documentId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const type = 'pdf'
const results = [
  {
    base64Content: 'sdfsdf',
    contentType: 'sdfsdf',
    fileName: 'sdfsdf'
  }
]

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Documents: can get file', () => {
  it("Tillhub's documents are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/documents/unzer-one-invoices/${legacyId}/download/${documentId}/type/${type}`)
        .reply(() => {
          return [200, { results }]
        })
    }

    const th = await initThInstance()

    const documents = th.uodInvoices()

    expect(documents).toBeInstanceOf(v0.UodInvoices)
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
        .onGet(`https://api.tillhub.com/api/v0/documents/unzer-one-invoices/${legacyId}/download/${documentId}/type/${type}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.uodInvoices().download(documentId, type)
    } catch (err: any) {
      expect(err.name).toBe('DocumentsDownloadFailed')
    }
  })
})
