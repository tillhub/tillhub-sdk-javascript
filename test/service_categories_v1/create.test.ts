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
  name: 'Haircut',
  description: 'Haircut services'
}

describe('v1: ServiceCategories: can create one service category', () => {
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

      mock.onPost(`https://api.tillhub.com/api/v1/service-categories/${legacyId}`).reply(() => {
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

    const { data } = await serviceCategories.create(serviceCategory)

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

      mock.onPost(`https://api.tillhub.com/api/v1/service-categories/${legacyId}`).reply(() => {
        return [500]
      })
    }

    try {
      const th = await initThInstance()
      await th.serviceCategories().create(serviceCategory)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryCreationFailed')
    }
  })
})
