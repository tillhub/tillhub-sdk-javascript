import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '45641'
const clientAccountId = 'c1a2b3c4-d5e6-7890-abcd-ef1234567890'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const connections = {
  connectedDashboards: {
    UZ001: ['uod-ops-manager', 'uod-support'],
    UZ002: ['uod-viewer']
  },
  connectedDashboardsList: ['UZ001', 'UZ002'],
  connectedDashboardsDetails: {
    UZ001: { name: 'Berlin Store Dashboard' },
    UZ002: { name: 'Hamburg Store Dashboard' }
  }
}

describe('v0: ClientAccounts: can get MMS connections', () => {
  it("Tillhub's client accounts are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v0/client_accounts/${clientAccountId}/connections`)
        .reply(() => {
          return [200, { count: 1, results: [connections] }]
        })
    }

    const th = await initThInstance()
    const clientAccounts = th.clientAccounts()

    expect(clientAccounts).toBeInstanceOf(v0.ClientAccounts)

    const { data } = await clientAccounts.getConnections(clientAccountId)
    expect(data.connectedDashboardsList).toEqual(['UZ001', 'UZ002'])
    expect(data.connectedDashboards.UZ001).toEqual(['uod-ops-manager', 'uod-support'])
    expect(data.connectedDashboardsDetails.UZ001.name).toBe('Berlin Store Dashboard')
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
        return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
      })

      mock
        .onGet(`https://api.tillhub.com/api/v0/client_accounts/${clientAccountId}/connections`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.clientAccounts().getConnections(clientAccountId)
    } catch (err: any) {
      expect(err.name).toBe('ClientAccountConnectionsFetchFailed')
    }
  })
})
