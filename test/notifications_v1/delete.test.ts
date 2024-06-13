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

const notificationId = 'asdf5566'
const respMsg = `Deleted notification ${notificationId}`

describe('v1: Notifications: can delete the notification', () => {
  it("Tillhub's notifications are instantiable", async () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/notifications/${legacyId}/${notificationId}`)
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const notifications = th.notificationsV1()

    expect(notifications).toBeInstanceOf(v1.Notifications)

    const { msg } = await notifications.delete(notificationId)

    expect(msg).toEqual(respMsg)
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
        .onDelete(`https://api.tillhub.com/api/v1/notifications/${legacyId}/${notificationId}`)
        .reply(() => {
          return [
            400,
            {
              msg: 'Could not delete the notification.'
            }
          ]
        })
    }

    const th = await initThInstance()

    try {
      await th.notificationsV1().delete(notificationId)
    } catch (err: any) {
      expect(err.name).toBe('NotificationsDeleteFailed')
    }
  })
})
