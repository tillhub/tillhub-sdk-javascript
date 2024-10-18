import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { AppointmentReminderTemplateTypeEntity } from '../../src/v1/appointment-reminder-templates'

dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

afterEach(() => {
  mock.reset()
})

const template: AppointmentReminderTemplateTypeEntity = {
  type: 'email',
  content: 'Lorem ipsum dolor sit',
  subject: 'Lorem ipsum',
  name: 'Lorem ipsum',
  id: '1'
}

describe('v1: AppointmentReminderTemplates: can get templates', () => {
  it("Tillhub's appointmentReminders are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v1/notifications/appointment-reminders/${legacyId}/templates`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [template]
            }
          ]
        })
    }

    const th = await initThInstance()

    const instance = th.appointmentReminders().templates()

    expect(instance).toBeInstanceOf(v1.AppointmentReminderTemplates)

    const { data } = await instance.getAll()

    expect(data).toMatchObject([template])
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
        .onGet(`https://api.tillhub.com/api/v1/notifications/appointment-reminders/${legacyId}/templates`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.appointmentReminders().templates().getAll()
    } catch (err: any) {
      expect(err.name).toBe('AppointmentReminderTemplatesFetchFailed')
    }
  })
})
