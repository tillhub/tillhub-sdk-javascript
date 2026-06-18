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

const serviceCategoryId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const serviceCategory = {
  id: serviceCategoryId,
  name: 'Haircut',
  description: 'Haircut services',
  active: true
}

describe('v1: ServiceCategories: can get one service category', () => {
  it("Tillhub's service categories are instantiable", async () => {
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/service-categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
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

    const { data } = await serviceCategories.get(serviceCategoryId)

    expect(data).toMatchObject(serviceCategory)
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

      mock
        .onGet(`https://api.tillhub.com/api/v1/service-categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.serviceCategories().get(serviceCategoryId)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryFetchFailed')
    }
  })
})
