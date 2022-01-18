import { TransactionsImageCreateFailed, TransactionsGetImagesFailed } from '../../src/v2/transactions'
import * as dotenv from 'dotenv'
import axios from 'axios'
import faker from '@faker-js/faker'
import MockAdapter from 'axios-mock-adapter'
import { v2 } from '../../src/tillhub-js'
import { initThInstance } from '../util'
dotenv.config()

const legacyId = '4564'

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() =>
      [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    )
  }
})

afterEach(() => {
  mock.reset()
})

const transactionId = faker.datatype.uuid()
const image = faker.image.dataUri()

const createImageResponse = {
  correlationId: faker.datatype.uuid()
}

const getImagesResponse = {
  original: faker.image.imageUrl(),
  '1x': faker.image.imageUrl(),
  '2x': faker.image.imageUrl(),
  '3x': faker.image.imageUrl()
}

describe('v2: Transactions - images', () => {
  it('can create an image', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(`https://api.tillhub.com/api/v2/transactions/${legacyId}/${transactionId}/images`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [createImageResponse]
            }
          ]
        })
    }

    const th = await initThInstance()

    const transactionsV2 = th.transactionsV2()

    expect(transactionsV2).toBeInstanceOf(v2.Transactions)

    const { data } = await transactionsV2.createImage(transactionId, image)

    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual([createImageResponse])
  })

  it('on creating an image - rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(`https://api.tillhub.com/api/v2/transactions/${legacyId}/${transactionId}/images`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const transactionsV2 = th.transactionsV2()

    try {
      await transactionsV2.createImage(transactionId, image)
    } catch (err: any) {
      expect(err.name).toBe(TransactionsImageCreateFailed.name)
    }
  })

  it('can get images', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/transactions/${legacyId}/${transactionId}/images`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [getImagesResponse]
            }
          ]
        })
    }

    const th = await initThInstance()

    const transactionsV2 = th.transactionsV2()

    expect(transactionsV2).toBeInstanceOf(v2.Transactions)

    const { data } = await transactionsV2.getImages(transactionId)

    expect(Array.isArray(data)).toBe(true)
    expect(data).toEqual([getImagesResponse])
  })

  it('on getting images - rejects on status codes that are not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v2/transactions/${legacyId}/${transactionId}/images`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()
    const transactionsV2 = th.transactionsV2()

    try {
      await transactionsV2.getImages(transactionId)
    } catch (err: any) {
      expect(err.name).toBe(TransactionsGetImagesFailed.name)
    }
  })
})
