import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import faker from 'faker'
import { initThInstance } from '../util'
import {
  AbocardSystems,
  Abocard,
  AbocardsFetchFailed,
  AbocardFetchFailed,
  AbocardCreateFailed,
  AbocardUpdateFailed,
  AbocardDeleteFailed
} from '../../src/v0/abocard_systems'

dotenv.config()

const legacyId = '4564'
const abocardId = '1337'
const mockAbocard = { name: 'bar' } as Abocard
const mockMsg = `Deleted abocard ${abocardId}`

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

describe('v0: Abocards', () => {
  it('retrieves all abocards', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems`).reply(() => {
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
    const abocards = th.abocardSystems()

    expect(abocards).toBeInstanceOf(AbocardSystems)

    const { data } = await abocards.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('handle pagination', async () => {
    const abocardsItems = Array.from({ length: 5 }, () => faker.datatype.uuid())
    const abocardsResponse = {
      results: abocardsItems.map(item => ({ product_id: item })),
      cursor: {
        next: `https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems?page=2`
      },
      count: abocardsItems.length
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems`).reply(() => {
        return [
          200,
          abocardsResponse
        ]
      })
    }
    const th = await initThInstance()
    const abocards = th.abocardSystems()
    expect(abocards).toBeInstanceOf(AbocardSystems)

    const { next } = await abocards.getAll()
    expect(typeof next === 'function').toBeTruthy()
  })

  it('retrieves one abocard', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
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
    const abocards = th.abocardSystems()

    expect(abocards).toBeInstanceOf(AbocardSystems)

    const { data } = await abocards.get(abocardId)

    expect(Array.isArray(data)).toBe(false)
  })

  it('creates one abocard', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockAbocard]
          }
        ]
      })
    }

    const th = await initThInstance()
    const abocards = th.abocardSystems()
    expect(abocards).toBeInstanceOf(AbocardSystems)

    const { data } = await abocards.create(mockAbocard)
    expect(data).toEqual(mockAbocard)
  })

  it('updates one abocard', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPut(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [mockAbocard]
            }
          ]
        })
    }

    const th = await initThInstance()
    const abocards = th.abocardSystems()
    expect(abocards).toBeInstanceOf(AbocardSystems)

    const { data } = await abocards.update(abocardId, mockAbocard)
    expect(data).toEqual(mockAbocard)
  })

  it('deletes one abocard', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onDelete(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
          return [
            200,
            {
              msg: mockMsg
            }
          ]
        })
    }

    const th = await initThInstance()
    const abocards = th.abocardSystems()
    expect(abocards).toBeInstanceOf(AbocardSystems)

    const { msg } = await abocards.delete(abocardId)
    expect(msg).toEqual(mockMsg)
  })

  it('rejects getAll() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.abocardSystems().getAll()
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(AbocardsFetchFailed.name)
    }
  })

  it('rejects get() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.abocardSystems().get(abocardId)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(AbocardFetchFailed.name)
    }
  })

  it('rejects create() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.abocardSystems().create(mockAbocard)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(AbocardCreateFailed.name)
    }
  })

  it('rejects update() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPut(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
          return [205]
        })
    }
    const th = await initThInstance()

    try {
      await th.abocardSystems().update(abocardId, mockAbocard)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(AbocardUpdateFailed.name)
    }
  })

  it('rejects delete() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onDelete(`https://api.tillhub.com/api/v0/loyalties/${legacyId}/abocard/systems/${abocardId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.abocardSystems().delete(abocardId)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(AbocardDeleteFailed.name)
    }
  })
})
