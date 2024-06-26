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

const notificationObj = {
  name: 'testName2'
}

describe('v1: Notifications: can create one notifications', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/notifications/msu/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [notificationObj]
          }
        ]
      })
    }

    const th = await initThInstance()

    const notifications = th.notificationsMsu()

    expect(notifications).toBeInstanceOf(v1.NotificationsMsu)

    const { data } = await notifications.create(notificationObj)

    expect(data).toMatchObject(notificationObj)
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

      mock.onPost(`https://api.tillhub.com/api/v1/notifications/msu/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.notificationsMsu().create(notificationObj)
    } catch (err: any) {
      expect(err.name).toBe('NotificationsMsuCreateFailed')
    }
  })
})
