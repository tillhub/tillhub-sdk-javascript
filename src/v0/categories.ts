import qs from 'qs'
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
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
  next?: () => Promise<CategoriesResponse>
}

export interface CategoryResponse {
  data: Category
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

  constructor(options: CategoriesOptions, http: Client) {
    super(http, {
      endpoint: Categories.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Categories.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: CategoriesQuery | undefined): Promise<CategoriesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new CategoriesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<CategoriesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as CategoriesResponse)
      } catch (error) {
        return reject(new CategoriesFetchFailed(undefined, { error }))
      }
    })
  }

  get(categoryId: string): Promise<CategoryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${categoryId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CategoryFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Category,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CategoryResponse)
      } catch (error) {
        return reject(new CategoryFetchFailed(undefined, { error }))
      }
    })
  }

  put(categoryId: string, category: Category): Promise<CategoryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${categoryId}`)
      try {
        const response = await this.http.getClient().put(uri, category)

        return resolve({
          data: response.data.results[0] as Category,
          metadata: { count: response.data.count }
        } as CategoryResponse)
      } catch (error) {
        return reject(new CategoryPutFailed(undefined, { error }))
      }
    })
  }

  create(category: Category): Promise<CategoryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri()
      try {
        const response = await this.http.getClient().post(uri, category)

        return resolve({
          data: response.data.results[0] as Category,
          metadata: { count: response.data.count }
        } as CategoryResponse)
      } catch (error) {
        return reject(new CategoryCreationFailed(undefined, { error }))
      }
    })
  }

  delete(storefrontId: string): Promise<CategoryResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${storefrontId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new CategoriesDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as CategoryResponse)
      } catch (err) {
        return reject(new CategoriesDeleteFailed())
      }
    })
  }
}

export class CategoriesFetchFailed extends BaseError {
  public name = 'CategoriesFetchFailed'
  constructor(public message: string = 'Could not fetch categories', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoriesFetchFailed.prototype)
  }
}

export class CategoryFetchFailed extends BaseError {
  public name = 'CategoryFetchFailed'
  constructor(public message: string = 'Could not fetch category', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryFetchFailed.prototype)
  }
}

export class CategoryPutFailed extends BaseError {
  public name = 'CategoryPutFailed'
  constructor(public message: string = 'Could not alter category', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryPutFailed.prototype)
  }
}

export class CategoryCreationFailed extends BaseError {
  public name = 'CategoryCreationFailed'
  constructor(public message: string = 'Could not create category', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryCreationFailed.prototype)
  }
}

export class CategoriesDeleteFailed extends BaseError {
  public name = 'CategoriesDeleteFailed'
  constructor(public message: string = 'Could not delete category', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoriesDeleteFailed.prototype)
  }
}
