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
  data?: StaffPermissionsTemplate
  metadata?: Record<string, unknown>
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

  constructor (options: StaffPermissionsTemplatesOptions, http: Client) {
    super(http, {
      endpoint: StaffPermissionsTemplates.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = StaffPermissionsTemplates.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (template: StaffPermissionsTemplate): Promise<StaffPermissionsTemplateResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().post(uri, template)
      if (response.status !== 200) {
        throw new StaffPermissionsTemplatesCreationFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffPermissionsTemplatesCreationFailed(undefined, { error })
    }
  }

  async getAll (
    query?: StaffPermissionsTemplatesQueryOptions
  ): Promise<StaffPermissionsTemplatesResponse> {
    try {
      const baseUri = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffPermissionsTemplatesFetchFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffPermissionsTemplatesFetchFailed(undefined, { error })
    }
  }

  async get (
    templateId: string,
    query?: StaffPermissionsTemplatesQueryOptions
  ): Promise<StaffPermissionsTemplateResponse> {
    try {
      const baseUri = this.uriHelper.generateBaseUri(`/${templateId}`)
      const uri = this.uriHelper.generateUriWithQuery(baseUri, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffPermissionsTemplatesFetchOneFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results[0],
        metadata: { count: 1 }
      }
    } catch (error: any) {
      throw new StaffPermissionsTemplatesFetchOneFailed(undefined, { error })
    }
  }

  async update (
    templateId: string,
    template: StaffPermissionsTemplate
  ): Promise<StaffPermissionsTemplateResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${templateId}`)

      const response = await this.http.getClient().put(uri, template)
      if (response.status !== 200) {
        throw new StaffPermissionsTemplatesUpdateFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results[0] as StaffPermissionsTemplate,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffPermissionsTemplatesUpdateFailed(undefined, { error })
    }
  }

  async delete (templateId: string): Promise<StaffPermissionsTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${templateId}`)

    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new StaffPermissionsTemplatesDeleteFailed(undefined, {
          status: response.status
        })
      }

      return {
        msg: response.data.msg
      }
    } catch (err: any) {
      throw new StaffPermissionsTemplatesDeleteFailed()
    }
  }
}

export class StaffPermissionsTemplatesFetchFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesFetchFailed'
  constructor (
    public message: string = 'Could not fetch all staff permissions templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPermissionsTemplatesFetchFailed.prototype)
  }
}

export class StaffPermissionsTemplatesFetchOneFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPermissionsTemplatesFetchOneFailed.prototype)
  }
}

export class StaffPermissionsTemplatesUpdateFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesUpdateFailed'
  constructor (
    public message: string = 'Could not update staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPermissionsTemplatesUpdateFailed.prototype)
  }
}

export class StaffPermissionsTemplatesCreationFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesCreationFailed'
  constructor (
    public message: string = 'Could not create staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPermissionsTemplatesCreationFailed.prototype)
  }
}

export class StaffPermissionsTemplatesDeleteFailed extends BaseError {
  public name = 'StaffPermissionsTemplatesDeleteFailed'
  constructor (
    public message: string = 'Could not delete staff permissions template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPermissionsTemplatesDeleteFailed.prototype)
  }
}
