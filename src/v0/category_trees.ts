import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CategoryTreesOptions {
  user?: string
  base?: string
}

export interface CategoryTreesQuery {
  limit?: number
  uri?: string
  query?: {
    start?: string
  }
}

export interface CategoryTreesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<CategoryTreesResponse>
}

export interface CategoryTreeResponse {
  data: CategoryTree
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface CategoryTree {
  metadata?: Record<string, unknown>
  name?: string
  summary?: string
  description?: string
  comments?: string
  children?: Array<Record<string, unknown>>
  active?: boolean
  deleted?: boolean
}

export class CategoryTrees extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/category_trees'
  endpoint: string
  http: Client
  public options: CategoryTreesOptions
  public uriHelper: UriHelper

  constructor (options: CategoryTreesOptions, http: Client) {
    super(http, {
      endpoint: CategoryTrees.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = CategoryTrees.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll (query?: CategoryTreesQuery | undefined): Promise<CategoryTreesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new CategoryTreesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<CategoryTreesResponse> =>
            this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as CategoryTreesResponse)
      } catch (error) {
        return reject(new CategoryTreesFetchFailed(undefined, { error }))
      }
    })
  }

  get (categoryTreeId: string): Promise<CategoryTreeResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${categoryTreeId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CategoryTreeFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as CategoryTree,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CategoryTreeResponse)
      } catch (error) {
        return reject(new CategoryTreeFetchFailed(undefined, { error }))
      }
    })
  }

  put (categoryTreeId: string, categoryTree: CategoryTree): Promise<CategoryTreeResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${categoryTreeId}`)
      try {
        const response = await this.http.getClient().put(uri, categoryTree)

        return resolve({
          data: response.data.results[0] as CategoryTree,
          metadata: { count: response.data.count }
        } as CategoryTreeResponse)
      } catch (error) {
        return reject(new CategoryTreePutFailed(undefined, { error }))
      }
    })
  }

  create (categoryTree: CategoryTree): Promise<CategoryTreeResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri()
      try {
        const response = await this.http.getClient().post(uri, categoryTree)

        return resolve({
          data: response.data.results[0] as CategoryTree,
          metadata: { count: response.data.count }
        } as CategoryTreeResponse)
      } catch (error) {
        return reject(new CategoryTreeCreationFailed(undefined, { error }))
      }
    })
  }

  delete (storefrontId: string): Promise<CategoryTreeResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${storefrontId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new CategortTreesDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as CategoryTreeResponse)
      } catch (err) {
        return reject(new CategortTreesDeleteFailed())
      }
    })
  }
}

export class CategoryTreesFetchFailed extends BaseError {
  public name = 'CategoryTreesFetchFailed'
  constructor (
    public message: string = 'Could not fetch category trees',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryTreesFetchFailed.prototype)
  }
}

export class CategoryTreeFetchFailed extends BaseError {
  public name = 'CategoryTreeFetchFailed'
  constructor (
    public message: string = 'Could not fetch category tree',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryTreeFetchFailed.prototype)
  }
}

export class CategoryTreePutFailed extends BaseError {
  public name = 'CategoryTreePutFailed'
  constructor (
    public message: string = 'Could not alter category tree',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryTreePutFailed.prototype)
  }
}

export class CategoryTreeCreationFailed extends BaseError {
  public name = 'CategoryTreeCreationFailed'
  constructor (
    public message: string = 'Could not create category tree',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategoryTreeCreationFailed.prototype)
  }
}

export class CategortTreesDeleteFailed extends BaseError {
  public name = 'CategortTreesDeleteFailed'
  constructor (
    public message: string = 'Could not delete category tree',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CategortTreesDeleteFailed.prototype)
  }
}
