import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v1 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const serviceCategory = {
  id: 'a3a7d4f6-3b6f-4f6e-9b1a-1c3d6e8f9a0b',
  name: 'Haircut',
  description: 'Haircut services',
  active: true
}

describe('v1: ServiceCategories: can get all', () => {
  it("Tillhub's ServiceCategories are instantiable", async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v1/service-categories/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [serviceCategory]
          }
        ]
      })
    }

    const th = await initThInstance()

    const serviceCategories = th.serviceCategories()

    expect(serviceCategories).toBeInstanceOf(v1.ServiceCategories)

    const { data } = await serviceCategories.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('exposes no next when there is no cursors.after', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
    mock
      .onGet(`https://api.tillhub.com/api/v1/service-categories/${legacyId}`)
      .reply(() => {
        return [
          200,
          {
            results: [serviceCategory],
            cursors: { before: null, after: null }
          }
        ]
      })

    const th = await initThInstance()

    const firstPage = await th.serviceCategories().getAll()

    expect(firstPage.next).toBeUndefined()
  })

  it('follows cursors.after via next', async () => {
    if (process.env.SYSTEM_TEST === 'true') return

    const cursorAfter = `https://api.tillhub.com/api/v1/service-categories/${legacyId}?cursor=abc`

    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
    mock
      .onGet(new RegExp(`/api/v1/service-categories/${legacyId}`))
      .reply((config) => {
        if (String(config.url).includes('cursor=abc')) {
          return [
            200,
            {
              results: [{ ...serviceCategory, id: 'cat-2' }],
              cursors: { before: null, after: null }
            }
          ]
        }

        return [
          200,
          {
            results: [serviceCategory],
            cursors: { before: null, after: cursorAfter }
          }
        ]
      })

    const th = await initThInstance()

    const firstPage = await th.serviceCategories().getAll({ deleted: false })

    expect(firstPage.data).toHaveLength(1)
    expect(typeof firstPage.next).toBe('function')
    expect(firstPage.metadata).toMatchObject({ cursors: { after: cursorAfter } })

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const secondPage = await firstPage.next!()

    expect(secondPage.data).toEqual([{ ...serviceCategory, id: 'cat-2' }])
    expect(secondPage.next).toBeUndefined()
  })

  it('rejects on errored response', async () => {
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
      mock.onGet(`https://api.tillhub.com/api/v1/service-categories/${legacyId}`).reply(() => {
        return [500]
      })
    }

    const th = await initThInstance()

    try {
      await th.serviceCategories().getAll()
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoriesFetchAllFailed')
    }
  })
})
