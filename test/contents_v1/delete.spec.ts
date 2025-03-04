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

const contentId = '123'

describe('v1: Contents: can delete contents', () => {
  it("Tillhub's contents are instantiable", async () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/contents/${legacyId}/${contentId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              msg: successMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const contents = th.contentsV1()

    expect(contents).toBeInstanceOf(v1.Contents)

    const { msg } = await contents.delete(contentId)

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
        .onDelete(`https://api.tillhub.com/api/v1/contents/${legacyId}/${contentId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.contentsV1().delete(contentId)
    } catch (err: any) {
      expect(err.name).toBe('ContentDeleteFailed')
    }
  })
})
