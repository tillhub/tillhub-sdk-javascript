import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'
import { ServiceStepAssignment } from './service_step_assignments'

export interface ServicesOptions {
  user?: string
  base?: string
}

export interface ServicesQuery {
  q?: string
  limit?: number
  offset?: number
  uri?: string
  active?: boolean
  deleted?: boolean
  serviceCategoryId?: string
}

export interface ServicesResponse {
  data: Service[]
  metadata: Record<string, unknown>
}

export interface ServiceResponse {
  data?: Service
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface Service {
  id?: string
  name: string
  description?: string | null
  duration: number
  linkedProductId: string
  bookableOnline?: boolean
  serviceCategoryId?: string | null
  locations?: string[] | null
  active?: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
  assignments?: ServiceStepAssignment[]
}

export class Services extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/services'
  endpoint: string
  http: Client
  public options: ServicesOptions
  public uriHelper: UriHelper

  constructor (options: ServicesOptions, http: Client) {
    super(http, {
      endpoint: Services.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Services.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ServicesQuery | undefined): Promise<ServicesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.results?.length, cursors: response.data.cursors }
      }
    } catch (error: any) {
      throw new ServicesFetchAllFailed(error.message, { error })
    }
  }

  async get (serviceId: string): Promise<ServiceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ServiceFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Service,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceFetchFailed(error.message, { error })
    }
  }

  async create (service: Service): Promise<ServiceResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, service)

      return {
        data: response.data.results[0] as Service,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceCreationFailed(error.message, { error })
    }
  }

  async put (serviceId: string, service: Service): Promise<ServiceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceId}`)
    try {
      const response = await this.http.getClient().put(uri, service)

      return {
        data: response.data.results[0] as Service,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServicePutFailed(error.message, { error })
    }
  }

  async delete (serviceId: string): Promise<ServiceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ServiceDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ServiceDeleteFailed(error.message, { error })
    }
  }
}

export class ServicesFetchAllFailed extends BaseError {
  public name = 'ServicesFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all services',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServicesFetchAllFailed.prototype)
  }
}

export class ServiceFetchFailed extends BaseError {
  public name = 'ServiceFetchFailed'
  constructor (
    public message: string = 'Could not fetch the service',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceFetchFailed.prototype)
  }
}

export class ServiceCreationFailed extends BaseError {
  public name = 'ServiceCreationFailed'
  constructor (
    public message: string = 'Could not create the service',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCreationFailed.prototype)
  }
}

export class ServicePutFailed extends BaseError {
  public name = 'ServicePutFailed'
  constructor (
    public message: string = 'Could not alter the service',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServicePutFailed.prototype)
  }
}

export class ServiceDeleteFailed extends BaseError {
  public name = 'ServiceDeleteFailed'
  constructor (
    public message: string = 'Could not delete the service',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceDeleteFailed.prototype)
  }
}
