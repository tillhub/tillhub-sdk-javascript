import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CategoriesOptions {
  user?: string
  base?: string
}

export interface CategoriesQuery {
  limit?: number
  uri?: string
  query?: {
    start?: string
  }
}

export interface CategoriesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<CategoriesResponse>
}

export interface CategoryResponse {
  data?: Category
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Category {
  metadata?: Record<string, unknown>
  name?: string
  summary?: string
  description?: string
  comments?: string
  color?: string
  images?: Record<string, unknown>
  active?: boolean
  deleted?: boolean
}

export class Categories extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/categories'
  endpoint: string
  http: Client
  public options: CategoriesOptions
  public uriHelper: UriHelper

  constructor (options: CategoriesOptions, http: Client) {
    super(http, {
      endpoint: Categories.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Categories.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: CategoriesQuery | undefined): Promise<CategoriesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CategoriesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<CategoriesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new CategoriesFetchFailed(error.message, { error })
    }
  }

  async get (categoryId: string): Promise<CategoryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${categoryId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CategoryFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Category,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CategoryFetchFailed(error.message, { error })
    }
  }

  async put (categoryId: string, category: Category): Promise<CategoryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${categoryId}`)
    try {
      const response = await this.http.getClient().put(uri, category)

      return {
        data: response.data.results[0] as Category,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CategoryPutFailed(error.message, { error })
    }
  }

  async create (category: Category): Promise<CategoryResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, category)

      return {
        data: response.data.results[0] as Category,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CategoryCreationFailed(error.message, { error })
    }
  }

  async delete (storefrontId: string): Promise<CategoryResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${storefrontId}`)

    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new CategoriesDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new CategoriesDeleteFailed(error.message, { error })
    }
  }
}

export class CategoriesFetchFailed extends BaseError {
  public name = 'CategoriesFetchFailed'
  constructor (
    public message: string = 'Could not fetch categories',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoriesFetchFailed.prototype)
  }
}

export class CategoryFetchFailed extends BaseError {
  public name = 'CategoryFetchFailed'
  constructor (
    public message: string = 'Could not fetch category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryFetchFailed.prototype)
  }
}

export class CategoryPutFailed extends BaseError {
  public name = 'CategoryPutFailed'
  constructor (
    public message: string = 'Could not alter category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryPutFailed.prototype)
  }
}

export class CategoryCreationFailed extends BaseError {
  public name = 'CategoryCreationFailed'
  constructor (
    public message: string = 'Could not create category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryCreationFailed.prototype)
  }
}

export class CategoriesDeleteFailed extends BaseError {
  public name = 'CategoriesDeleteFailed'
  constructor (
    public message: string = 'Could not delete category',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoriesDeleteFailed.prototype)
  }
}
