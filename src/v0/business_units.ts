import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface BusinessUnitsOptions {
  user?: string
  base?: string
}

export interface BusinessUnitsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    extended?: boolean
  }
}

export interface BusinessUnitsResponse {
  data: BusinessUnit[]
  metadata: Record<string, unknown>
  next?: () => Promise<BusinessUnitsResponse>
}

export interface BusinessUnit {
  id?: string
  name?: string | null
  salesStream?: SaleStream[] | null
}

export interface SaleStream {
  id?: string
  terminalId?: string | null
}

export class BusinessUnits extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/business-units'
  endpoint: string
  http: Client
  public options: BusinessUnitsOptions
  public uriHelper: UriHelper

  constructor (options: BusinessUnitsOptions, http: Client) {
    super(http, {
      endpoint: BusinessUnits.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = BusinessUnits.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: BusinessUnitsQuery | undefined): Promise<BusinessUnitsResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new BusinessUnitsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<BusinessUnitsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new BusinessUnitsFetchFailed(error.message, { error })
    }
  }
}

export class BusinessUnitsFetchFailed extends BaseError {
  public name = 'BusinessUnitsFetchFailed'
  constructor (
    public message: string = 'Could not fetch business units',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BusinessUnitsFetchFailed.prototype)
  }
}
