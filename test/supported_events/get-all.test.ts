import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: SupportedEvent: can get all the supported events', () => {
  it("Tillhub's supportedEvent are instantiable", async () => {
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

      mock.onGet('https://api.tillhub.com/v0/supported-events').reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()

    const supportedEvents = th.supportedEvents()

    expect(supportedEvents).toBeInstanceOf(v0.SupportedEvents)

    const { data } = await supportedEvents.getAll()

    expect(Array.isArray(data)).toBe(true)
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

      mock.onGet('https://api.tillhub.com/v0/supported-events').reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.supportedEvents().getAll()
    } catch (err: any) {
      expect(err.name).toBe('SupportedEventFetchFailed')
    }
  })
})
