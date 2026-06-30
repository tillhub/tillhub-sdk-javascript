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

const listUrl = `https://api.tillhub.com/api/v0/integration-partners/${legacyId}`

describe('v0: IntegrationPartners: listAll', () => {
  it('aggregates all pages', async () => {
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

      const page2Url = `${listUrl}?cursor=next`

      mock.onGet(listUrl).replyOnce(() => {
        return [
          200,
          {
            count: 2,
            results: [integrationPartner],
            cursors: { after: page2Url, before: null }
          }
        ]
      })

      mock.onGet(page2Url).replyOnce(() => {
        return [
          200,
          {
            count: 2,
            results: [
              {
                id: '22222222-2222-2222-2222-222222222222',
                name: 'partner-b',
                displayName: 'Partner B',
                active: true,
                deletedAt: null
              }
            ],
            cursors: { after: null, before: null }
          }
        ]
      })
    }

    const th = await initThInstance()
    const api = th.integrationPartners()

    expect(api).toBeInstanceOf(v0.IntegrationPartners)

    const all = await api.listAll()

    expect(all).toHaveLength(2)
    expect(all[0].id).toBe(integrationPartnerId)
    expect(all[1].id).toBe('22222222-2222-2222-2222-222222222222')
  })
})
