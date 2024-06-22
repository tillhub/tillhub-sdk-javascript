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

const stockAlertId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const stockAlert = {
  name: 'testName1'
}

describe('v1: Notifications: can get one stock alert', () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/notifications/${legacyId}/${stockAlertId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [stockAlert]
          }
        ]
      })
    }

    const th = await initThInstance()

    const notifications = th.notificationsV1()

    expect(notifications).toBeInstanceOf(v1.Notifications)

    const { data } = await notifications.get(stockAlertId)

    expect(data).toMatchObject(stockAlert)
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

      mock.onGet(`https://api.tillhub.com/api/v1/notifications/${legacyId}/${stockAlertId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.notificationsV1().get(stockAlertId)
    } catch (err: any) {
      expect(err.name).toBe('NotificationsFetchOneFailed')
    }
  })
})
