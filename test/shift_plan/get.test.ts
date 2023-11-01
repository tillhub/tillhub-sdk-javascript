import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
import { ShiftPlanObject } from '../../src/v0/shift_plan'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const branchId = 'asdf5566'
const mockShiftPlan: ShiftPlanObject = {
  shift_plan_enabled: true,
  plan: [
    {
      staff_member_id: '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956',
      date: '2020',
      plan: [{ start: '10:00', end: '12:00' }]
    }
  ]
}

describe('v0: Shift Plan: can get one shift plan', () => {
  it("Tillhub's shift plan are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/shift_plan/${legacyId}/${branchId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockShiftPlan]
          }
        ]
      })
    }

    const th = await initThInstance()

    const ShiftPlan = th.shiftPlan()

    expect(ShiftPlan).toBeInstanceOf(v0.ShiftPlan)

    const { data } = await ShiftPlan.get(branchId)

    expect(data).toMatchObject(mockShiftPlan)
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

      mock.onGet(`https://api.tillhub.com/api/v0/shift_plan/${legacyId}/${branchId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.shiftPlan().get(branchId)
    } catch (err: any) {
      expect(err.name).toBe('ShiftPlanFetchFailed')
    }
  })
})
