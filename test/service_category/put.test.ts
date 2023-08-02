import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const serviceCategoryId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const serviceCategoryObject = {
  name: 'Test name changed'
}

describe('v0: Service Category: can alter the service category', () => {
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
        .onPut(`https://api.tillhub.com/api/v0/service_categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [serviceCategoryObject]
            }
          ]
        })
    }

    const th = await initThInstance()

    const serviceCategory = th.serviceCategory()

    expect(serviceCategory).toBeInstanceOf(v0.ServiceCategory)

    const { data } = await serviceCategory.put(serviceCategoryId, serviceCategoryObject)

    expect(data).toMatchObject(serviceCategoryObject)
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
        .onPut(`https://api.tillhub.com/api/v0/service_categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.serviceCategory().put(serviceCategoryId, serviceCategoryObject)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryPutFailed')
    }
  })
})
