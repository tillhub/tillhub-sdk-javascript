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

const messageId = 'asdf5566'
const updateObject = {
  read: true
}

describe('v0: Messages: can alter a message', () => {
  it("Tillhub's messages are instantiable", async () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/messages/${legacyId}/${messageId}`).reply(() => {
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

    const messages = th.messages()

    expect(messages).toBeInstanceOf(v0.Messages)

    const { data } = await messages.update(messageId, updateObject)

    expect(data).toMatchObject(updateObject)
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
      mock.onPut(`https://api.tillhub.com/api/v0/message/${legacyId}/${messageId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.messages().update(messageId, updateObject)
    } catch (err) {
      expect(err.name).toBe('MessagesUpdateFailed')
    }
  })
})
