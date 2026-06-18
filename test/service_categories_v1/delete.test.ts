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

const serviceCategoryId = 'asdf5566'
const respMsg = `Deleted service category ${serviceCategoryId}`

describe('v1: ServiceCategories: can delete a service category', () => {
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
        .onDelete(`https://api.tillhub.com/api/v1/service-categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
          return [
            200,
            {
              msg: respMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const serviceCategories = th.serviceCategories()

    expect(serviceCategories).toBeInstanceOf(v1.ServiceCategories)

    const { msg } = await serviceCategories.delete(serviceCategoryId)

    expect(msg).toEqual(respMsg)
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
        .onDelete(`https://api.tillhub.com/api/v1/service-categories/${legacyId}/${serviceCategoryId}`)
        .reply(() => {
          return [500]
        })
    }

    const th = await initThInstance()

    try {
      await th.serviceCategories().delete(serviceCategoryId)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryDeleteFailed')
    }
  })
})
