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

const notificationId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const notification = {
  name: 'testName'
}

describe('v1: Notifications MSU: can get one', () => {
  it("Tillhub's notifications msu are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/notifications/msu/${legacyId}/${notificationId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [notification]
          }
        ]
      })
    }

    const th = await initThInstance()

    const NotificationsMsu = th.notificationsMsu()

    expect(NotificationsMsu).toBeInstanceOf(v1.NotificationsMsu)

    const { data } = await NotificationsMsu.get(notificationId)

    expect(data).toMatchObject(notification)
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

      mock.onGet(`https://api.tillhub.com/api/v1/notifications/msu/${legacyId}/${notificationId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.notificationsMsu().get(notificationId)
    } catch (err: any) {
      expect(err.name).toBe('NotificationsMsuGetFailed')
    }
  })
})
