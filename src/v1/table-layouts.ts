import { ThBaseHandler } from '../base'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface TableLayoutsOptions {
  user?: string
  base?: string
}

export interface TableLayoutsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    q?: string
    locations?: string[]
  }
}

export interface TableLayoutDuplicateOptions {
  location: string
  name: string
}

export interface TableLayoutsResponse {
  data: TableLayoutsEntity[]
  metadata?: {
    count?: number
    cursor?: { next?: string }
  }
  next?: () => Promise<TableLayoutsResponse>
  msg?: string
}

export interface TableLayoutsEntity {
  id?: string
  name?: string
  location?: string
  active?: boolean
  tablesCount?: number
  combinationsCount?: number
  bookableTablesCount?: number
  bookableCombinationsCount?: number
}

export interface TableLayoutResponse {
  data?: TableLayoutEntity
  msg?: string
  metadata?: {
    count?: number
  }
}

export interface TableLayoutEntity {
  id?: string
  name?: string
  location?: string
  active?: boolean
  layout?: Record<string, any>
  combinations?: Combination[]
}

export interface Combination {
  id: string
  isBookableExternally: boolean
  maxPartySize: number
  minPartySize: number
  tables: string[]
}

export class TableLayouts extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/table_layouts'
  endpoint: string
  http: Client
  public options: TableLayoutsOptions
  public uriHelper: UriHelper

  constructor (options: TableLayoutsOptions, http: Client) {
    super(http, { endpoint: TableLayouts.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = TableLayouts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: TableLayoutsQuery | undefined): Promise<TableLayoutsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<TableLayoutsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new TableLayoutsFetchFailed(error.message, { error })
    }
  }

  async meta (query?: TableLayoutsQuery): Promise<TableLayoutsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new TableLayoutsMetaFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TableLayoutsMetaFailed(error.message, { error })
    }
  }

  async get (id: string): Promise<TableLayoutResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${id}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TableLayoutFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as TableLayoutEntity,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new TableLayoutFetchFailed(error.message, { error })
    }
  }

  async put (id: string, tableLayout: TableLayoutEntity): Promise<TableLayoutResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${id}`)
    try {
      const response = await this.http.getClient().put(uri, tableLayout)

      return {
        data: response.data.results[0] as TableLayoutEntity,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TableLayoutPutFailed(error.message, { error })
    }
  }

  async create (tableLayout: TableLayoutEntity): Promise<TableLayoutResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, tableLayout)

      return {
        data: response.data.results[0] as TableLayoutEntity,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TableLayoutCreateFailed(error.message, { error })
    }
  }

  async delete (id: string): Promise<TableLayoutResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${id}`)
    try {
      const response = await this.http.getClient().delete(uri)

      if (response.status !== 200) {
        throw new TableLayoutDeleteFailed()
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new TableLayoutDeleteFailed(error.message, { error })
    }
  }

  async duplicate (id: string, options: TableLayoutDuplicateOptions): Promise<TableLayoutResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${id}/duplicate`)
      const response = await this.http.getClient().post(uri, options)

      if (response.status !== 200) throw new TableLayoutDuplicateFailed()

      return {
        data: response.data.results[0] as TableLayoutEntity,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new TableLayoutDuplicateFailed(error.message, { error })
    }
  }

  async toggleActive (id: string): Promise<TableLayoutResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${id}/active`)
      const response = await this.http.getClient().patch(uri)

      if (response.status !== 200) {
        throw new TableLayoutToggleActiveFailed()
      }

      return {
        data: response.data.results[0] as TableLayoutEntity,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new TableLayoutToggleActiveFailed(error.message, { error })
    }
  }
}

export class TableLayoutsFetchFailed extends BaseError {
  public name = 'TableLayoutsFetchFailed'
  constructor (
    public message: string = 'Could not fetch table layouts',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutsFetchFailed.prototype)
  }
}

export class TableLayoutsMetaFailed extends BaseError {
  public name = 'TableLayoutsMetaFailed'
  constructor (
    public message: string = 'Could not get table layouts metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutsMetaFailed.prototype)
  }
}

export class TableLayoutFetchFailed extends BaseError {
  public name = 'TableLayoutFetchFailed'
  constructor (
    public message: string = 'Could not fetch table layout',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutFetchFailed.prototype)
  }
}

export class TableLayoutPutFailed extends BaseError {
  public name = 'TableLayoutPutFailed'
  constructor (
    public message: string = 'Could not alter table layout',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutPutFailed.prototype)
  }
}

export class TableLayoutCreateFailed extends BaseError {
  public name = 'TableLayoutCreateFailed'
  constructor (
    public message: string = 'Could not create table layout',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutCreateFailed.prototype)
  }
}

export class TableLayoutDeleteFailed extends BaseError {
  public name = 'TableLayoutDeleteFailed'
  constructor (
    public message: string = 'Could not delete table layout',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutDeleteFailed.prototype)
  }
}

export class TableLayoutDuplicateFailed extends BaseError {
  public name = 'TableLayoutDuplicateFailed'
  constructor (
    public message: string = 'Could not duplicate table layout',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutDuplicateFailed.prototype)
  }
}

export class TableLayoutToggleActiveFailed extends BaseError {
  public name = 'TableLayoutToggleActiveFailed'
  constructor (
    public message: string = 'Could not alter table layout',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TableLayoutToggleActiveFailed.prototype)
  }
}
