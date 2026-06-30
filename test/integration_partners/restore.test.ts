import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

dotenv.config()

const legacyId = '4564'
const integrationPartnerId = '11111111-1111-1111-1111-111111111111'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const restoredPartner = {
  id: integrationPartnerId,
  name: 'so-use',
  displayName: 'Partner B',
  active: true,
  deletedAt: null
}

const restoreUrl = `https://api.tillhub.com/api/v0/integration-partners/${legacyId}/${integrationPartnerId}/restore`

describe('v0: IntegrationPartners: restore', () => {
  it('is instantiable and restores a deleted integration partner', async () => {
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

      mock.onPatch(restoreUrl).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [restoredPartner]
          }
        ]
      })
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    expect(api).toBeInstanceOf(v0.IntegrationPartners)

    const { data } = await api.restore(integrationPartnerId)

    expect(data).toEqual(restoredPartner)
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

      mock.onPatch(restoreUrl).reply(() => {
        return [400]
      })
    }

    try {
      const th = await initThInstance()
      await th.integrationPartners().restore(integrationPartnerId)
    } catch (err: any) {
      expect(err.name).toBe('IntegrationPartnerRestoreFailed')
    }
  })

  it('rejects when integrationPartnerId is missing or blank', async () => {
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
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    await expect(api.restore('')).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })

    await expect(api.restore('   ')).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })
  })
})
