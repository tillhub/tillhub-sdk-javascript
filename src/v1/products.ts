import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper, HandlerQuery } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { Pricebooks } from './pricebooks'
import { PricebookEntries } from './pricebook-entries'

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

export interface ProductsOptions {
  user?: string
  base?: string
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    extended?: boolean
    [key: string]: any
  }
}

export interface ProductDeleteOptions {
  delete_dependencies?: boolean
}

export interface ProductsResponse {
  data?: Product[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<ProductsResponse>
}

export interface ProductsBulkResponse {
  results?: {
    updated_products?: Product[]
    invalid_products?: Product[]
    count?: number
  }
  msg?: string
}

export interface ProductResponse {
  data: Product
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface ProductsCreateQuery {
  product_id_template?: string
  generate_product_id?: boolean
}

export interface HandlerProductsQuery extends HandlerQuery {
  query?: ProductsCreateQuery
}

export interface ProductsUpdateRequestObject {
  productId: string
  body: Product
}

export interface SearchQuery {
  q: string
  types?: ProductTypes[]
}

export interface BookStockQuery {
  productId: string
  body: BookStock
}
export interface BookStock {
  location: string
  qty: number
}

export interface BarcodeResponse {
  barcode?: string
  id?: string
  name?: string
  codes?: Array<Record<string, unknown>>
}

export class Products extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/products'
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

  async create (product: Product, query?: HandlerProductsQuery): Promise<ProductResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().post(uri, product)
      if (response.status !== 200) {
        throw new ProductsCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error) {
      throw new ProductsCreateFailed(undefined, { error })
    }
  }

  async getAll (options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<ProductsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new ProductsFetchFailed(undefined, { error })
    }
  }

  async import (options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/import')
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductsImportFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<ProductsResponse> => this.import({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new ProductsImportFailed(undefined, { error })
    }
  }

  async get (productId: string): Promise<ProductResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Product,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductFetchFailed(undefined, { error })
    }
  }

  async getDetails (productId: string): Promise<ProductResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productId}/details`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductDetailsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Product,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductDetailsFetchFailed(undefined, { error })
    }
  }

  async getChildrenDetails (productId: string): Promise<ProductResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productId}/children/details`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductChildrenDetailsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductChildrenDetailsFetchFailed(undefined, { error })
    }
  }

  async meta (): Promise<ProductsResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductsMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new ProductsMetaFailed('could not get product metadata unexpectedly', {
          status: response.status
        })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductsMetaFailed(undefined, { error })
    }
  }

  async put (productId: string, product: Product): Promise<ProductResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productId}`)

    try {
      const response = await this.http.getClient().put(uri, product)
      if (response.status !== 200) {
        throw new ProductsUpdateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductsUpdateFailed(undefined, { error })
    }
  }

  async bulkCreate (products: Product[], query?: HandlerProductsQuery): Promise<ProductsBulkResponse> {
    const base = this.uriHelper.generateBaseUri('/bulk_create')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().post(uri, products)
      if (![200, 422].includes(response.status)) {
        throw new ProductsBulkCreateFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg,
        results: {
          invalid_products: response.data.invalidProducts,
          updated_products: response.data.updatedProducts,
          count: response.data.count
        }
      }
    } catch (error) {
      throw new ProductsBulkCreateFailed(undefined, { error })
    }
  }

  async bulkEdit (products: Product[]): Promise<ProductsResponse> {
    const uri = this.uriHelper.generateBaseUri('/bulk')

    try {
      const response = await this.http.getClient().put(uri, products)
      if (![200, 202].includes(response.status)) {
        throw new ProductsBulkEditFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductsBulkEditFailed(undefined, { error })
    }
  }

  async count (): Promise<ProductsResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductsCountFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductsCountFailed(undefined, { error })
    }
  }

  async delete (productId: string, deleteOptions?: ProductDeleteOptions): Promise<ProductsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${productId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, deleteOptions)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new ProductsDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error) {
      throw new ProductsDeleteFailed(undefined, { error })
    }
  }

  async search (query: SearchQuery | string): Promise<ProductsResponse> {
    const _query: SearchQuery = typeof query === 'string' ? { q: query } : query

    const base = this.uriHelper.generateBaseUri('/search')
    const uri = this.uriHelper.generateUriWithQuery(base, _query)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductsSearchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new ProductsSearchFailed(undefined, { error })
    }
  }

  async bookStock (requestOptions: BookStockQuery): Promise<ProductResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${requestOptions.productId}/stock/book`)
    try {
      const response = await this.http.getClient().post(uri, requestOptions.body)
      if (response.status !== 200) {
        throw new ProductsBookStockFailed()
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new ProductsBookStockFailed()
    }
  }

  async checkBarcode (code: string): Promise<ProductResponse> {
    const base = this.uriHelper.generateBaseUri('/barcode')
    const uri = this.uriHelper.generateUriWithQuery(base, { code })

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new BarcodeGetFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results as BarcodeResponse,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        throw new BarcodeGetFailed(undefined, {
          status: error.response.status,
          name: error.response.data.name,
          data: error.response.data.results
        })
      }
      throw new BarcodeGetFailed(undefined, { error })
    }
  }

  pricebooks (): Pricebooks {
    return new Pricebooks(this.options, this.http, this.uriHelper)
  }

  pricebookEntries (): PricebookEntries {
    return new PricebookEntries(this.options, this.http, this.uriHelper)
  }
}

export class ProductsCreateFailed extends BaseError {
  public name = 'ProductsCreateFailed'
  constructor (
    public message: string = 'Could not create the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsCreateFailed.prototype)
  }
}

export class ProductFetchFailed extends BaseError {
  public name = 'ProductFetchFailed'
  constructor (
    public message: string = 'Could not fetch the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductFetchFailed.prototype)
  }
}
export class ProductsFetchFailed extends BaseError {
  public name = 'ProductsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsFetchFailed.prototype)
  }
}
export class ProductsImportFailed extends BaseError {
  public name = 'ProductsImportFailed'
  constructor (
    public message: string = 'Could not import the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsImportFailed.prototype)
  }
}

export class ProductDetailsFetchFailed extends BaseError {
  public name = 'ProductDetailsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the details of the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductDetailsFetchFailed.prototype)
  }
}
export class ProductChildrenDetailsFetchFailed extends BaseError {
  public name = 'ProductChildrenDetailsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the details of the children products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductChildrenDetailsFetchFailed.prototype)
  }
}

export class ProductsCountFailed extends BaseError {
  public name = 'ProductsCountFailed'
  constructor (
    public message: string = 'Could not count the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsCountFailed.prototype)
  }
}

export class ProductsMetaFailed extends BaseError {
  public name = 'ProductsMetaFailed'
  constructor (
    public message: string = 'Could not get products metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsMetaFailed.prototype)
  }
}

export class ProductsUpdateFailed extends BaseError {
  public name = 'ProductsUpdateFailed'
  constructor (
    public message: string = 'Could not update the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsUpdateFailed.prototype)
  }
}

export class ProductsBulkCreateFailed extends BaseError {
  public name = 'ProductsBulkCreateFailed'
  constructor (
    public message: string = 'Could not bulk create the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBulkCreateFailed.prototype)
  }
}

export class ProductsBulkEditFailed extends BaseError {
  public name = 'ProductsBulkEditFailed'
  constructor (
    public message: string = 'Could not bulk edit the products',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBulkEditFailed.prototype)
  }
}

export class ProductsDeleteFailed extends BaseError {
  public name = 'ProductsDeleteFailed'
  constructor (
    public message: string = 'Could not delete the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsDeleteFailed.prototype)
  }
}

export class ProductsSearchFailed extends BaseError {
  public name = 'ProductsSearchFailed'
  constructor (
    public message: string = 'Could not search for the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsSearchFailed.prototype)
  }
}

export class ProductsBookStockFailed extends BaseError {
  public name = 'ProductsBookStockFailed'
  constructor (
    public message: string = 'Could not book stock for the product',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBookStockFailed.prototype)
  }
}

export class BarcodeGetFailed extends BaseError {
  public name = 'BarcodeGetFailed'
  constructor (
    public message: string = 'Could not check for barcode collision',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BarcodeGetFailed.prototype)
  }
}
