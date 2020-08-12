import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors'

export interface StaffPermissionsTemplatesOptions {
  user?: string
  base?: string
}

export interface StaffPermissionsTemplatesQueryOptions {
  [key: string]: any
}

export interface StaffPermissionsTemplatesResponse {
  data: StaffPermissionsTemplate[]
  metadata: Record<string, unknown>
}

export interface StaffPermissionsTemplateResponse {
  data: StaffPermissionsTemplate
  metadata: Record<string, unknown>
  msg?: string
}

export interface StaffPermissionsTemplate {
  name?: string
  scopes?: string[]
  deleted?: boolean
  active?: boolean
}

export class StaffPermissionsTemplates extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/staff_permission_templates'
  endpoint: string
  http: Client
  public options: StaffPermissionsTemplatesOptions
  public uriHelper: UriHelper

  constructor(options: StaffPermissionsTemplatesOptions, http: Client) {
    super(http, {
      endpoint: StaffPermissionsTemplates.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StaffPermissionsTemplates.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  create(template: StaffPermissionsTemplate): Promise<StaffPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()

        const response = await this.http.getClient().post(uri, template)
        response.status !== 200 &&
          reject(
            new StaffPermissionsTemplatesCreationFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as StaffPermissionsTemplateResponse)
      } catch (error) {
        return reject(new StaffPermissionsTemplatesCreationFailed(undefined, { error }))
      }
    })
  }

  getAll(
    query?: StaffPermissionsTemplatesQueryOptions
  ): Promise<StaffPermissionsTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new StaffPermissionsTemplatesFetchFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffPermissionsTemplatesResponse)
      } catch (error) {
        return reject(new StaffPermissionsTemplatesFetchFailed(undefined, { error }))
      }
    })
  }

  get(
    templateId: string,
    query?: StaffPermissionsTemplatesQueryOptions
  ): Promise<StaffPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const baseUri = this.uriHelper.generateBaseUri(`/${templateId}`)
        const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new StaffPermissionsTemplatesFetchOneFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results[0],
          metadata: { count: 1 }
        } as StaffPermissionsTemplateResponse)
      } catch (error) {
        return reject(new StaffPermissionsTemplatesFetchOneFailed(undefined, { error }))
      }
    })
  }

  update(
    templateId: string,
    template: StaffPermissionsTemplate
  ): Promise<StaffPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${templateId}`)

        const response = await this.http.getClient().put(uri, template)
        response.status !== 200 &&
          reject(
            new StaffPermissionsTemplatesUpdateFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results[0] as StaffPermissionsTemplate,
          metadata: { count: response.data.count }
        } as StaffPermissionsTemplateResponse)
      } catch (error) {
        return reject(new StaffPermissionsTemplatesUpdateFailed(undefined, { error }))
      }
    })
  }

  delete(templateId: string): Promise<StaffPermissionsTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${templateId}`)

      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 &&
          reject(
            new StaffPermissionsTemplatesDeleteFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          msg: response.data.msg
        } as StaffPermissionsTemplateResponse)
      } catch (err) {
        return reject(new StaffPermissionsTemplatesDeleteFailed())
      }
    })
  }
}

export class StaffPermissionsTemplatesFetchFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesFetchFailed'
  constructor(
    public message: string = 'Could not fetch all staff permissions templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class StaffPermissionsTemplatesFetchOneFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesFetchOneFailed'
  constructor(
    public message: string = 'Could not fetch one staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class StaffPermissionsTemplatesUpdateFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesUpdateFailed'
  constructor(
    public message: string = 'Could not update staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class StaffPermissionsTemplatesCreationFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesCreationFailed'
  constructor(
    public message: string = 'Could not create staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}

export class StaffPermissionsTemplatesDeleteFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesDeleteFailed'
  constructor(
    public message: string = 'Could not delete staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
  }
}
