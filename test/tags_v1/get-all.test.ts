import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
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

const correlationId = faker.datatype.uuid()

describe('v1: Tags', () => {
  it('can get all', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v1/tags/${legacyId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{ correlationId }]
            }
          ]
        })
    }

    const th = await initThInstance()
    const tags = th.tagsV1()
    expect(tags).toBeInstanceOf(v1.Tags)

    const { data } = await tags.getAll()
    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(
          `https://api.tillhub.com/api/v1/tags/${legacyId}`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.tagsV1().getAll()
    } catch (err: any) {
      expect(err.name).toBe('TagsFetchAllFailed')
    }
  })
})
