import { ExportsGobdFetchFailed } from './../../src/v0/exports'
import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() =>
      [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    )
  }
})

afterEach(() => {
  mock.reset()
})

const query = {
  start: '2019-03-18T22:59:59.999Z',
  end: '2019-03-07T23:00:00.000Z'
}

const gobdExportData = {
  correlationId: faker.datatype.uuid()
}

describe('v1: Exports - gobd', () => {
  it('can export gobd report', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(`https://api.tillhub.com/api/v1/exports/${legacyId}/gobd`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [gobdExportData]
            }
          ]
        })
    }

    const th = await initThInstance()

    const exportsV1 = th.exportsV1()

    expect(exportsV1).toBeInstanceOf(v1.ExportsV1)

    const { data } = await exportsV1.gobd(query)

    expect(Array.isArray(data)).toBe(true)
    expect(data[0]).toEqual(gobdExportData)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(
          `https://api.tillhub.com/api/v1/exports/${legacyId}/gobd`
        )
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const exportsV1 = th.exportsV1()

    try {
      await exportsV1.gobd(query)
    } catch (err: any) {
      expect(err.name).toBe(ExportsGobdFetchFailed.name)
    }
  })
})
