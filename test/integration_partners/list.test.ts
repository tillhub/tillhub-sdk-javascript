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

const integrationPartner = {
  id: integrationPartnerId,
  name: 'so-use',
  displayName: 'SO’USE',
  active: true,
  deletedAt: null
}

const listUrl = 'https://api.tillhub.com/api/v0/integration-partners'
const detailsUrl = `${listUrl}/${integrationPartnerId}`

describe('v0: IntegrationPartners', () => {
  const mockLogin = () => {
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

  it('is instantiable and returns integration partners from list', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()
      mock.onGet(listUrl).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [integrationPartner]
          }
        ]
      })
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    expect(api).toBeInstanceOf(v0.IntegrationPartners)

    const { data, metadata } = await api.getAll()

    expect(data).toEqual([integrationPartner])
    expect(metadata.count).toBe(1)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()
      mock.onGet(listUrl).reply(() => {
        return [400]
      })
    }

    try {
      const th = await initThInstance()
      await th.integrationPartners().getAll()
    } catch (err: any) {
      expect(err.name).toBe('IntegrationPartnersFetchFailed')
    }
  })

  it('get returns a single integration partner', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()
      mock.onGet(detailsUrl).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [integrationPartner]
          }
        ]
      })
    }

    const th = await initThInstance()
    const { data } = await th.integrationPartners().get(integrationPartnerId)

    expect(data).toEqual(integrationPartner)
  })

  it('rejects when integrationPartnerId is missing or blank', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mockLogin()
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    await expect(api.get('')).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })

    await expect(api.get('   ')).rejects.toMatchObject({
      name: 'IntegrationPartnersFailed'
    })
  })
})
