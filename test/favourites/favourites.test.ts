import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import faker from 'faker'
import { initThInstance } from '../util'
import {
  Favourites,
  Favourite,
  FavouritesFetchFailed,
  FavouriteFetchFailed,
  FavouriteCreateFailed,
  FavouriteUpdateFailed,
  FavouriteDeleteFailed
} from '../../src/v0/favourites'

dotenv.config()

const legacyId = '4564'
const favouriteId = '1337'
const mockFavourite = { name: 'bar' } as Favourite
const mockMsg = `Deleted favourite ${favouriteId}`

const mock = new MockAdapter(axios)

beforeEach(() => {
  if (process.env.SYSTEM_TEST !== 'true') {
    mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(() => {
      return [200, { token: '', user: { id: '123', legacy_id: legacyId } }]
    })
  }
})

afterEach(() => {
  mock.reset()
})

describe('v0: Favourites', () => {
  it('retrieves all favourites', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/favourites/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [{}]
          }
        ]
      })
    }

    const th = await initThInstance()
    const favourites = th.favourites()

    expect(favourites).toBeInstanceOf(Favourites)

    const { data } = await favourites.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('handle pagination', async () => {
    const favouritesItems = Array.from({ length: 5 }, () => faker.datatype.uuid())
    const favouritesResponse = {
      results: favouritesItems.map(item => ({ product_id: item })),
      cursor: {
        next: `https://api.tillhub.com/api/v0/favourites/${legacyId}?page=2`
      },
      count: favouritesItems.length
    }

    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/favourites/${legacyId}`).reply(() => {
        return [
          200,
          favouritesResponse
        ]
      })
    }
    const th = await initThInstance()
    const favourites = th.favourites()
    expect(favourites).toBeInstanceOf(Favourites)

    const { next } = await favourites.getAll()
    expect(typeof next === 'function').toBeTruthy()
  })

  it('retrieves one favourite', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [{}]
            }
          ]
        })
    }

    const th = await initThInstance()
    const favourites = th.favourites()

    expect(favourites).toBeInstanceOf(Favourites)

    const { data } = await favourites.get(favouriteId)

    expect(Array.isArray(data)).toBe(false)
  })

  it('creates one favourite', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onPost(`https://api.tillhub.com/api/v0/favourites/${legacyId}`).reply(() => {
        return [
          200,
          {
            count: 1,
            results: [mockFavourite]
          }
        ]
      })
    }

    const th = await initThInstance()
    const favourites = th.favourites()
    expect(favourites).toBeInstanceOf(Favourites)

    const { data } = await favourites.create(mockFavourite)
    expect(data).toEqual(mockFavourite)
  })

  it('updates one favourite', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPut(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [
            200,
            {
              count: 1,
              results: [mockFavourite]
            }
          ]
        })
    }

    const th = await initThInstance()
    const favourites = th.favourites()
    expect(favourites).toBeInstanceOf(Favourites)

    const { data } = await favourites.update(favouriteId, mockFavourite)
    expect(data).toEqual(mockFavourite)
  })

  it('deletes one favourite', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onDelete(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [
            200,
            {
              msg: mockMsg
            }
          ]
        })
    }

    const th = await initThInstance()
    const favourites = th.favourites()
    expect(favourites).toBeInstanceOf(Favourites)

    const { msg } = await favourites.delete(favouriteId)
    expect(msg).toEqual(mockMsg)
  })

  it('rejects getAll() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock.onGet(`https://api.tillhub.com/api/v0/favourites/${legacyId}`).reply(() => {
        return [205]
      })
    }

    const th = await initThInstance()

    try {
      await th.favourites().getAll()
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(FavouritesFetchFailed.name)
    }
  })

  it('rejects get() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onGet(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.favourites().get(favouriteId)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(FavouriteFetchFailed.name)
    }
  })

  it('rejects create() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.favourites().create(mockFavourite)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(FavouriteCreateFailed.name)
    }
  })

  it('rejects update() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPut(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [205]
        })
    }
    const th = await initThInstance()

    try {
      await th.favourites().update(favouriteId, mockFavourite)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(FavouriteUpdateFailed.name)
    }
  })

  it('rejects delete() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onDelete(`https://api.tillhub.com/api/v0/favourites/${legacyId}/${favouriteId}`)
        .reply(() => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.favourites().delete(favouriteId)
      fail('should throw an error')
    } catch (e: any) {
      expect(e.name).toEqual(FavouriteDeleteFailed.name)
    }
  })
})
