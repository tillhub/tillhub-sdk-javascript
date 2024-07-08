import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance, initThInstanceNoAuth } from '../util'
dotenv.config()

const legacyId = '4564'
const notificationId = '5534534'

const successMsg = 'Success'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v1: Notifications Unsubscribe: can unsubscribe', () => {
  it('Should unsubscribe with auth', async () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/notifications/unsubscribe/${legacyId}/${notificationId}`)
        .reply(() => {
          return [
            200,
            {
              msg: successMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const notifications = th.notificationsUnsubscribe()

    expect(notifications).toBeInstanceOf(v1.NotificationsUnsubscribe)

    const { msg } = await notifications.unsubscribe(legacyId, notificationId)

    expect(msg).toEqual(successMsg)
  })

  it('Should unsubscribe without auth', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onDelete(`https://api.tillhub.com/api/v1/notifications/unsubscribe/${legacyId}/${notificationId}`)
        .reply(() => {
          return [
            200,
            {
              msg: successMsg
            }
          ]
        })
    }

    const th = await initThInstanceNoAuth()

    const notifications = th.notificationsUnsubscribe()

    expect(notifications).toBeInstanceOf(v1.NotificationsUnsubscribe)

    const { msg } = await notifications.unsubscribe(legacyId, notificationId)

    expect(msg).toEqual(successMsg)
  })

  it('rejects on status codes that are not 200 with auth', async () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/notifications/unsubscribe/${legacyId}/${notificationId}`)
        .reply(() => {
          return [
            404,
            {
              msg: 'Could not find'
            }
          ]
        })
    }

    const th = await initThInstance()

    try {
      await th.notificationsUnsubscribe().unsubscribe(legacyId, notificationId)
    } catch (err: any) {
      expect(err.name).toBe('NotificationsUnsubscribeFailed')
    }
  })

  it('rejects on status codes that are not 200 without auth', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onDelete(`https://api.tillhub.com/api/v1/notifications/unsubscribe/${legacyId}/${notificationId}`)
        .reply(() => {
          return [
            404,
            {
              msg: 'Could not find'
            }
          ]
        })
    }

    const th = await initThInstanceNoAuth()

    try {
      await th.notificationsUnsubscribe().unsubscribe(legacyId, notificationId)
    } catch (err: any) {
      expect(err.name).toBe('NotificationsUnsubscribeFailed')
    }
  })
})
