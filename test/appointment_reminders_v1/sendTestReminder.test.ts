import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { AppointmentRemindersTestReminderPayload } from '../../src/v1/appointment_reminders'

dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

const testReminderPayload: AppointmentRemindersTestReminderPayload = {
  type: 'email',
  branchId: '1234',
  templateId: '1234',
  email: 'email@somewhere.com'
}

describe('v1: AppointmentReminders: can send test appointment reminder', () => {
  it("Tillhub's appointmentReminder are instantiable", async () => {
    const successMessage = 'Test reminder successfully sent'
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
        .onPost(`https://api.tillhub.com/api/v1/notifications/appointment-reminders/${legacyId}/test-reminder`)
        .reply(() => {
          return [
            200,
            {
              results: [{
                msg: successMessage
              }]
            }
          ]
        })
    }

    const th = await initThInstance()

    const instance = th.appointmentReminders()

    expect(instance).toBeInstanceOf(v1.AppointmentReminders)

    const { msg } = await instance.sendTestReminder(testReminderPayload)

    expect(msg).toBe(successMessage)
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
        .onPost(`https://api.tillhub.com/api/v1/notifications/appointment-reminders/${legacyId}/test-reminder`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.appointmentReminders().sendTestReminder(testReminderPayload)
    } catch (err: any) {
      expect(err.name).toBe('AppointmentReminderSendTestReminderFailed')
    }
  })
})
