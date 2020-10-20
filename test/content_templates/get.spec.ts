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

const templateId = 'asdf5566'
const template = {
  name: 'my template 1',
  contents: {
    idle: ['129837'],
    welcome: ['293487']
  }
}

describe('v0: Contents Templates: can get one template', () => {
  it("Tillhub's contents templates are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/content_templates/${legacyId}/${templateId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [template]
            }
          ]
        })
    }

    const th = await initThInstance()

    const contentTemplates = th.contentTemplates()

    expect(contentTemplates).toBeInstanceOf(v0.ContentTemplates)

    const { data } = await contentTemplates.get(templateId)

    expect(data).toMatchObject(template)
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
        .onGet(`https://api.tillhub.com/api/v0/content_templates/${legacyId}/${templateId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.contentTemplates().get(templateId)
    } catch (err) {
      expect(err.name).toBe('ContentTemplateFetchFailed')
    }
  })
})
