import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface ServiceCategoryOptions {
  user?: string
  base?: string
}

export interface ServiceCategoryResponse {
  data?: ServiceCategoryItem
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ServiceCategoryItem {
  name: string
  description?: string
  active?: boolean
  deleted?: boolean
}

export class ServiceCategory extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/service_categories'
  endpoint: string
  http: Client
  public options: ServiceCategoryOptions
  public uriHelper: UriHelper

  constructor (options: ServiceCategoryOptions, http: Client) {
    super(http, {
      endpoint: ServiceCategory.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ServiceCategory.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (serviceCategory: ServiceCategoryItem): Promise<ServiceCategoryResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, serviceCategory)

      return {
        data: response.data.results[0] as ServiceCategoryItem,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceCategoryCreationFailed(error.message, { error })
    }
  }
}

export class ServiceCategoryCreationFailed extends BaseError {
  public name = 'ServiceCategoryCreationFailed'
  constructor (
    public message: string = 'Could not create the service category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCategoryCreationFailed.prototype)
  }
}
