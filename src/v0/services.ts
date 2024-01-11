import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface ServicesOptions {
  user?: string
  base?: string
}

export interface ServiceResponse {
  data?: ServicesObject
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ServicesObject {
  name: string
  category?: string
  duration: number
  description?: string
  linked_product: string
  id?: string
  deleted?: boolean
  locations?: null | string[]
}

export class Services extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/services'
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

  async create (service: ServicesObject): Promise<ServiceResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, service)

      return {
        data: response.data.results[0] as ServicesObject,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceCreationFailed(error.message, { error })
    }
  }

  async put (serviceId: string, service: ServicesObject): Promise<ServiceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceId}`)

    try {
      const response = await this.http.getClient().put(uri, service)

      return {
        data: response.data.results[0] as ServicesObject,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServicePutFailed(error.message, { error })
    }
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
