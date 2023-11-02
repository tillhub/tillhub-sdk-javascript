import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { ShiftPlanUpdateOptions } from '../../src/v0/shift_plan'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const branchId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const mockShiftPlan: ShiftPlanUpdateOptions = {
  shift_plan_enabled: true,
  shift_plan: [
    {
      staff_member_id: '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956',
      date: '2020-01-01',
      plan: [{ start: '10:00', end: '12:00' }]
    }
  ]
}

describe('v0: Shift plan: can alter the shift plan', () => {
  it("Tillhub's Shift Plan are instantiable", async () => {
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

      mock.onPut(`https://api.tillhub.com/api/v0/shift_plan/${legacyId}/${branchId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: mockShiftPlan.shift_plan
          }
        ]
      })
    }

    const th = await initThInstance()

    const shiftPlan = th.shiftPlan()

    expect(shiftPlan).toBeInstanceOf(v0.ShiftPlan)

    const { data } = await shiftPlan.put(branchId, mockShiftPlan)

    expect(data).toMatchObject(mockShiftPlan.shift_plan)
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
      mock.onPut(`https://api.tillhub.com/api/v0/services/${legacyId}/${branchId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.shiftPlan().put(branchId, mockShiftPlan)
    } catch (err: any) {
      expect(err.name).toBe('ShiftPlanPutFailed')
    }
  })
})
