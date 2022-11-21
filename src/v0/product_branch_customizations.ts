import { Client } from '../client'
import * as errors from '../errors/productBranchCustomizations'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ProductBranchCustomizationOptions {
  user?: string
  base?: string
}

export interface ProductBranchCustomizationQuery {
  product?: string
  deleted?: boolean
  active?: boolean
  uri?: string
}

export interface ProductBranchCustomizationResponse {
  data?: ProductBranchCustomization
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ProductBranchCustomizationsResponse {
  data: ProductBranchCustomization[]
  metadata: Record<string, unknown>
  next?: () => Promise<ProductBranchCustomizationsResponse>
}

export interface ProductBranchCustomization {
  product?: string
  name?: string
  description?: string
  summary?: string
  default_tile_color?: string
  branches?: string[]
  branch_groups?: string[]
  active?: boolean
  deleted?: boolean
}

export class ProductBranchCustomizations extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_branch_customizations'
  endpoint: string
  http: Client
  public options: ProductBranchCustomizationOptions
  public uriHelper: UriHelper

  constructor (options: ProductBranchCustomizationOptions, http: Client) {
    super(http, { endpoint: ProductBranchCustomizations.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ProductBranchCustomizations.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ProductBranchCustomizationQuery | undefined): Promise<ProductBranchCustomizationsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ProductBranchCustomizationsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.ProductBranchCustomizationsFetchAllFailed(error.message, { error })
    }
  }

  async get (productBranchCustomizationId: string): Promise<ProductBranchCustomizationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${productBranchCustomizationId}`)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.ProductBranchCustomizationFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductBranchCustomizationFetchOneFailed(error.message, { error })
    }
  }

  async create (productBranchCustomization: ProductBranchCustomization): Promise<ProductBranchCustomizationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, productBranchCustomization)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductBranchCustomizationCreationFailed(error.message, { error })
    }
  }

  async put (productBranchCustomizationId: string, productBranchCustomization: ProductBranchCustomization): Promise<ProductBranchCustomizationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${productBranchCustomizationId}`)
      const response = await this.http.getClient().put(uri, productBranchCustomization)
      if (response.status !== 200) { throw new errors.ProductBranchCustomizationPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductBranchCustomizationPutFailed(error.message, { error })
    }
  }

  async delete (productBranchCustomizationId: string): Promise<ProductBranchCustomizationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productBranchCustomizationId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.ProductBranchCustomizationDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.ProductBranchCustomizationDeleteFailed()
    }
  }
}
