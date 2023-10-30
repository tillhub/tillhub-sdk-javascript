import * as dotenv from 'dotenv'
import axios from 'axios'
import qs from 'qs'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const documentId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const results = [
  {
    base64Content: 'sdfsdf',
    contentType: 'sdfsdf',
    fileName: 'sdfsdf'
  }
]

const query = {
  documentIds: [documentId]
}

function queryString() {
  return qs.stringify(query)
}

describe('v0: Documents: can get files', () => {
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
        .onGet(`https://api.tillhub.com/api/v0/documents/${legacyId}/download?${queryString()}`)
        .reply(() => {
          return [200, { results }]
        })
    }

    const th = await initThInstance()

    const documents = th.documents()

    expect(documents).toBeInstanceOf(v0.Documents)

    const { data, contentType, filename } = await documents.bulkDownload({
      documentIds: [documentId]
    })

    expect(data).toMatch(results[0].base64Content)
    expect(contentType).toMatch(results[0].contentType)
    expect(filename).toMatch(results[0].fileName)
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
        .onGet(`https://api.tillhub.com/api/v0/documents/${legacyId}/download?${queryString()}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.documents().bulkDownload({ documentIds: [documentId] })
    } catch (err: any) {
      expect(err.name).toBe('DocumentsBulkDownloadFailed')
    }
  })
})
