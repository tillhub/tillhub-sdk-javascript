import { AnalyticsReportsInventoryFetchError } from '../../../src/v1/analytics/reports/inventory'
import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../../src/tillhub-js'
import { initThInstance } from '../../util'
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

const correlationId = faker.datatype.uuid()

describe('v1: AnalyticsReportsInventory', () => {
  it('can get stocks analytics reports', async () => {
    const dataItems = [{ value: '1' }]
    const countFiltered = dataItems.length
    const countTotal = 2
    const uuid = faker.datatype.uuid()

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/analytics/${legacyId}/reports/inventory`)
        .reply(() => {
          return [
            200,
            {
              cursor: {
                next: faker.internet.url()
              },
              count: 3,
              results: [
                {
                  metric: {
                    job: 'reports_inventory',
                    user: uuid
                  },
                  count: countFiltered,
                  values: dataItems
                },
                {
                  metric: {
                    job: 'reports_inventory_meta',
                    user: uuid
                  },
                  count: 1,
                  values: [{ count: countTotal }]
                },
                {
                  metric: {
                    job: 'reports_inventory_filtered_meta',
                    user: uuid
                  },
                  count: 1,
                  values: [{ count: countFiltered }]
                }
              ]
            }
          ]
        })
    }

    const th = await initThInstance()

    const analyticsReportsInventory = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsInventory

    expect(analyticsReportsInventory).toBeInstanceOf(v1.analytics.reports.AnalyticsReportsInventory)

    const { data, metaData, next } = await analyticsReportsInventory.getAll()

    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual(dataItems)
    // expect(metaData.count).toEqual(countFiltered)
    // expect(metaData.total_count).toEqual(countTotal)

    // Also able to paginate
    expect(typeof next).toBe('function')
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v2/analytics/${legacyId}/reports/inventory`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const analyticsReportsInventory = th.analyticsHandlersV1().analytics.reports.AnalyticsReportsInventory

    try {
      await analyticsReportsInventory.getAll()
    } catch (err: any) {
      expect(err.name).toBe(AnalyticsReportsInventoryFetchError.name)
    }
  })
})
