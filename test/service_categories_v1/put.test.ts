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

const serviceCategoryId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const serviceCategory = {
  name: 'Haircut (edited)',
  description: 'Updated haircut services'
}

describe('v1: ServiceCategories: can alter a service category', () => {
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
        .onPut(`https://api.tillhub.com/api/v1/service-categories/${legacyId}/${serviceCategoryId}`)
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

    const { data } = await serviceCategories.put(serviceCategoryId, serviceCategory)

    expect(data).toMatchObject(serviceCategory)
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

      mock
        .onPut(`https://api.tillhub.com/api/v1/service-categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
          return [500]
        })
    }

    try {
      const th = await initThInstance()
      await th.serviceCategories().put(serviceCategoryId, serviceCategory)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryPutFailed')
    }
  })
})
