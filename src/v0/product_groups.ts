import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

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
  data: ProductGroup
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface ProductGroup {
  id?: string
}

export interface ProductGroup {
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

  constructor (options: ProductGroupsOptions, http: Client) {
    super(http, {
      endpoint: ProductGroups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ProductGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
  }

  getAll (queryOrOptions?: ProductGroupsQuery | undefined): Promise<ProductGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions?.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.ProductGroupsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as ProductGroupsResponse)
      } catch (error) {
        return reject(new errors.ProductGroupsFetchFailed(undefined, { error }))
      }
    })
  }

  get (
    productGroupId: string,
    queryOrOptions?: ProductGroupsQuery | undefined
  ): Promise<ProductGroupResponse> {
    return new Promise(async (resolve, reject) => {
      let uri
      if (queryOrOptions?.uri) {
        uri = queryOrOptions.uri
      } else {
        let queryString = ''
        if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
          queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
        }

        uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productGroupId}${
          queryString ? `?${queryString}` : ''
        }`
      }

      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.ProductGroupFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ProductGroup,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductGroupResponse)
      } catch (error) {
        return reject(new errors.ProductGroupFetchFailed(undefined, { error }))
      }
    })
  }

  put (productGroupId: string, productGroup: ProductGroup): Promise<ProductGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productGroupId}`
      try {
        const response = await this.http.getClient().put(uri, productGroup)

        return resolve({
          data: response.data.results[0] as ProductGroup,
          metadata: { count: response.data.count }
        } as ProductGroupResponse)
      } catch (error) {
        return reject(new errors.ProductGroupPutFailed(undefined, { error }))
      }
    })
  }

  create (productGroup: ProductGroup): Promise<ProductGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, productGroup)

        return resolve({
          data: response.data.results[0] as ProductGroup,
          metadata: { count: response.data.count }
        } as ProductGroupResponse)
      } catch (error) {
        return reject(new errors.ProductGroupCreationFailed(undefined, { error }))
      }
    })
  }

  delete (taxId: string): Promise<ProductGroupResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${taxId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.ProductGroupDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ProductGroupResponse)
      } catch (err) {
        return reject(new errors.ProductGroupDeleteFailed())
      }
    })
  }

  search (searchTerm: string): Promise<ProductGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/search?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(
            new errors.ProductGroupsSearchFailed(undefined, { status: response.status })
          )
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductGroupsResponse)
      } catch (error) {
        return reject(new errors.ProductGroupsSearchFailed(undefined, { error }))
      }
    })
  }
}
