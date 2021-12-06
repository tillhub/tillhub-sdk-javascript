import { Client } from '../client'
import * as errors from '../errors/productAddons'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ProductAddonOptions {
  user?: string
  base?: string
}

export interface ProductAddonQuery {
  q?: string
  name?: string
  product_name?: number
  addon_group_name?: string
  product?: string
  addon_group?: string
  deleted?: boolean
  active?: boolean
  uri?: string
}

export interface ProductAddonResponse {
  data?: ProductAddon
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ProductAddonsResponse {
  data: ProductAddon[]
  metadata: Record<string, unknown>
  next?: () => Promise<ProductAddonsResponse>
}

export interface PriceChange {
  amount: number
  currency: string
}

export interface ProductAddon {
  name?: string
  addon_group?: string
  product?: string
  price_change?: PriceChange[]
  stock_quantity: number
  add_to_cart: boolean
  allow_quantity_edit: boolean
  max_quantity: number
  order_index: number
  active: boolean
  deleted?: boolean
}

export class ProductAddons extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_addons'
  endpoint: string
  http: Client
  public options: ProductAddonOptions
  public uriHelper: UriHelper

  constructor (options: ProductAddonOptions, http: Client) {
    super(http, { endpoint: ProductAddons.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ProductAddons.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: ProductAddonQuery | undefined): Promise<ProductAddonsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ProductAddonsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.ProductAddonsFetchAllFailed(undefined, { error })
    }
  }

  async get (productAddonId: string): Promise<ProductAddonResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${productAddonId}`)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.ProductAddonFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonFetchOneFailed(undefined, { error })
    }
  }

  async meta (): Promise<ProductAddonsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.ProductAddonsGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonsGetMetaFailed(undefined, { error })
    }
  }

  async create (productAddon: ProductAddon): Promise<ProductAddonResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, productAddon)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonCreationFailed(undefined, { error })
    }
  }

  async put (productAddonId: string, productAddon: ProductAddon): Promise<ProductAddonResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${productAddonId}`)
      const response = await this.http.getClient().put(uri, productAddon)
      if (response.status !== 200) { throw new errors.ProductAddonPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductAddonPutFailed(undefined, { error })
    }
  }

  async delete (productAddonId: string): Promise<ProductAddonResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productAddonId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.ProductAddonDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err: any) {
      throw new errors.ProductAddonDeleteFailed()
    }
  }
}
