import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

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
}

export interface ProductsOptions {
  user?: string
  base?: string
}

export interface ProductsResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface ProductsOptions {
  limit?: number
  uri?: string
  query?: any
}

export interface ProductsUpdateRequestObject {
  productId: string
  body: Product
}

export class Products {
  endpoint: string
  http: Client
  public options: ProductsOptions

  constructor(options: ProductsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/products'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  create(product: Product): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, product)
        response.status !== 200 && reject(new errors.ProductsCreateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductsCreateFailed())
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
        response.status !== 200 && reject(new errors.ProductsFetchFailed())

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductsFetchFailed())
      }
    })
  }

  getOne(productId: string): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.ProductFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductFetchFailed())
      }
    })
  }

  update(requestObject: ProductsUpdateRequestObject): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, productId } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}`

      try {
        const response = await this.http.getClient().put(uri, body)
        response.status !== 200 && reject(new errors.ProductsUpdateFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductsUpdateFailed())
      }
    })
  }

  count(): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.ProductsCountFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductsCountFailed())
      }
    })
  }

  delete(productId: string): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.ProductsDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductsDeleteFailed())
      }
    })
  }

  search(searchTerm: string): Promise<ProductsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/search?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.ProductsSearchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductsResponse)
      } catch (err) {
        return reject(new errors.ProductsSearchFailed())
      }
    })
  }
}
