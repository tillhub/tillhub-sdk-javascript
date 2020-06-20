import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const templateId = 'asdf5566'
const updateObject = {
  deleted: true,
  active: false
}

describe('v0: Contents Templates: can alter the templates', () => {
  it("Tillhub's contents templates are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() =>  {
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
        .onPatch(`https://api.tillhub.com/api/v0/content_templates/${legacyId}/${templateId}`)
        .reply(() =>  {
          return [
            200,
            {
              count: 1,
              results: [updateObject]
            }
          ]
        })
    }

    const th = await initThInstance()

    const contentTemplates = th.contentTemplates()

    expect(contentTemplates).toBeInstanceOf(v0.ContentTemplates)

    const { data } = await contentTemplates.delete(templateId)

    expect(data).toMatchObject(updateObject)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() =>  {
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
        .onPatch(`https://api.tillhub.com/api/v0/content_templates/${legacyId}/${templateId}`)
        .reply(() =>  {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.contentTemplates().delete(templateId)
    } catch (err) {
      expect(err.name).toBe('ContentTemplateDeleteFailed')
    }
  })
})
