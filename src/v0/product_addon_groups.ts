import { Client } from '../client'
import * as errors from '../errors/productAddonGroups'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ProductAddonGroupOptions {
  user?: string
  base?: string
}

export interface ProductAddonGroupsQuery {
  q?: string
  name?: string
  addon_name?: string
  addon?: string
  multiselect?: string
  skippable?: string
  deleted?: boolean
  active?: boolean
  uri?: string
}

export interface ProductAddonGroupResponse {
  data?: ProductAddonGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ProductAddonGroupsResponse {
  data: ProductAddonGroup[]
  metadata: Record<string, unknown>
  next?: () => Promise<ProductAddonGroupsResponse>
}

export interface PriceChange {
  currency: string
  amount: number
}

export interface ProductAddonGroup {
  name: string
  multiselect: boolean
  max_selected?: number
  skippable: boolean
  active: boolean
  deleted?: boolean
}

export class ProductAddonGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_addon_groups'
  endpoint: string
  http: Client
  public options: ProductAddonGroupOptions
  public uriHelper: UriHelper

  constructor (options: ProductAddonGroupOptions, http: Client) {
    super(http, { endpoint: ProductAddonGroups.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ProductAddonGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ProductAddonGroupsQuery | undefined): Promise<ProductAddonGroupsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ProductAddonGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.ProductAddonGroupsFetchAllFailed(error.message, { error })
    }
  }

  async get (productAddonGroupId: string): Promise<ProductAddonGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${productAddonGroupId}`)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.ProductAddonGroupFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonGroupFetchOneFailed(error.message, { error })
    }
  }

  async meta (): Promise<ProductAddonGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.ProductAddonGroupsGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonGroupsGetMetaFailed(error.message, { error })
    }
  }

  async create (productAddonGroup: ProductAddonGroup): Promise<ProductAddonGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, productAddonGroup)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonGroupCreationFailed(error.message, { error })
    }
  }

  async put (productAddonGroupId: string, productAddonGroup: ProductAddonGroup): Promise<ProductAddonGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${productAddonGroupId}`)
      const response = await this.http.getClient().put(uri, productAddonGroup)
      if (response.status !== 200) { throw new errors.ProductAddonGroupPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonGroupPutFailed(error.message, { error })
    }
  }

  async delete (productAddonGroupId: string): Promise<ProductAddonGroupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productAddonGroupId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.ProductAddonGroupDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.ProductAddonGroupDeleteFailed()
    }
  }
}
