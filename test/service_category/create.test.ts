import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { initThInstance } from '../util'
import { v0 } from '../../src/tillhub-js'
dotenv.config()

const user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME ?? user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD ?? user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID ?? user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY ?? user.apiKey
}

const mock = new MockAdapter(axios)
const legacyId = '4564'
const serviceCategoryObject = {
  name: 'Test name'
}

beforeEach(() => {
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

    mock.onPost(`https://api.tillhub.com/api/v0/service_categories/${legacyId}`).reply(() => {
      return [
        200,
        {
          count: 1,
          results: [serviceCategoryObject]
        }
      ]
    })
  }
})

afterEach(() => {
  mock.reset()
})

describe('v0: Service Category: can create a service category', () => {
  it('create', async () => {
    const th = await initThInstance()
    const serviceCategory = th.serviceCategory()
    expect(serviceCategory).toBeInstanceOf(v0.ServiceCategory)
    const { data } = await serviceCategory.create(serviceCategoryObject)
    expect(Array.isArray(data)).toBe(true)
  })

  it('rejects on status codes that are not 200', async () => {
    try {
      const th = await initThInstance()
      await th.serviceCategory().create(serviceCategoryObject)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryCreationFailed')
    }
  })
})
