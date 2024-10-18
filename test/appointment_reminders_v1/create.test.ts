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
  locationId: '1234',
  templateId: '1234'
}

describe('v1: AppointmentReminders: can create appointment reminder', () => {
  it("Tillhub's appointmentReminder are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v1/notifications/appointment-reminders/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [appointmentReminder]
            }
          ]
        })
    }

    const th = await initThInstance()

    const instance = th.appointmentReminders()

    expect(instance).toBeInstanceOf(v1.AppointmentReminders)

    const { data } = await instance.post(appointmentReminder)

    expect(data).toMatchObject(appointmentReminder)
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
        .onPost(`https://api.tillhub.com/api/v1/notifications/appointment-reminders/${legacyId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.appointmentReminders().post(appointmentReminder)
    } catch (err: any) {
      expect(err.name).toBe('AppointmentReminderPostFailed')
    }
  })
})
