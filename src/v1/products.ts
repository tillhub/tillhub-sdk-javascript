import qs from 'qs'
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
}

export interface Product {
  name?: string
  description?: string | null
  attributes?: object | null
  parent?: string | null
  tags?: any[] | null
  linked_products?: any[] | null
  prices?: object
  barcode?: string | null
  codes?: any[] | null
  sku?: string | null
  stock_minimum?: number | null
  stock_maximum?: number | null
  stockable?: boolean | null
  metadata?: object | null
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
  taxes_options?: any[] | object | null
  season?: string | null
  seasons?: object | null
  account?: string
  vat_class?: string | null
  category?: string | null
  brand?: string | null
  active?: boolean
  deleted?: boolean
  type?: ProductTypes
  manufacturer?: object | null
  supplier?: object | null
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
  stock_info?: object | null
  i18n?: object | null
  is_service?: boolean
  delegateable?: boolean
  delegateable_to?: object[]
  delegated_from?: object
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
  data: Product[]
  metadata: object
  msg?: string
  next?: () => Promise<ProductsResponse>
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
  errorDetails: object
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
  types?: string[]
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
  codes?: object[]
}

export class Products extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/products'
  endpoint: string
  http: Client
  public options: ProductsOptions
  public uriHelper: UriHelper

  constructor(options: ProductsOptions, http: Client) {
    super(http, { endpoint: Products.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Products.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  create(product: Product, query?: HandlerProductsQuery): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      try {
        const response = await this.http.getClient().post(uri, product)
        if (response.status !== 200) {
          return reject(new ProductsCreateFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count },
          errors: response.data.errors || []
        } as ProductResponse)
      } catch (error) {
        return reject(new ProductsCreateFailed(undefined, { error }))
      }
    })
  }

  getAll(options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, options)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ProductsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsFetchFailed(undefined, { error }))
      }
    })
  }

  import(options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (options && options.uri) {
          uri = options.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/import${
            options && options.query ? `?${qs.stringify(options.query)}` : ''
            }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductsImportFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ProductsResponse> => this.import({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsImportFailed(undefined, { error }))
      }
    })
  }

  get(productId: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${productId}`)
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0] as Product,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new ProductFetchFailed(undefined, { error }))
      }
    })
  }

  getDetails(productId: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${productId}/details`)
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(
            new ProductDetailsFetchFailed(undefined, { status: response.status })
          )
        }

        return resolve({
          data: response.data.results[0] as Product,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new ProductDetailsFetchFailed(undefined, { error }))
      }
    })
  }

  getChildrenDetails(productId: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${productId}/children/details`)
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(
            new ProductChildrenDetailsFetchFailed(undefined, { status: response.status })
          )
        }

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new ProductChildrenDetailsFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri('/meta')

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductsMetaFailed(undefined, { status: response.status }))
        }
        if (!response.data.results[0]) {
          return reject(
            new ProductsMetaFailed('could not get product metadata unexpectedly', {
              status: response.status
            })
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsMetaFailed(undefined, { error }))
      }
    })
  }

  put(productId: string, product: Product): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${productId}`)

      try {
        const response = await this.http.getClient().put(uri, product)
        if (response.status !== 200) {
          return reject(new ProductsUpdateFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new ProductsUpdateFailed(undefined, { error }))
      }
    })
  }

  bulkEdit(products: Product[]): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri('/bulk')

      try {
        const response = await this.http.getClient().put(uri, products)
        if ([200, 202].includes(response.status) === false) {
          return reject(new ProductsBulkEditFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsBulkEditFailed(undefined, { error }))
      }
    })
  }

  count(): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri('/meta')

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductsCountFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsCountFailed(undefined, { error }))
      }
    })
  }

  delete(productId: string, deleteOptions?: ProductDeleteOptions): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (deleteOptions) {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}?${qs.stringify(deleteOptions)}`
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}`
        }

        const response = await this.http.getClient().delete(uri)
        if (response.status !== 200) {
          return reject(new ProductsDeleteFailed(undefined, { status: response.status }))
        }

        return resolve({
          msg: response.data.msg
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsDeleteFailed(undefined, { error }))
      }
    })
  }

  search(query: SearchQuery): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri('/search')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductsSearchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new ProductsSearchFailed(undefined, { error }))
      }
    })
  }

  bookStock(requestOptions: BookStockQuery): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/${requestOptions.productId}/stock/book`)
      try {
        const response = await this.http.getClient().post(uri, requestOptions.body)
        response.status !== 200 && reject(new ProductsBookStockFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (err) {
        return reject(new ProductsBookStockFailed())
      }
    })
  }

  checkBarcode(code: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri('/barcode')
      const uri = this.uriHelper.generateUriWithQuery(base, { code })

      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new BarcodeGetFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results as BarcodeResponse,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return reject(
            new BarcodeGetFailed(undefined, {
              status: error.response.status,
              name: error.response.data.name,
              data: error.response.data.results
            })
          )
        }
        return reject(new BarcodeGetFailed(undefined, { error }))
      }
    })
  }

  pricebooks(): Pricebooks {
    return new Pricebooks(this.options, this.http, this.uriHelper)
  }

  pricebookEntries(): PricebookEntries {
    return new PricebookEntries(this.options, this.http, this.uriHelper)
  }
}

export class ProductsCreateFailed extends BaseError {
  public name = 'ProductsCreateFailed'
  constructor(public message: string = 'Could not create the product', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsCreateFailed.prototype)
  }
}

export class ProductFetchFailed extends BaseError {
  public name = 'ProductFetchFailed'
  constructor(public message: string = 'Could not fetch the product', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductFetchFailed.prototype)
  }
}
export class ProductsFetchFailed extends BaseError {
  public name = 'ProductsFetchFailed'
  constructor(public message: string = 'Could not fetch the products', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsFetchFailed.prototype)
  }
}
export class ProductsImportFailed extends BaseError {
  public name = 'ProductsImportFailed'
  constructor(public message: string = 'Could not import the products', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsImportFailed.prototype)
  }
}

export class ProductDetailsFetchFailed extends BaseError {
  public name = 'ProductDetailsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the details of the product',
    properties?: any
    ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductDetailsFetchFailed.prototype)
  }
}
export class ProductChildrenDetailsFetchFailed extends BaseError {
  public name = 'ProductChildrenDetailsFetchFailed'
  constructor(
    public message: string = 'Could not fetch the details of the children products',
    properties?: any
    ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductChildrenDetailsFetchFailed.prototype)
  }
}

export class ProductsCountFailed extends BaseError {
  public name = 'ProductsCountFailed'
  constructor(public message: string = 'Could not count the products', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsCountFailed.prototype)
  }
}

export class ProductsMetaFailed extends BaseError {
  public name = 'ProductsMetaFailed'
  constructor(public message: string = 'Could not get products metadata', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsMetaFailed.prototype)
  }
}

export class ProductsUpdateFailed extends BaseError {
  public name = 'ProductsUpdateFailed'
  constructor(public message: string = 'Could not update the product', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsUpdateFailed.prototype)
  }
}

export class ProductsBulkEditFailed extends BaseError {
  public name = 'ProductsBulkEditFailed'
  constructor(public message: string = 'Could not bulk edit the products', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBulkEditFailed.prototype)
  }
}

export class ProductsDeleteFailed extends BaseError {
  public name = 'ProductsDeleteFailed'
  constructor(public message: string = 'Could not delete the product', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsDeleteFailed.prototype)
  }
}

export class ProductsSearchFailed extends BaseError {
  public name = 'ProductsSearchFailed'
  constructor(public message: string = 'Could not search for the product', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsSearchFailed.prototype)
  }
}

export class ProductsBookStockFailed extends BaseError {
  public name = 'ProductsBookStockFailed'
  constructor(public message: string = 'Could not book stock for the product', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductsBookStockFailed.prototype)
  }
}

export class BarcodeGetFailed extends BaseError {
  public name = 'BarcodeGetFailed'
  constructor(public message: string = 'Could not check for barcode collision', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, BarcodeGetFailed.prototype)
  }
}
