import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'
import { ThBaseHandler } from '../base'

export interface ServiceCategoriesOptions {
  user?: string
  base?: string
}

export interface ServiceCategoriesQuery {
  q?: string
  limit?: number
  offset?: number
  uri?: string
  active?: boolean
  deleted?: boolean
  branchId?: string
}

export interface ServiceCategoriesResponse {
  data: ServiceCategory[]
  metadata: Record<string, unknown>
}

export interface ServiceCategoryResponse {
  data?: ServiceCategory
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ServiceCategory {
  id?: string
  name: string
  description?: string | null
  active?: boolean
  createdAt?: string
  updatedAt?: string
  deletedAt?: string | null
}

export class ServiceCategories extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/service-categories'
  endpoint: string
  http: Client
  public options: ServiceCategoriesOptions
  public uriHelper: UriHelper

  constructor (options: ServiceCategoriesOptions, http: Client) {
    super(http, {
      endpoint: ServiceCategories.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ServiceCategories.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ServiceCategoriesQuery | undefined): Promise<ServiceCategoriesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.results?.length, cursors: response.data.cursors }
      }
    } catch (error: any) {
      throw new ServiceCategoriesFetchAllFailed(error.message, { error })
    }
  }

  async get (serviceCategoryId: string): Promise<ServiceCategoryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceCategoryId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ServiceCategoryFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ServiceCategory,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceCategoryFetchFailed(error.message, { error })
    }
  }

  async create (serviceCategory: ServiceCategory): Promise<ServiceCategoryResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, serviceCategory)

      return {
        data: response.data.results[0] as ServiceCategory,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceCategoryCreationFailed(error.message, { error })
    }
  }

  async put (serviceCategoryId: string, serviceCategory: ServiceCategory): Promise<ServiceCategoryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceCategoryId}`)
    try {
      const response = await this.http.getClient().put(uri, serviceCategory)

      return {
        data: response.data.results[0] as ServiceCategory,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ServiceCategoryPutFailed(error.message, { error })
    }
  }

  async delete (serviceCategoryId: string): Promise<ServiceCategoryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${serviceCategoryId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ServiceCategoryDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ServiceCategoryDeleteFailed(error.message, { error })
    }
  }
}

export class ServiceCategoriesFetchAllFailed extends BaseError {
  public name = 'ServiceCategoriesFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all service categories',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCategoriesFetchAllFailed.prototype)
  }
}

export class ServiceCategoryFetchFailed extends BaseError {
  public name = 'ServiceCategoryFetchFailed'
  constructor (
    public message: string = 'Could not fetch the service category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCategoryFetchFailed.prototype)
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

export class ServiceCategoryPutFailed extends BaseError {
  public name = 'ServiceCategoryPutFailed'
  constructor (
    public message: string = 'Could not alter the service category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCategoryPutFailed.prototype)
  }
}

export class ServiceCategoryDeleteFailed extends BaseError {
  public name = 'ServiceCategoryDeleteFailed'
  constructor (
    public message: string = 'Could not delete the service category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ServiceCategoryDeleteFailed.prototype)
  }
}
