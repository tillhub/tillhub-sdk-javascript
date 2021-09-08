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

const tag = {
  name: 'testName2'
}

describe('v0: Tags: can create one tag', () => {
  it("Tillhub's tags are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/tags/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [tag]
          }
        ]
      })
    }

    const th = await initThInstance()

    const tags = th.tags()

    expect(tags).toBeInstanceOf(v0.Tags)

    const { data } = await tags.create(tag)

    expect(data).toMatchObject(tag)
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

      mock.onPost(`https://api.tillhub.com/api/v0/tags/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.tags().create(tag)
    } catch (err: any) {
      expect(err.name).toBe('TagsCreationFailed')
    }
  })
})
