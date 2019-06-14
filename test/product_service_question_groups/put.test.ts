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

const groupdId = '0505ce68-9cd9-4b0c-ac5c-7cb6804e8956'
const productServiceQuestionGroup = {
  'name': 'Hair Treatment Questions',
  'custom_id': 'ex1',
  'description': 'All the questions about hair treatments like coloring',
  'deleted': false,
  'active': true,
  'service_questions': ['c126c421-83ab-4020-8ec9-18fb279d535c', 'b538ac9b-492c-4aa3-b8fc-bcbc67762c16']
}

describe('v0: Product Service Question Groups: can alter the group', () => {
  it("Tillhub's productServiceQuestionGroups are instantiable", async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onPut(`https://api.tillhub.com/api/v0/product_service_question_groups/${legacyId}/${groupdId}`)
        .reply(function (config) {
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

    const { data } = await productServiceQuestionGroups.put(groupdId, productServiceQuestionGroup)

    expect(data).toMatchObject(productServiceQuestionGroup)
  })

  it('rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
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
        .onPut(`https://api.tillhub.com/api/v0/product_service_question_groups/${legacyId}/${groupdId}`)
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.productServiceQuestionGroups().put(groupdId, productServiceQuestionGroup)
    } catch (err) {
      expect(err.name).toBe('ProductServiceQuestionGroupsPutFailed')
    }
  })
})
