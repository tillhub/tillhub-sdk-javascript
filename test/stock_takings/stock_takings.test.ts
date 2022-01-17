import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { TillhubClient } from '../../src/tillhub-js'
import {
  StockTakings,
  StockTaking,
  StockTakingsFetchFailed,
  StockTakingsFetchOneFailed,
  StockTakingsCreationFailed,
  StockTakingsUpdateFailed,
  StockTakingsDeleteFailed
} from '../../src/v0/stock_takings'
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

const legacyId = '4564'
const stockTakingId = '1337'
const mockStockTaking = {
  name: 'mock stock taking',
  description: 'some description'
} as StockTaking
const mockMsg = `Deleted stockTaking ${stockTakingId}`

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: StockTakings', () => {
  it('retrieves all stockTakings', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const stockTakings = th.stockTakings()

    expect(stockTakings).toBeInstanceOf(StockTakings)

    const { data } = await stockTakings.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('retrieves one stockTaking', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [mockStockTaking]
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const stockTakings = th.stockTakings()

    expect(stockTakings).toBeInstanceOf(StockTakings)

    const { data } = await stockTakings.get(stockTakingId)

    expect(data).toEqual(mockStockTaking)
  })

  it('creates one stockTaking', async () => {
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

      mock.onPost(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockStockTaking]
          }
        ]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const stockTakings = th.stockTakings()
    expect(stockTakings).toBeInstanceOf(StockTakings)

    const { data } = await stockTakings.create(mockStockTaking)
    expect(data).toEqual(mockStockTaking)
  })

  it('updates one stockTaking', async () => {
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
        .onPatch(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [mockStockTaking]
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const stockTakings = th.stockTakings()
    expect(stockTakings).toBeInstanceOf(StockTakings)

    const { data } = await stockTakings.update(stockTakingId, mockStockTaking)
    expect(data).toEqual(mockStockTaking)
  })

  it('deletes one stockTaking', async () => {
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
        .onDelete(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [
            200,
            {
              msg: mockMsg
            }
          ]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    const stockTakings = th.stockTakings()
    expect(stockTakings).toBeInstanceOf(StockTakings)

    const { msg } = await stockTakings.delete(stockTakingId)
    expect(msg).toEqual(mockMsg)
  })

  it('rejects getAll() if status code is not 200', async () => {
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

      mock.onGet(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}`).reply(() => {
        return [205]
      })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.stockTakings().getAll()
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(StockTakingsFetchFailed.name)
    }
  })

  it('rejects get() if status code is not 200', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [205]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.stockTakings().get(stockTakingId)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(StockTakingsFetchOneFailed.name)
    }
  })

  it('rejects create() if status code is not 200', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [205]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.stockTakings().create(mockStockTaking)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(StockTakingsCreationFailed.name)
    }
  })

  it('rejects update() if status code is not 200', async () => {
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
        .onPatch(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [205]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.stockTakings().update(stockTakingId, mockStockTaking)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(StockTakingsUpdateFailed.name)
    }
  })

  it('rejects delete() if status code is not 200', async () => {
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
        .onDelete(`https://api.tillhub.com/api/v0/stock_takings/${legacyId}/${stockTakingId}`)
        .reply(() => {
          return [205]
        })
    }

    const options = {
      credentials: {
        username: user.username,
        password: user.password
      },
      base: process.env.TILLHUB_BASE
    }

    const th = new TillhubClient()

    th.init(options)
    await th.auth.loginUsername({
      username: user.username,
      password: user.password
    })

    try {
      await th.stockTakings().delete(stockTakingId)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(StockTakingsDeleteFailed.name)
    }
  })
})
