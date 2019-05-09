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

const tagId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const tag = {
  name: 'testName1'
}

describe('v0: Tags: can get one tag', () => {
  it("Tillhub's tags are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onGet(`https://api.tillhub.com/api/v0/tags/${legacyId}/${tagId}`)
        .reply(function (config) {
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

    const Tags = th.tags()

    expect(Tags).toBeInstanceOf(v0.Tags)

    const { data } = await Tags.get(tagId)

    expect(data).toMatchObject(tag)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onGet(`https://api.tillhub.com/api/v0/tags/${legacyId}/${tagId}`)
        .reply(function (config) {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.tags().get(tagId)
    } catch (err) {
      expect(err.name).toBe('TagsFetchOneFailed')
    }
  })
})
