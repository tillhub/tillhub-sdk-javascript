import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { Content } from '../../src/v1/contents'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const content = {
  name: 'my template 1',
  type: 'image',
  contentConfiguration: {},
  payloadConfiguration: {},
  metadata: {}
} as Content

describe('v1: Contents: can get all contents', () => {
  it("Tillhub's contents are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/contents/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [content]
          }
        ]
      })
    }

    const th = await initThInstance()

    const contents = th.contentsV1()

    expect(contents).toBeInstanceOf(v1.Contents)

    const { data } = await contents.getAll()

    expect(data).toEqual([content])
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
        .onGet(`https://api.tillhub.com/api/v1/contents/${legacyId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.contentsV1().getAll()
    } catch (err: any) {
      expect(err.name).toBe('ContentsFetchFailed')
    }
  })
})
