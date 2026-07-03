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

const detailsUrl = `https://api.tillhub.com/api/v0/integration-partners/${integrationPartnerId}`

describe('v0: IntegrationPartners: delete', () => {
  it('is instantiable and deletes an integration partner (204)', async () => {
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

      mock.onDelete(detailsUrl).reply(() => {
        return [204]
      })
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    expect(api).toBeInstanceOf(v0.IntegrationPartners)

    const { data } = await api.delete(integrationPartnerId)

    expect(data).toBeNull()
  })

  it('rejects on status codes that are not 200 or 204', async () => {
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

      mock.onDelete(detailsUrl).reply(() => {
        return [400]
      })
    }

    try {
      const th = await initThInstance()
      await th.integrationPartners().delete(integrationPartnerId)
    } catch (err: any) {
      expect(err.name).toBe('IntegrationPartnerDeleteFailed')
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

    await expect(api.delete('')).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })

    await expect(api.delete('   ')).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })
  })
})
