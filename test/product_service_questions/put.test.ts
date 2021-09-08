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

const questionId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const productServiceQuestion = {
  name: 'Hair Treatment Questions',
  custom_id: 'ex1',
  description: 'All the questions about hair treatments like coloring',
  deleted: false,
  active: true,
  service_questions: [
    'c126c421-83ab-4020-8ec9-18fb279d535c',
    'b538ac9b-492c-4aa3-b8fc-bcbc67762c16'
  ]
}

describe('v0: Product Service Question: can alter the', () => {
  it("Tillhub's productServiceQuestions are instantiable", async () => {
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
        .onPut(`https://api.tillhub.com/api/v0/product_service_questions/${legacyId}/${questionId}`)
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

    const { data } = await productServiceQuestions.put(questionId, productServiceQuestion)

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
        .onPut(`https://api.tillhub.com/api/v0/product_service_questions/${legacyId}/${questionId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.productServiceQuestions().put(questionId, productServiceQuestion)
    } catch (err: any) {
      expect(err.name).toBe('ProductServiceQuestionsPutFailed')
    }
  })
})
