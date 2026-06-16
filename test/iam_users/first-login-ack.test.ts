import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '45641'
const tenantId = 'c1a2b3c4-d5e6-7890-abcd-ef1234567890'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: IamUsers: can acknowledge first login', () => {
  it("Tillhub's iam users are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onPost(`https://api.tillhub.com/api/v0/iam/users/${tenantId}/first_login_ack`)
        .reply(() => {
          return [200, { results: [{ isFirstLoginDone: 'true' }], msg: 'ok', count: 1 }]
        })
    }

    const th = await initThInstance()
    const iamUsers = th.iamUsers()

    expect(iamUsers).toBeInstanceOf(v0.IamUsers)

    const { data } = await iamUsers.acknowledgeFirstLogin(tenantId)
    expect(data.isFirstLoginDone).toBe('true')
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onPost(`https://api.tillhub.com/api/v0/iam/users/${tenantId}/first_login_ack`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.iamUsers().acknowledgeFirstLogin(tenantId)
    } catch (err: any) {
      expect(err.name).toBe('IamUserAcknowledgeFirstLoginFailed')
    }
  })
})
