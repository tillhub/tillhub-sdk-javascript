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

const iamUser = {
  firstName: 'Pepe',
  lastName: 'Pipon',
  email: 'pepe_pipon@unzer.com'
}

describe('v0: IamUsers: can create one user', () => {
  it("Tillhub's iam users are instantiable", async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam-users/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [iamUser]
          }
        ]
      })
    }

    const th = await initThInstance()

    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    const { data } = await iamUsers.create(iamUser)

    expect(data).toMatchObject(iamUser)
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

      mock.onPost(`https://api.tillhub.com/api/v0/iam-users/${legacyId}`).reply(() => {
        return [205]
      })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().create(iamUser)
    } catch (err: any) {
      expect(err.name).toBe('IamUserCreationFailed')
    }
  })
})
