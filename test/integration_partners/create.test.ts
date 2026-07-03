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

const listUrl = `https://api.tillhub.com/api/v0/integration-partners`

describe('v0: IntegrationPartners: create', () => {
  it('is instantiable and posts a new integration partner', async () => {
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

      mock.onPost(listUrl).reply((config) => {
        expect(JSON.parse(config.data as string)).toEqual({
          name: 'partner-a',
          displayName: 'Partner A'
        })

        return [
          201,
          {
            count: 1,
            results: [
              {
                ...integrationPartner,
                id: '22222222-2222-2222-2222-222222222222',
                name: 'partner-a',
                displayName: 'Partner A'
              }
            ]
          }
        ]
      })
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    expect(api).toBeInstanceOf(v0.IntegrationPartners)

    const { data } = await api.create({
      name: 'partner-a',
      displayName: 'Partner A'
    })

    expect(data).toEqual(
      expect.objectContaining({
        name: 'partner-a',
        displayName: 'Partner A'
      })
    )
  })

  it('rejects on status codes that are not 200 or 201', async () => {
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

      mock.onPost(listUrl).reply(() => {
        return [400]
      })
    }

    try {
      const th = await initThInstance()
      await th.integrationPartners().create({
        name: 'partner-a',
        displayName: 'Partner A'
      })
    } catch (err: any) {
      expect(err.name).toBe('IntegrationPartnerCreateFailed')
    }
  })
})
