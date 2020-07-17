import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient } from '../../src/tillhub-js'
import {
  UserPermissionsTemplate,
  UserPermissionsTemplates,
  UserPermissionsTemplatesFetchFailed,
  UserPermissionsTemplatesFetchOneFailed,
  UserPermissionsTemplatesCreationFailed,
  UserPermissionsTemplatesUpdateFailed,
  UserPermissionsTemplatesDeleteFailed
} from '../../src/v0/user_permissions_templates'
import { initThInstance } from '../util'

const legacyId = '4564'
const templateId = '1337'
const mockUserPermissionsTemplate = {
  name: 'TheBestTemplateInTheWholeWorld',
  scopes: ['first:scope', 'second:scope']
} as UserPermissionsTemplate
const mockMsg = `Deleted template ${templateId}`

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: UserPermissionsTemplates', () => {
  it('retrieves all userPermissionsTemplates', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}`
        )
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

    const th = await initThInstance()

    const userPermissionsTemplates = th.userPermissionsTemplates()

    expect(userPermissionsTemplates).toBeInstanceOf(UserPermissionsTemplates)

    const { data } = await userPermissionsTemplates.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('retrieves one user permissions template', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
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

    const th = await initThInstance()

    const userPermissionsTemplates = th.userPermissionsTemplates()

    expect(userPermissionsTemplates).toBeInstanceOf(UserPermissionsTemplates)

    const { data } = await userPermissionsTemplates.get(templateId)

    expect(Array.isArray(data)).toBe(false)
  })

  it('creates one user permissions template', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
        .onPost(
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}`
        )
        .reply(config => {
          return [
            200,
            {
              count: 1,
              results: [mockUserPermissionsTemplate]
            }
          ]
        })
    }

    const th = await initThInstance()

    const userPermissionsTemplates = th.userPermissionsTemplates()
    expect(userPermissionsTemplates).toBeInstanceOf(UserPermissionsTemplates)

    const { data } = await userPermissionsTemplates.create(
      mockUserPermissionsTemplate
    )
    expect(data).toEqual(mockUserPermissionsTemplate)
  })

  it('updates one user permissions template', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
        .onPut(
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [
            200,
            {
              count: 1,
              results: [mockUserPermissionsTemplate]
            }
          ]
        })
    }

    const th = await initThInstance()

    const userPermissionsTemplates = th.userPermissionsTemplates()
    expect(userPermissionsTemplates).toBeInstanceOf(UserPermissionsTemplates)

    const { data } = await userPermissionsTemplates.update(
      templateId,
      mockUserPermissionsTemplate
    )
    expect(data).toEqual(mockUserPermissionsTemplate)
  })

  it('deletes one user permissions template', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
        .onDelete(
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [
            200,
            {
              msg: mockMsg
            }
          ]
        })
    }

    const th = await initThInstance()

    const userPermissionsTemplates = th.userPermissionsTemplates()
    expect(userPermissionsTemplates).toBeInstanceOf(UserPermissionsTemplates)

    const { msg } = await userPermissionsTemplates.delete(templateId)
    expect(msg).toEqual(mockMsg)
  })

  it('rejects getAll() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}`
        )
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.userPermissionsTemplates().getAll()
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(UserPermissionsTemplatesFetchFailed.name)
    }
  })

  it('rejects get() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.userPermissionsTemplates().get(templateId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(UserPermissionsTemplatesFetchOneFailed.name)
    }
  })

  it('rejects create() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
        .onPost(
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.userPermissionsTemplates().create(mockUserPermissionsTemplate)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(UserPermissionsTemplatesCreationFailed.name)
    }
  })

  it('rejects update() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
        .onPatch(
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th
        .userPermissionsTemplates()
        .update(templateId, mockUserPermissionsTemplate)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(UserPermissionsTemplatesUpdateFailed.name)
    }
  })

  it('rejects delete() if status code is not 200', async () => {
    if (process.env.SYSTEM_TEST !== 'true') {
      mock
        .onPost('https://api.tillhub.com/api/v0/users/login')
        .reply(function (config) {
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
        .onDelete(
          `https://api.tillhub.com/api/v0/user_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.userPermissionsTemplates().delete(templateId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(UserPermissionsTemplatesDeleteFailed.name)
    }
  })
})
