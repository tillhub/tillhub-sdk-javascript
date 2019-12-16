import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
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

export interface BookStockQuery {
  productId: string
  body: BookStock
}
export interface BookStock {
  location: string
  qty: number
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
          return reject(new errors.ProductsCreateFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count },
          errors: response.data.errors || []
        } as ProductResponse)
      } catch (error) {
        return reject(new errors.ProductsCreateFailed(undefined, { error }))
      }
    })
  }

  getAll(options?: ProductsOptions | undefined): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (options && options.uri) {
          uri = options.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            options && options.query ? `?${qs.stringify(options.query)}` : ''
            }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.ProductsFetchFailed(undefined, { status: response.status }))
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
        return reject(new errors.ProductsFetchFailed(undefined, { error }))
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
          return reject(new errors.ProductsImportFailed(undefined, { status: response.status }))
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
        return reject(new errors.ProductsImportFailed(undefined, { error }))
      }
    })
  }

  get(productId: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.ProductFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0] as Product,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new errors.ProductFetchFailed(undefined, { error }))
      }
    })
  }

  getDetails(productId: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}/details`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(
            new errors.ProductDetailsFetchFailed(undefined, { status: response.status })
          )
        }

        return resolve({
          data: response.data.results[0] as Product,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new errors.ProductDetailsFetchFailed(undefined, { error }))
      }
    })
  }

  getChildrenDetails(productId: string): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${
        this.options.user
        }/${productId}/children/details`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(
            new errors.ProductChildrenDetailsFetchFailed(undefined, { status: response.status })
          )
        }

        return resolve({
          data: response.data.results,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new errors.ProductChildrenDetailsFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.ProductsMetaFailed(undefined, { status: response.status }))
        }
        if (!response.data.results[0]) {
          return reject(
            new errors.ProductsMetaFailed('could not get product metadata unexpectedly', {
              status: response.status
            })
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new errors.ProductsMetaFailed(undefined, { error }))
      }
    })
  }

  put(productId: string, product: Product): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}`

      try {
        const response = await this.http.getClient().put(uri, product)
        if (response.status !== 200) {
          return reject(new errors.ProductsUpdateFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (error) {
        return reject(new errors.ProductsUpdateFailed(undefined, { error }))
      }
    })
  }

  count(): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.ProductsCountFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new errors.ProductsCountFailed(undefined, { error }))
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
          return reject(new errors.ProductsDeleteFailed(undefined, { status: response.status }))
        }

        return resolve({
          msg: response.data.msg
        } as ProductsResponse)
      } catch (error) {
        return reject(new errors.ProductsDeleteFailed(undefined, { error }))
      }
    })
  }

  search(searchTerm: string): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/search?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.ProductsSearchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (error) {
        return reject(new errors.ProductsSearchFailed(undefined, { error }))
      }
    })
  }

  bookStock(requestOptions: BookStockQuery): Promise<ProductResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${
        requestOptions.productId
        }/stock/book`
      try {
        const response = await this.http.getClient().post(uri, requestOptions.body)
        response.status !== 200 && reject(new errors.ProductsBookStockFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as ProductResponse)
      } catch (err) {
        return reject(new errors.ProductsBookStockFailed())
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
