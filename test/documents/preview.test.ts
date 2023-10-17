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

const documentId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const results = [
  {
    subject: 'Document D123',
    body:
      'Dear Partner,\n Here is an attachment for the document D123. \nCould you please print this document\nThanks\nKind regards '
  }
]

describe('v0: Documents: can preview email', () => {
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
        .onGet(`https://api.tillhub.com/api/v0/documents/${legacyId}/${documentId}/preview`)
        .reply(() => {
          return [200, { results }]
        })
    }

    const th = await initThInstance()

    const documents = th.documents()

    expect(documents).toBeInstanceOf(v0.Documents)

    const { data } = await documents.preview(documentId)

    expect(data).toMatchObject(results[0])
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
        .onGet(`https://api.tillhub.com/api/v0/documents/${legacyId}/${documentId}/preview`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.documents().preview(documentId)
    } catch (err: any) {
      expect(err.name).toBe('DocumentsPreviewFailed')
    }
  })
})
