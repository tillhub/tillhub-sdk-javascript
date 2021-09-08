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

const questionId = 'f8314183-8199-4cb7-b152-04f6ad4ebc7e'
const productServiceQuestion = {
  name: 'testName1'
}

describe('v0: Product Service Question: can get one productServiceQuestion', () => {
  it("Tillhub's product service question are instantiable", async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/product_service_questions/${legacyId}/${questionId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [productServiceQuestion]
            }
          ]
        })
    }

    const th = await initThInstance()

    const productServiceQuestions = th.productServiceQuestions()

    expect(productServiceQuestions).toBeInstanceOf(v0.ProductServiceQuestions)

    const { data } = await productServiceQuestions.get(questionId)

    expect(data).toMatchObject(productServiceQuestion)
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
        .onGet(`https://api.tillhub.com/api/v0/product_service_questions/${legacyId}/${questionId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.productServiceQuestions().get(questionId)
    } catch (err: any) {
      expect(err.name).toBe('ProductServiceQuestionsFetchOneFailed')
    }
  })
})
