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

const updatedPartner = {
  id: integrationPartnerId,
  name: 'so-use',
  displayName: 'Partner B',
  active: true,
  deletedAt: null
}

const detailsUrl = `https://api.tillhub.com/api/v0/integration-partners/${integrationPartnerId}`

describe('v0: IntegrationPartners: update', () => {
  it('is instantiable and patches an existing integration partner', async () => {
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

      mock.onPatch(detailsUrl).reply((config) => {
        expect(JSON.parse(config.data as string)).toEqual({
          displayName: 'Partner B'
        })

        return [
          200,
          {
            count: 1,
            results: [updatedPartner]
          }
        ]
      })
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    expect(api).toBeInstanceOf(v0.IntegrationPartners)

    const { data } = await api.update(integrationPartnerId, {
      displayName: 'Partner B'
    })

    expect(data).toEqual(updatedPartner)
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

      mock.onPatch(detailsUrl).reply(() => {
        return [400]
      })
    }

    try {
      const th = await initThInstance()
      await th.integrationPartners().update(integrationPartnerId, {
        displayName: 'Partner B'
      })
    } catch (err: any) {
      expect(err.name).toBe('IntegrationPartnerUpdateFailed')
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

    await expect(
      api.update('', { displayName: 'Partner B' })
    ).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })

    await expect(
      api.update('   ', { displayName: 'Partner B' })
    ).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })
  })
})
