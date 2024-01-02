import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})
afterEach(() => {
  mock.reset()
})

const scheduleId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const responseData = {
  id: scheduleId
}

describe('v0: Scheduled Exports: can toggle active status', () => {
  it('Scheduled export active status can be toggled', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPut(`https://api.tillhub.com/api/v0/documents/scheduled-exports/${legacyId}/${scheduleId}/toggle`).reply(() => {
        return [
          200,
          {
            results: [responseData]
          }
        ]
      })
    }

    const th = await initThInstance()

    const scheduledExports = th.scheduledExports()

    expect(scheduledExports).toBeInstanceOf(v0.ScheduledExports)

    const { data } = await scheduledExports.toggle(scheduleId)
    expect(data).toMatchObject(responseData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPut(`https://api.tillhub.com/api/v0/documents/scheduled-exports/${legacyId}/${scheduleId}/toggle`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.scheduledExports().toggle(scheduleId)
    } catch (err: any) {
      expect(err.name).toBe('ScheduledExportsToggleFailed')
    }
  })
})
