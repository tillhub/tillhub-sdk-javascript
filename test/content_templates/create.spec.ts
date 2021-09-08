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

const template = {
  name: 'my template 1',
  contents: {
    idle: ['92384aslkjd03'],
    welcome: ['182736asd3']
  }
}

describe('v0: ContentTemplates: can create a contents_template', () => {
  it("Tillhub's content_templates are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/content_templates/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [template],
            errors: []
          }
        ]
      })
    }

    const th = await initThInstance()

    const ContentTemplates = th.contentTemplates()

    expect(ContentTemplates).toBeInstanceOf(v0.ContentTemplates)

    const { data } = await ContentTemplates.create(template)

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

      mock.onPost(`https://api.tillhub.com/api/v0/content_templates/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.contentTemplates().create(template)
    } catch (err: any) {
      expect(err.name).toBe('ContentTemplateCreationFailed')
    }
  })
})
