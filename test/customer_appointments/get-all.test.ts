import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient, v0 } from '../../src/tillhub-js'
import { AppointmentEntity } from '../../src/v0/customer_appointments'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const customerId = '123456'

const appointment: AppointmentEntity = {
  id: '12356',
  customer: null,
  lineItems: [],
  notes: '',
  start: '2024-01-12T06:00:00.0Z',
  status: null
}

describe('v0: Customer Appointments: can get all', () => {
  const legacyId = '4564'
  const mock = new MockAdapter(axios)
  afterEach(() => {
    mock.reset()
  })

  it("Tillhub's Customer Appointments are instantiable", async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/reservations/appointments/${legacyId}/customers/${customerId}`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [appointment]
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)

    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const customerAppointments = th.customerAppointments()

    expect(customerAppointments).toBeInstanceOf(v0.CustomerAppointments)

    try {
      const { data } = await customerAppointments.getAll(customerId)
      expect(Array.isArray(data)).toBe(true)
    } catch (err: any) {
      expect(err.name).toBe('CustomerAppointmentsFetchFailed')
    }
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
        .onGet(
          `https://api.tillhub.com/api/v0/reservations/appointments/${legacyId}/customers/${customerId}`
        )
        .reply(() => {
          return [205]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.customerAppointments().getAll(customerId)
    } catch (err: any) {
      expect(err.name).toBe('CustomerAppointmentsFetchFailed')
    }
  })
})
