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
const serviceItem = {
  name: 'Test name',
  duration: 5,
  linked_product: '0f20c60f-2ed9-4685-8cd1-23970071f7eb'
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

    mock.onPost(`https://api.tillhub.com/api/v0/services/${legacyId}`).reply(() => {
      return [
        200,
        {
          count: 1,
          results: [serviceItem]
        }
      ]
    })
  }
})

afterEach(() => {
  mock.reset()
})

describe('v0: Services: can create a service', () => {
  it('create', async () => {
    const th = await initThInstance()
    const services = th.services()
    expect(services).toBeInstanceOf(v0.Services)
    const { data } = await services.create(serviceItem)
    expect(data).toMatchObject(serviceItem)
  })

  it('rejects on status codes that are not 200', async () => {
    try {
      const th = await initThInstance()
      await th.services().create(serviceItem)
    } catch (err: any) {
      expect(err.name).toBe('ServiceCategoryCreationFailed')
    }
  })
})
