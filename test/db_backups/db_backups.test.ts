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

describe('v0: DbBackups', () => {
  it('Can get a list of backups', async () => {
    const results = [
      {
        file_name: 'staging/2021-01/20210101011611/XYZ.dump.tar',
        environment: 'staging',
        datetime: '20210101011611',
        zip_name: 'XYZ.dump.tar',
        size: '2.43 GB',
        created_at: '2021-01-01T02:11:16.134Z'
      },
      {
        file_name: 'staging/2021-01/20210103011651/XYZ.dump.tar',
        environment: 'staging',
        datetime: '20210103011651',
        zip_name: 'XYZ.dump.tar',
        size: '2.43 GB',
        created_at: '2021-01-03T02:11:54.919Z'
      }
    ]
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/db_backups/${legacyId}`).reply(() => {
        return [200, {
          status: 200,
          msg: 'Backup file name successfully retrieved.',
          count: 2,
          results: results
        }]
      })
    }

    const th = await initThInstance()

    const DbBackups = th.dbBackups()

    expect(DbBackups).toBeInstanceOf(v0.DbBackups)

    const response = await DbBackups.getAll()

    expect(response).toMatchObject({
      data: results,
      metadata: {
        count: 2
      },
      msg: 'Backup file name successfully retrieved.'
    })
  })

  it('Can get signed url for backup', async () => {
    const backupDate = '20210101011611'

    const result = {
      signed_url:
        'https://storage.googleapis.com/very-long-url',
      environment: 'staging',
      datetime: '20210101011611',
      zip_name: '456E438E3E0E47219FE9900870C4D328.dump.tar'
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v0/db_backups/${legacyId}/signed_url/${backupDate}`)
        .reply(() => {
          return [
            200,
            {
              status: 200,
              msg: 'Backup signed URL successfully retrieved.',
              count: 1,
              results: [result]
            }
          ]
        })
    }

    const th = await initThInstance()

    const DbBackups = th.dbBackups()

    expect(DbBackups).toBeInstanceOf(v0.DbBackups)

    const response = await DbBackups.signedUrl(backupDate)

    expect(response).toMatchObject({
      data: result,
      msg: 'Backup signed URL successfully retrieved.'
    })
  })
})
