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
const responseData = { success: true }
const documentPayload = { partnerName: 'Unzer', recipients: ['fake@email.com'] }

describe('v0: Documents: can send emails', () => {
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
        .onPost(`https://api.tillhub.com/api/v0/documents/${legacyId}/${documentId}/send`)
        .reply(() => {
          return [
            200,
            {
              results: [responseData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const documents = th.documents()

    expect(documents).toBeInstanceOf(v0.Documents)

    const { data } = await documents.send(documentId, documentPayload)
    expect(data).toMatchObject(responseData)
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
        .onGet(`https://api.tillhub.com/api/v0/documents/${legacyId}/${documentId}/send`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.documents().send(documentId, documentPayload)
    } catch (err: any) {
      expect(err.name).toBe('DocumentsSendFailed')
    }
  })
})
