import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface ProductGroupsOptions {
  user?: string
  base?: string
}

export type ProductGroupsEmbedOptions = 'account' | 'tax'

export interface ProductGroupsQuery {
  limit?: number
  uri?: string
  query?: {
    embed?: ProductGroupsEmbedOptions | ProductGroupsEmbedOptions[]
    deleted?: boolean
    active?: boolean
  }
}

export interface ProductGroupsResponse {
  data: ProductGroup[]
  metadata: Record<string, unknown>
}

export interface ProductGroupResponse {
  data?: ProductGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ProductGroupsBulkResponse {
  data: {
    updated_product_groups?: ProductGroup[]
    invalid_product_groups?: ProductGroup[]
    created_product_groups?: ProductGroup[]
  }
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ProductGroup {
  id?: string
  name: string
  product_group_id: string
  tax: string
  active?: boolean
  account: string
  images: Record<string, unknown>
  color?: string
}

export class ProductGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_groups'
  endpoint: string
  http: Client
  public options: ProductGroupsOptions
  public uriHelper: UriHelper

  constructor (options: ProductGroupsOptions, http: Client) {
    super(http, {
      endpoint: ProductGroups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ProductGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: ProductGroupsQuery | undefined): Promise<ProductGroupsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ProductGroupsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductGroupsFetchFailed(error.message, { error })
    }
  }

  async get (
    productGroupId: string,
    queryOrOptions?: ProductGroupsQuery | undefined
  ): Promise<ProductGroupResponse> {
    const base = this.uriHelper.generateBaseUri(`/${productGroupId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.ProductGroupFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as ProductGroup,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductGroupFetchFailed(error.message, { error })
    }
  }

  async put (productGroupId: string, productGroup: ProductGroup): Promise<ProductGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productGroupId}`)

    try {
      const response = await this.http.getClient().put(uri, productGroup)

      return {
        data: response.data.results[0] as ProductGroup,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductGroupPutFailed(error.message, { error })
    }
  }

  async create (productGroup: ProductGroup): Promise<ProductGroupResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, productGroup)

      return {
        data: response.data.results[0] as ProductGroup,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductGroupCreationFailed(error.message, { error })
    }
  }

  async bulkCreate (ProductGroups: ProductGroup[]): Promise<ProductGroupsBulkResponse> {
    const base = this.uriHelper.generateBaseUri('/bulk_create') // TODO: adjust this
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().post(uri, ProductGroups)
      if (![200, 409].includes(response.status)) {
        throw new ProductGroupBulkCreationFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        data: {
          updated_product_groups: response.data.updated_product_groups,
          invalid_product_groups: response.data.invalid_product_groups,
          created_product_groups: response.data.created_product_groups
        },
        metadata: {
          count: response.data.count
        }
      }
    } catch (error: any) {
      throw new ProductGroupBulkCreationFailed(error.message, { error })
    }
  }

  async delete (taxId: string): Promise<ProductGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${taxId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.ProductGroupDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.ProductGroupDeleteFailed()
    }
  }

  async search (searchTerm: string): Promise<ProductGroupsResponse> {
    const base = this.uriHelper.generateBaseUri('/search')
    const uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm })
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ProductGroupsSearchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductGroupsSearchFailed(error.message, { error })
    }
  }
}

export class ProductGroupBulkCreationFailed extends errors.BaseError {
  public name = 'ProductGroupBulkCreationFailed'
  constructor (
    public message: string = 'Could not bulk create the product groups',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductGroupBulkCreationFailed.prototype)
  }
}
