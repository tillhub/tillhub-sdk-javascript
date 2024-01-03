import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import faker from '@faker-js/faker'

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

const scheduledExportOptions = {
  documentType: 'receipts',
  email: faker.internet.email(),
  startDate: faker.date.past().toISOString(),
  interval: {
    years: 1
  }
}
const scheduleId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const responseData = {
  id: scheduleId
}

describe('v0: Scheduled Exports: can create export', () => {
  it('Scheduled export active status can be toggled', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/documents/scheduled-exports/${legacyId}`).reply(() => {
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

    const { data } = await scheduledExports.create({
      ...scheduledExportOptions,
      lastExportedAt: null
    })
    expect(data).toMatchObject(responseData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/documents/scheduled-exports/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.scheduledExports().create(scheduledExportOptions)
    } catch (err: any) {
      expect(err.name).toBe('ScheduledExportsCreationFailed')
    }
  })
})
