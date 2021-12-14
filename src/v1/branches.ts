import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface BranchesOptions {
  user?: string
  base?: string
}

export interface BranchesQuery {
  limit?: number
  uri?: string
  q?: string
  start?: string
  active?: string
  deleted?: string
  name?: string
  branch_number?: string
  branch_group?: string
  postal_code?: string
  city?: string
  street?: string
}

export interface BranchesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<BranchesResponse>
}

export interface BranchResponse {
  data?: Branch
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Branch {
  id?: string
  created_at?: {
    iso: string
    unix: number
  }
  updated_at?: {
    iso: string
    unix: number
  }
  insert_id?: number
  metadata?: object
  email?: string
  name: string
  receipt_header?: string
  receipt_footer?: string
  receipt_logo?: string
  cid?: string
  addresses?: object[]
  active?: boolean
  deleted?: boolean
  images?: object
  branch_number?: number
  image?: string
  signing_configuration?: object
  custom_id?: string
  configuration?: string
  configurations?: object
  external_custom_id?: string
  currency_default?: string
  timezone_default?: string
  fa_account_nunmber?: string
  cost_center?: string
  custom_properties?: object
  default_favourite?: string
}

export class Branches extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/branches'
  endpoint: string
  http: Client
  public options: BranchesOptions
  public uriHelper: UriHelper

  constructor (options: BranchesOptions, http: Client) {
    super(http, {
      endpoint: Branches.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Branches.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: BranchesQuery | undefined): Promise<BranchesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new BranchesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<BranchesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new BranchesFetchFailed(undefined, { error })
    }
  }

  async get (branchId: string): Promise<BranchResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new BranchFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as Branch,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchFetchFailed(undefined, { error })
    }
  }
}

export class BranchFetchFailed extends BaseError {
  public name = 'BranchFetchFailed'
  constructor (
    public message: string = 'Could not fetch branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchFetchFailed.prototype)
  }
}

export class BranchesFetchFailed extends BaseError {
  public name = 'BranchesFetchFailed'
  constructor (
    public message: string = 'Could not fetch branches',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchesFetchFailed.prototype)
  }
}
