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
  custom_id?: string | null
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
  location?: string
  extended?: boolean
  [key: string]: any
}

export interface ProductsOptions {
  user?: string
  base?: string
  limit?: number
  uri?: string
  query?: ProductsQuery
}

export interface ProductResponse {
  data: Product[]
  status?: string
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface BulkBookStockQuery {
  body: BulkBookStockBody
}

export interface BulkBookStockBody {
  location: string
  consignmentNoteNumber: string
  purchaseOrderId: string
  reason: string
  items: BookStock[]
}

export interface BookStock {
  productId: string
  qty: number
}

export class Products extends ThBaseHandler {
  public static baseEndpoint = '/api/v4/products'
  endpoint: string
  http: Client
  public options: ProductsOptions
  public uriHelper: UriHelper

  constructor(options: ProductsOptions, http: Client) {
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

  async bulkBookStock(requestOptions: BulkBookStockQuery): Promise<ProductResponse> {
    const uri = this.uriHelper.generateBaseUri(`/stock/book/bulk`)
    try {
      const response = await this.http.getClient().post(uri, requestOptions.body)
      if (response.status !== 200) throw new ProductsBulkBookStockFailed()

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new ProductsBulkBookStockFailed(error.message, { error })
    }
  }
}

export class ProductsBulkBookStockFailed extends BaseError {
  public name = 'ProductsBulkBookStockFailed'
  constructor(
    public message: string = 'Could not bulk book stock for the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBulkBookStockFailed.prototype)
  }
}
