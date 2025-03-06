import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const templateId = 'asdf5566'

describe('v1: Contents Templates: can delete the templates', () => {
  it("Tillhub's contents templates are instantiable", async () => {
    const successMsg = 'Deleted'

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
        .onDelete(`https://api.tillhub.com/api/v1/content_templates/${legacyId}/${templateId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [],
              msg: successMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const contentTemplates = th.contentTemplatesV1()

    expect(contentTemplates).toBeInstanceOf(v1.ContentTemplates)

    const { msg } = await contentTemplates.delete(templateId)

    expect(msg).toEqual(successMsg)
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
        .onDelete(`https://api.tillhub.com/api/v1/content_templates/${legacyId}/${templateId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.contentTemplatesV1().delete(templateId)
    } catch (err: any) {
      expect(err.name).toBe('ContentTemplateDeleteFailed')
    }
  })
})
