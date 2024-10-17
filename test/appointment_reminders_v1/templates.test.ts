import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { AppointmentReminderEntity } from '../../src/v1/appointment_reminders'

dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

const appointmentReminder: AppointmentReminderEntity = {
  type: 'email',
  text: 'Lorem ipsum dolor sit',
  emailSubject: 'Lorem ipsum',
  smsSender: ''
}

describe('v1: AppointmentReminders', () => {
  it("Tillhub's Appointment Reminder Templates are instantiable", async () => {
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
    }

    const th = await initThInstance()

    const instance = th.appointmentReminders().templates()

    expect(instance).toBeInstanceOf(v1.AppointmentReminderTemplates)
  })
})
