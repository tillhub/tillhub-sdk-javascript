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

export interface ServiceCategoriesQuery {
  deleted?: boolean
  active?: boolean
  name?: string
  q?: string
  uri?: string
}

export interface ServiceCategoriesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<ServiceCategoriesResponse>
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

  async getAll (query?: ServiceCategoriesQuery | undefined): Promise<ServiceCategoriesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ServiceCategoriesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new ServiceCategoriesFetchAllFailed(error.message, { error })
    }
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

class ServiceCategoriesFetchAllFailed extends BaseError {
  public name = 'ServiceCategoriesFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all service categories',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCategoriesFetchAllFailed.prototype)
  }
}
