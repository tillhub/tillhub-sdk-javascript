import typeOf from 'just-typeof'
import safeGet from 'just-safe-get'
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
  query?: {
    deleted?: boolean
    active?: boolean
  }
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

export interface ExternalCustomIdQuery {
  provided_id: string
  branch?: string
}

export interface ExternalCustomIdResponse {
  external_custom_id: string
}

export interface SearchQuery {
  q: string
  fields?: string[]
}

export interface Branch {
  id?: string
  branch_number?: number
  name: string
  email?: string
  custom_id?: string
  external_custom_id?: string | null
  cost_center?: string | null
  receipt_header?: string
  receipt_footer?: string
  active?: boolean
  deleted?: boolean
  configuration?: string
  timezone_default?: string | null
  currency_default?: string | null
}

export class Branches extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/branches'
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
      throw new BranchesFetchFailed(error.message, { error })
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
      throw new BranchFetchFailed(error.message, { error })
    }
  }

  async put (branchId: string, branch: Branch): Promise<BranchResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)
    try {
      const response = await this.http.getClient().put(uri, branch)

      return {
        data: response.data.results[0] as Branch,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchPutFailed(safeGet(error, 'response.data.msg'), { error })
    }
  }

  async create (branch: Branch): Promise<BranchResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, branch)

      return {
        data: response.data.results[0] as Branch,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchCreationFailed(error.message, { error })
    }
  }

  async count (): Promise<BranchesResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new BranchesCountFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchesCountFailed(error.message, { error })
    }
  }

  async delete (branchId: string): Promise<BranchResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${branchId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new BranchDeleteFailed(safeGet(response, 'data.msg'))

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new BranchDeleteFailed(error.message, { error })
    }
  }

  async getUniqueExternalId (query: ExternalCustomIdQuery): Promise<BranchResponse> {
    const base = this.uriHelper.generateBaseUri('/external_id')
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ExternalCustomIdGetUniqueFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new ExternalCustomIdGetUniqueFailed(undefined, {
          status: error.response.status,
          name: error.response.data.name
        })
      }
      throw new ExternalCustomIdGetUniqueFailed(error.message, { error })
    }
  }

  async search (query: string | SearchQuery): Promise<BranchResponse> {
    let uri
    if (typeof query === 'string') {
      uri = this.uriHelper.generateBaseUri(`/search?q=${query}`)
    } else if (typeOf(query) === 'object') {
      const base = this.uriHelper.generateBaseUri('/search')
      uri = this.uriHelper.generateUriWithQuery(base, query)
    } else {
      throw new BranchesSearchFailed('Could not search for branch - query type is invalid')
    }

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new BranchesSearchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new BranchesSearchFailed(error.message, { error })
    }
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

export class BranchFetchFailed extends BaseError {
  public name = 'BrancheFetchFailed'
  constructor (
    public message: string = 'Could not fetch branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchFetchFailed.prototype)
  }
}

export class BranchPutFailed extends BaseError {
  public name = 'BranchPutFailed'
  constructor (
    public message: string = 'Could not alter branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchPutFailed.prototype)
  }
}

export class BranchCreationFailed extends BaseError {
  public name = 'BranchCreationFailed'
  constructor (
    public message: string = 'Could not create branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchCreationFailed.prototype)
  }
}

export class BranchesCountFailed extends BaseError {
  public name = 'BranchesCountFailed'
  constructor (
    public message: string = 'Could not count the branches',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchesCountFailed.prototype)
  }
}

export class BranchDeleteFailed extends BaseError {
  public name = 'BranchDeleteFailed'
  constructor (
    public message: string = 'Could not delete branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchDeleteFailed.prototype)
  }
}

export class ExternalCustomIdGetUniqueFailed extends BaseError {
  public name = 'ExternalCustomIdGetUniqueFailed'
  constructor (
    public message: string = 'Could not get a unique external_custom_id',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ExternalCustomIdGetUniqueFailed.prototype)
  }
}

export class BranchesSearchFailed extends BaseError {
  public name = 'BranchesSearchFailed'
  constructor (
    public message: string = 'Could not search for branch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, BranchesSearchFailed.prototype)
  }
}
