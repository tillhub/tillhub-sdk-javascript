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

const productServiceQuestion = {
  name: 'Hair color',
  content: 'What was the hair color used?',
  description: 'Find out the color number',
  required: true,
  answer_validation: {
    type: 'object',
    title: 'simple_select',
    $id: 'https://schemas.tillhub.com/v1/product_service_questions.answer_validation.simple_select',
    description: 'Simple dropwdown select with given options',
    required: ['content'],
    properties: {
      content: {
        type: 'string',
        enum: ['green', 'blue', 'red']
      }
    }
  }
}

describe('v0: Product Service Question: can create one product service question', () => {
  it("Tillhub's product service questions are instantiable", async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/product_service_questions/${legacyId}`)
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

    const { data } = await productServiceQuestions.create(productServiceQuestion)

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
        .onPost(`https://api.tillhub.com/api/v0/product_service_questions/${legacyId}`)
        .reply(() => {
          return [205]
        })
    }

    try {
      const th = await initThInstance()
      await th.productServiceQuestions().create(productServiceQuestion)
    } catch (err: any) {
      expect(err.name).toBe('ProductServiceQuestionsCreationFailed')
    }
  })
})
