import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { v0 } from '../../src/tillhub-js'
import { initThInstance } from '../util'

const legacyId = '4564'

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

const groupId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const productServiceQuestionGroup = {
  name: 'testName1'
}

describe('v0: Product Service Question Groups: can get one productServiceQuestionGroup', () => {
  it("Tillhub's product service question groups are instantiable", async () => {
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
        .onGet(
          `https://api.tillhub.com/api/v0/product_service_question_groups/${legacyId}/${groupId}`
        )
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [productServiceQuestionGroup]
            }
          ]
        })
    }

    const th = await initThInstance()

    const productServiceQuestionGroups = th.productServiceQuestionGroups()

    expect(productServiceQuestionGroups).toBeInstanceOf(v0.ProductServiceQuestionGroups)

    const { data } = await productServiceQuestionGroups.get(groupId)

    expect(data).toMatchObject(productServiceQuestionGroup)
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
        .onGet(
          `https://api.tillhub.com/api/v0/product_service_question_groups/${legacyId}/${groupId}`
        )
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.productServiceQuestionGroups().get(groupId)
    } catch (err) {
      expect(err.name).toBe('ProductServiceQuestionGroupsFetchOneFailed')
    }
  })
})
