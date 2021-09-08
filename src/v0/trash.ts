import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface TrashOptions {
  user?: string
  base?: string
}

export interface TrashQuery {
  limit?: number
  uri?: string
  query?: {
    type?: string
    start?: string
    end?: string
  }
}

export interface RecoverQuery {
  query?: {
    resource: string
    type: TrashedTypes
  }
}

export interface TrashResponse {
  data: TrashedObject[]
  metadata: Record<string, unknown>
  next?: () => Promise<TrashResponse>
}

export interface TrashedObject {
  id: string
  name: string
  type: TrashedTypes
  updated_at: string
}

export type TrashedTypes =
  | 'accounts'
  | 'branch_groups'
  | 'branches'
  | 'categories'
  | 'category_trees'
  | 'clients'
  | 'customers'
  | 'device_groups'
  | 'discounts'
  | 'expense_accounts'
  | 'favourites'
  | 'functions'
  | 'manufacturers'
  | 'payment_options'
  | 'processes'
  | 'product_groups'
  | 'product_service_question_groups'
  | 'product_service_questions'
  | 'product_templates'
  | 'products_v1'
  | 'promotions'
  | 'reasons'
  | 'regions'
  | 'safes'
  | 'seasons'
  | 'staffs'
  | 'staff_groups'
  | 'staff_permission_templates'
  | 'storefronts'
  | 'tags'
  | 'taxes'
  | 'templates'
  | 'warehouses'

export class Trash extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/trash'
  endpoint: string
  http: Client
  public options: TrashOptions
  public uriHelper: UriHelper

  constructor (options: TrashOptions, http: Client) {
    super(http, { endpoint: Trash.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Trash.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query: TrashQuery): Promise<TrashResponse> {
    let next
    const base = this.uriHelper.generateBaseUri('/')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) { throw (new TrashFetchFailed(undefined, { status: response.status })) }

      if (response.data.cursor?.next) {
        next = (): Promise<TrashResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw (new TrashFetchFailed(undefined, { error }))
    }
  }

  async recover (query: RecoverQuery): Promise<TrashResponse> {
    const base = this.uriHelper.generateBaseUri('/untrash')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().put(uri)

      if (response.status !== 200) throw (new RecoverFailed(undefined, { status: response.status }))

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw (new RecoverFailed(undefined, { error }))
    }
  }
}

export class TrashFetchFailed extends BaseError {
  public name = 'TrashFetchFailed'
  constructor (
    public message: string = 'Could not fetch the trashed Record<string, unknown>s',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TrashFetchFailed.prototype)
  }
}

export class RecoverFailed extends BaseError {
  public name = 'RecoverFailed'
  constructor (
    public message: string = 'Could not recover the Record<string, unknown>',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, RecoverFailed.prototype)
  }
}
