import { Client } from '../client'
import * as errors from '../errors'

export interface ProductGroupsOptions {
  user?: string
  base?: string
}

export interface ProductGroupsQuery {
  limit?: number
  uri?: string
}

export interface ProductGroupsResponse {
  data: object[]
  metadata: object
}

export class ProductGroups {
  endpoint: string
  http: Client
  public options: ProductGroupsOptions

  constructor(options: ProductGroupsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/product_groups'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: ProductGroupsQuery | undefined): Promise<ProductGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductGroupsResponse)
      } catch (err) {
        return reject(new errors.ProductGroupsFetchFailed())
      }
    })
  }
}
