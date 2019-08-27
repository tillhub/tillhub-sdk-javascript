import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient } from '../../src/tillhub-js'
import { Processes,
  Process,
  ProcessesFetchFailed,
  ProcessesFetchOneFailed,
  ProcessesCreationFailed,
  ProcessesUpdateFailed,
  ProcessesDeleteFailed,
  ProcessItems,
  ProcessItemsFetchFailed
} from '../../src/v0/processes'

let user = {
  username: 'test@example.com',
  password: '12345678',
  clientAccount: 'someuuid',
  apiKey: '12345678'
}

if (process.env.SYSTEM_TEST) {
  user.username = process.env.SYSTEM_TEST_USERNAME || user.username
  user.password = process.env.SYSTEM_TEST_PASSWORD || user.password
  user.clientAccount = process.env.SYSTEM_TEST_CLIENT_ACCOUNT_ID || user.clientAccount
  user.apiKey = process.env.SYSTEM_TEST_API_KEY || user.apiKey
}

const legacyId = '4564'
const processId = '1337'
const mockProcess = { status: 'started', result: { items: [{ code: '1337', amount: 1337 }] } } as Process
const mockMsg = `Deleted process ${processId}`

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: Processes', () => {
  it('retrieves all processes', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/processes/${legacyId}`)
        .reply(function (config) {
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

    const processes = th.processes()

    expect(processes).toBeInstanceOf(Processes)

    const { data } = await processes.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('retrieves one process', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
        .reply(function (config) {
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

    const processes = th.processes()

    expect(processes).toBeInstanceOf(Processes)

    const { data } = await processes.get(processId)

    expect(Array.isArray(data)).toBe(false)
  })

  it('creates one process', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/processes/${legacyId}`)
        .reply((config) => {
          return [
            200,
            {
              count: 1,
              results: [mockProcess]
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

    const processes = th.processes()
    expect(processes).toBeInstanceOf(Processes)

    const { data } = await processes.create(mockProcess)
    expect(data).toEqual(mockProcess)
  })

  it('updates one process', async () => {
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
        .onPatch(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
        .reply((config) => {
          return [
            200,
            {
              count: 1,
              results: [mockProcess]
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

    const processes = th.processes()
    expect(processes).toBeInstanceOf(Processes)

    const { data } = await processes.update(processId, mockProcess)
    expect(data).toEqual(mockProcess)
  })

  it('gets process items', async () => {
    const mockItems = { items: [{ code: '1234', amount: 4 }] } as ProcessItems
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
        .onGet(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}/items`)
        .reply((config) => {
          return [
            200,
            {
              count: 1,
              results: mockItems
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

    const processes = th.processes()
    expect(processes).toBeInstanceOf(Processes)

    const { data } = await processes.getItems(processId)
    expect(data).toEqual(mockItems)
  })

  // it('deletes one process', async () => {
  //   if (process.env.SYSTEM_TEST !== 'true') {
  //     mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
  //       return [
  //         200,
  //         {
  //           token: '',
  //           user: {
  //             id: '123',
  //             legacy_id: legacyId
  //           }
  //         }
  //       ]
  //     })
  //
  //     mock
  //       .onDelete(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
  //       .reply((config) => {
  //         return [
  //           200,
  //           {
  //             msg: mockMsg
  //           }
  //         ]
  //       })
  //   }
  //
  //   const options = {
  //     credentials: {
  //       username: user.username,
  //       password: user.password
  //     },
  //     base: process.env.TILLHUB_BASE
  //   }
  //
  //   const th = new TillhubClient()
  //
  //   th.init(options)
  //   await th.auth.loginUsername({
  //     username: user.username,
  //     password: user.password
  //   })
  //
  //   const processes = th.processes()
  //   expect(processes).toBeInstanceOf(Processes)
  //
  //   const { msg } = await processes.delete(processId)
  //   expect(msg).toEqual(mockMsg)
  // })

  it('rejects getAll() if status code is not 200', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/processes/${legacyId}`)
        .reply(function (config) {
          return [
            205
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

    try {
      await th.processes().getAll()
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(ProcessesFetchFailed.name)
    }
  })

  it('rejects get() if status code is not 200', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
        .reply(function (config) {
          return [
            205
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

    try {
      await th.processes().get(processId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(ProcessesFetchOneFailed.name)
    }
  })

  it('rejects create() if status code is not 200', async () => {
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
        .onPost(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
        .reply((config) => {
          return [
            205
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

    try {
      await th.processes().create(mockProcess)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(ProcessesCreationFailed.name)
    }
  })

  it('rejects update() if status code is not 200', async () => {
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
        .onPatch(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
        .reply((config) => {
          return [
            205
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

    try {
      await th.processes().update(processId, mockProcess)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(ProcessesUpdateFailed.name)
    }
  })

  it('rejects getItems() if status code is not 200', async () => {
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
        .onGet(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}/items`)
        .reply(function (config) {
          return [
            205
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

    try {
      await th.processes().getItems(processId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(ProcessItemsFetchFailed.name)
    }
  })

  // it('rejects delete() if status code is not 200', async () => {
  //   if (process.env.SYSTEM_TEST !== 'true') {
  //     mock.onPost('https://api.tillhub.com/api/v0/users/login').reply(function (config) {
  //       return [
  //         200,
  //         {
  //           token: '',
  //           user: {
  //             id: '123',
  //             legacy_id: legacyId
  //           }
  //         }
  //       ]
  //     })
  //
  //     mock
  //       .onDelete(`https://api.tillhub.com/api/v0/processes/${legacyId}/${processId}`)
  //       .reply((config) => {
  //         return [
  //           205
  //         ]
  //       })
  //   }
  //
  //   const options = {
  //     credentials: {
  //       username: user.username,
  //       password: user.password
  //     },
  //     base: process.env.TILLHUB_BASE
  //   }
  //
  //   const th = new TillhubClient()
  //
  //   th.init(options)
  //   await th.auth.loginUsername({
  //     username: user.username,
  //     password: user.password
  //   })
  //
  //   try {
  //     await th.processes().delete(processId)
  //     fail('should throw an error')
  //   } catch (e) {
  //     expect(e.name).toEqual(ProcessesDeleteFailed.name)
  //   }
  // })
})
