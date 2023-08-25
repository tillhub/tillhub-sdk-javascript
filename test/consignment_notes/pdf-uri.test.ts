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

const consignmentNoteId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const results = [
  {
    base64Content: 'sdfsdf',
    contentType: 'sdfsdf',
    filename: 'sdfsdf'
  }
]

describe('v0: Consignment Notes: can get PDF', () => {
  it("Tillhub's consignment notes are instantiable", async () => {
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
          `https://api.tillhub.com/api/v0/consignment-notes/${legacyId}/${consignmentNoteId}/pdf`
        )
        .reply(() => {
          return [200, { results }]
        })
    }

    const th = await initThInstance()

    const ConsignmentNotes = th.consignmentNotes()

    expect(ConsignmentNotes).toBeInstanceOf(v0.ConsignmentNotes)

    const { data, contentType, filename } = await ConsignmentNotes.pdfUri(consignmentNoteId)

    expect(data).toMatch(results[0].base64Content)
    expect(contentType).toMatch(results[0].contentType)
    expect(filename).toMatch(results[0].filename)
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
          `https://api.tillhub.com/api/v0/consignment-notes/${legacyId}/${consignmentNoteId}/pdf`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.consignmentNotes().pdfUri(consignmentNoteId)
    } catch (err: any) {
      expect(err.name).toBe('ConsignmentNotesPdfFailed')
    }
  })
})
