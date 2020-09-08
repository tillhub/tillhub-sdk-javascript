import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface UserPermissionsTemplatesOptions {
  user?: string
  base?: string
}

export interface UserPermissionsTemplatesResponse {
  data: UserPermissionsTemplate[]
  metadata: Record<string, unknown>
}

export interface UserPermissionsTemplateResponse {
  data: UserPermissionsTemplate
  metadata: Record<string, unknown>
  msg?: string
}

export interface UserPermissionsTemplate {
  name?: string
  scopes?: string[]
  deleted?: boolean
  active?: boolean
}

export class UserPermissionsTemplates extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/user_permission_templates'
  endpoint: string
  http: Client
  public options: UserPermissionsTemplatesOptions
  public uriHelper: UriHelper

  constructor (options: UserPermissionsTemplatesOptions, http: Client) {
    super(http, {
      endpoint: UserPermissionsTemplates.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = UserPermissionsTemplates.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  create (template: UserPermissionsTemplate): Promise<UserPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()

        const response = await this.http.getClient().post(uri, template)
        response.status !== 200 &&
          reject(
            new UserPermissionsTemplatesCreationFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as UserPermissionsTemplateResponse)
      } catch (error) {
        return reject(new UserPermissionsTemplatesCreationFailed(undefined, { error }))
      }
    })
  }

  getAll (query?: Record<string, unknown>): Promise<UserPermissionsTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new UserPermissionsTemplatesFetchFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as UserPermissionsTemplatesResponse)
      } catch (error) {
        return reject(new UserPermissionsTemplatesFetchFailed(undefined, { error }))
      }
    })
  }

  get (
    templateId: string,
    query?: Record<string, unknown>
  ): Promise<UserPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri(`/${templateId}`)
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new UserPermissionsTemplatesFetchOneFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results[0],
          metadata: { count: 1 }
        } as UserPermissionsTemplateResponse)
      } catch (error) {
        return reject(new UserPermissionsTemplatesFetchOneFailed(undefined, { error }))
      }
    })
  }

  update (
    templateId: string,
    template: UserPermissionsTemplate
  ): Promise<UserPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${templateId}`)

        const response = await this.http.getClient().put(uri, template)
        response.status !== 200 &&
          reject(
            new UserPermissionsTemplatesUpdateFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results[0] as UserPermissionsTemplate,
          metadata: { count: response.data.count }
        } as UserPermissionsTemplateResponse)
      } catch (error) {
        return reject(new UserPermissionsTemplatesUpdateFailed(undefined, { error }))
      }
    })
  }

  delete (templateId: string): Promise<UserPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${templateId}`)

      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 &&
          reject(
            new UserPermissionsTemplatesDeleteFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          msg: response.data.msg
        } as UserPermissionsTemplateResponse)
      } catch (err) {
        return reject(new UserPermissionsTemplatesDeleteFailed())
      }
    })
  }
}

export class UserPermissionsTemplatesFetchFailed extends BaseError {
  public name = 'UserPermissionsTemplatesFetchFailed'
  constructor (
    public message: string = 'Could not fetch all user permissions templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class UserPermissionsTemplatesFetchOneFailed extends BaseError {
  public name = 'UserPermissionsTemplatesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one user permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class UserPermissionsTemplatesUpdateFailed extends BaseError {
  public name = 'UserPermissionsTemplatesUpdateFailed'
  constructor (
    public message: string = 'Could not update user permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class UserPermissionsTemplatesCreationFailed extends BaseError {
  public name = 'UserPermissionsTemplatesCreationFailed'
  constructor (
    public message: string = 'Could not create user permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class UserPermissionsTemplatesDeleteFailed extends BaseError {
  public name = 'UserPermissionsTemplatesDeleteFailed'
  constructor (
    public message: string = 'Could not delete user permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}
