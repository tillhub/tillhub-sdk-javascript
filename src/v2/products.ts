import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface Images {
  '1x'?: string
  avatar?: string
}

type ProductTypes =
  | 'product'
  | 'voucher'
  | 'linked'
  | 'linked_product'
  | 'variant'
  | 'variant_product'

export interface Product {
  id?: string
  name?: string
  description?: string | null
  attributes?: Record<string, unknown> | null
  parent?: string | null
  parent_custom_id?: string | null
  tags?: any[] | null
  linked_products?: any[] | null
  prices?: Record<string, unknown>
  barcode?: string | null
  codes?: any[] | null
  sku?: string | null
  stock_minimum?: number | null
  stock_maximum?: number | null
  stockable?: boolean | null
  metadata?: Record<string, unknown> | null
  audiences?: any[] | null
  keywords?: any[] | null
  categories?: any[] | null
  related_to?: any[] | null
  similar_to?: any[] | null
  released_at?: string | null
  purchased_at?: string | null
  produced_at?: string | null
  custom_id?: string | string[] | null
  children?: Product[]
  tax?: string
  taxes_options?: any[] | Record<string, unknown> | null
  season?: string | null
  seasons?: Record<string, unknown> | null
  account?: string
  vat_class?: string | null
  category?: string | null
  brand?: string | null
  active?: boolean
  deleted?: boolean
  type?: ProductTypes
  manufacturer?: Record<string, unknown> | null
  supplier?: Record<string, unknown> | null
  condition?: string | null
  images?: Images | null
  summary?: string | null
  insert_id?: number
  product_group?: string | null
  delegated_to?: string[] | null
  stock_mode?: string | null
  stock_configuration_location?: StockConfigurationLocation | null
  reorder_point?: number | null
  reorder_qty?: number | null
  locations?: string[] | null
  stock_info?: Record<string, unknown> | null
  i18n?: Record<string, unknown> | null
  is_service?: boolean
  delegateable?: boolean
  delegateable_to?: Array<Record<string, unknown>>
  delegated_from?: Record<string, unknown>
}

export interface StockConfigurationLocation {
  location?: string | null
  stockable?: boolean | null
  stock_minimum?: number | null
  reorder_qty?: number | null
  reorder_point?: number | null
}

export interface ProductsQuery {
  deleted?: boolean
  active?: boolean
  exclude_system_products?: boolean
  location?: string | string[]
  extended?: boolean
  [key: string]: any
}

const ProductQueryBodyKeys = new Set<string>([
  'location',
  'locations',
  'branch_group',
  'product_group',
  'product_ids',
  'custom_id',
  'business_partner_id',
  'tag',
  'tags',
  'type',
  'types',
  'linked_product_id',
  'client',
  'purchase_order_id',
  'field',
  'include',
  'exclude'
])

export interface ProductsOptions {
  user?: string
  base?: string
  limit?: number
  offset?: number
  uri?: string
  query?: ProductsQuery
}

export interface ProductsResponse {
  data?: Product[]
  metaData?: Record<string, unknown>
  msg?: string
  next?: () => Promise<ProductsResponse>
}

export interface ProductsBulkImportResponse {
  msg?: string
}

export interface ProductsBulkImportRequestObject {
  preferUpdate: boolean
  products: Product[]
}

export class Products extends ThBaseHandler {
  public static baseEndpoint = '/api/v2/products'
  endpoint: string
  http: Client
  public options: ProductsOptions
  public uriHelper: UriHelper

  constructor (options: ProductsOptions, http: Client) {
    super(http, {
      endpoint: Products.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Products.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new ProductsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metaData: { count: response.data.pagination?.total || 0, pagination: response.data.pagination }
      }
    } catch (error: any) {
      throw new ProductsFetchFailed(error.message, { error })
    }
  }

  async query (options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    let next

    const splitBodyAndQuery = (flat: Record<string, unknown>): {
      body: Record<string, unknown>
      query: Record<string, unknown>
    } => {
      const body: Record<string, unknown> = {}
      const query: Record<string, unknown> = {}
      for (const key of Object.keys(flat)) {
        if (ProductQueryBodyKeys.has(key)) {
          body[key] = flat[key]
        } else {
          query[key] = flat[key]
        }
      }
      return { body, query }
    }

    try {
      let flat = { ...(options ?? {}) }
      if (flat.query) {
        flat = { ...flat, ...flat.query }
        delete flat.query
      }

      const { body, query } = splitBodyAndQuery(flat)
      const base = this.uriHelper.generateBaseUri('/query')
      const uri = this.uriHelper.generateUriWithQuery(
        base,
        Object.keys(query).length > 0 ? { query } : undefined
      )

      const response = await this.http.getClient().post(uri, body)
      if (response.status !== 200) {
        throw new ProductsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.count > 0 && response.data.count === response.data.pagination?.limit) {
        next = (): Promise<ProductsResponse> => this.query({
          ...options,
          offset: Number(response.data.pagination?.offset ?? 0) + Number(response.data.pagination.limit)
        })
      }

      return {
        data: response.data.results,
        metaData: { count: response.data.count || 0, pagination: response.data.pagination },
        next
      }
    } catch (error: any) {
      throw new ProductsFetchFailed(error.message, { error })
    }
  }

  async bulkImport (payload: ProductsBulkImportRequestObject): Promise<ProductsBulkImportResponse> {
    const uri = this.uriHelper.generateBaseUri('/bulk')

    try {
      const response = await this.http.getClient().post(uri, payload)

      if (![200, 202].includes(response.status)) {
        throw new ProductsBulkImportFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ProductsBulkImportFailed(error.message, { error })
    }
  }
}

export class ProductsBulkImportFailed extends BaseError {
  public name = 'ProductsBulkImportFailed'
  constructor (
    public message: string = 'Could not bulk import products.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBulkImportFailed.prototype)
  }
}

export class ProductsFetchFailed extends BaseError {
  public name = 'ProductsFetchFailed'
  constructor (
    public message: string = 'Could not fetch products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsFetchFailed.prototype)
  }
}
