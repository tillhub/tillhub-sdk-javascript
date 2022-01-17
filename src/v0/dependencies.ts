import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface DependenciesOptions {
  user?: string
  base?: string
}

export type DependenciesTypes = 'tax_account' | 'revenue_account' | 'product_group'

export interface DependenciesQuery {
  resource: string
  type: DependenciesTypes
}

export interface DependenciesResponse {
  data: Dependents[]
  metadata: Record<string, unknown>
}

export interface Dependents {
  products?: number
  product_groups?: number
  price_book_entries?: number
}

export class Dependencies extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/dependencies'
  endpoint: string
  http: Client
  public options: DependenciesOptions
  public uriHelper: UriHelper

  constructor (options: DependenciesOptions, http: Client) {
    super(http, {
      endpoint: Dependencies.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Dependencies.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (query: DependenciesQuery): Promise<DependenciesResponse> {
    const base = this.uriHelper.generateBaseUri('/')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new DependenciesFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DependenciesFetchFailed(error.message, { error })
    }
  }
}

export class DependenciesFetchFailed extends BaseError {
  public name = 'DependenciesFetchFailed'
  constructor (
    public message: string = 'Could not fetch the dependencies',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DependenciesFetchFailed.prototype)
  }
}
