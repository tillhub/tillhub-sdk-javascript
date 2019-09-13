import * as dotenv from 'dotenv'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
dotenv.config()
import { TillhubClient } from '../../src/tillhub-js'
import {
  StaffPermissionsTemplate,
  StaffPermissionsTemplates,
  StaffPermissionsTemplatesFetchFailed,
  StaffPermissionsTemplatesFetchOneFailed,
  StaffPermissionsTemplatesCreationFailed,
  StaffPermissionsTemplatesUpdateFailed,
  StaffPermissionsTemplatesDeleteFailed
} from '../../src/v0/staff_permissions_templates'
import { initThInstance } from '../util'

const legacyId = '4564'
const templateId = '1337'
const mockStaffPermissionsTemplate = {
  name: 'TheBestTemplateInTheWholeWorld',
  scopes: ['first:scope', 'second:scope']
} as StaffPermissionsTemplate
const mockMsg = `Deleted template ${templateId}`

const mock = new MockAdapter(axios)
afterEach(() => {
  mock.reset()
})

describe('v0: StaffPermissionsTemplates', () => {
  it('retrieves all staffPermissionsTemplates', async () => {
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}`
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

    const staffPermissionsTemplates = th.staffPermissionsTemplates()

    expect(staffPermissionsTemplates).toBeInstanceOf(StaffPermissionsTemplates)

    const { data } = await staffPermissionsTemplates.getAll()

    expect(Array.isArray(data)).toBe(true)
  })

  it('retrieves one staff permissions template', async () => {
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
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

    const staffPermissionsTemplates = th.staffPermissionsTemplates()

    expect(staffPermissionsTemplates).toBeInstanceOf(StaffPermissionsTemplates)

    const { data } = await staffPermissionsTemplates.get(templateId)

    expect(Array.isArray(data)).toBe(false)
  })

  it('creates one staff permissions template', async () => {
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}`
        )
        .reply(config => {
          return [
            200,
            {
              count: 1,
              results: [mockStaffPermissionsTemplate]
            }
          ]
        })
    }

    const th = await initThInstance()

    const staffPermissionsTemplates = th.staffPermissionsTemplates()
    expect(staffPermissionsTemplates).toBeInstanceOf(StaffPermissionsTemplates)

    const { data } = await staffPermissionsTemplates.create(
      mockStaffPermissionsTemplate
    )
    expect(data).toEqual(mockStaffPermissionsTemplate)
  })

  it('updates one staff permissions template', async () => {
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [
            200,
            {
              count: 1,
              results: [mockStaffPermissionsTemplate]
            }
          ]
        })
    }

    const th = await initThInstance()

    const staffPermissionsTemplates = th.staffPermissionsTemplates()
    expect(staffPermissionsTemplates).toBeInstanceOf(StaffPermissionsTemplates)

    const { data } = await staffPermissionsTemplates.update(
      templateId,
      mockStaffPermissionsTemplate
    )
    expect(data).toEqual(mockStaffPermissionsTemplate)
  })

  it('deletes one staff permissions template', async () => {
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
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

    const staffPermissionsTemplates = th.staffPermissionsTemplates()
    expect(staffPermissionsTemplates).toBeInstanceOf(StaffPermissionsTemplates)

    const { msg } = await staffPermissionsTemplates.delete(templateId)
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}`
        )
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staffPermissionsTemplates().getAll()
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(StaffPermissionsTemplatesFetchFailed.name)
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
        )
        .reply(function (config) {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staffPermissionsTemplates().get(templateId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(StaffPermissionsTemplatesFetchOneFailed.name)
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staffPermissionsTemplates().create(mockStaffPermissionsTemplate)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(StaffPermissionsTemplatesCreationFailed.name)
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th
        .staffPermissionsTemplates()
        .update(templateId, mockStaffPermissionsTemplate)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(StaffPermissionsTemplatesUpdateFailed.name)
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
          `https://api.tillhub.com/api/v0/staff_permission_templates/${legacyId}/${templateId}`
        )
        .reply(config => {
          return [205]
        })
    }

    const th = await initThInstance()

    try {
      await th.staffPermissionsTemplates().delete(templateId)
      fail('should throw an error')
    } catch (e) {
      expect(e.name).toEqual(StaffPermissionsTemplatesDeleteFailed.name)
    }
  })
})
