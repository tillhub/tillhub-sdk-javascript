import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface TrashOptions {
  user?: string
  base?: string
}

export interface TrashQuery {
  type?: string
  start?: string
  end?: string
  limit?: number
}

export interface UntrashQuery {
  resource: string
  type: TrashedTypes
}

export interface TrashResponse {
  data: TrashedObject[]
  metadata: object
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
  | 'staff'
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

  constructor(options: TrashOptions, http: Client) {
    super(http, { endpoint: Trash.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Trash.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  get(query: TrashQuery): Promise<TrashResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri('/')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      try {

        const response = await this.http.getClient().get(uri)

        response.status !== 200 &&
          reject(new TrashFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TrashResponse)
      } catch (error) {
        return reject(new TrashFetchFailed(undefined, { error }))
      }
    })
  }

  untrash(query: UntrashQuery): Promise<TrashResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri('/untrash')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      try {

        const response = await this.http.getClient().put(uri)

        response.status !== 200 &&
          reject(new UntrashFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TrashResponse)
      } catch (error) {
        return reject(new UntrashFailed(undefined, { error }))
      }
    })
  }
}

export class TrashFetchFailed extends BaseError {
  public name = 'TrashFetchFailed'
  constructor(public message: string = 'Could not fetch the trashed objects', properties?: any) {
    super(message, properties)
  }
}

export class UntrashFailed extends BaseError {
  public name = 'UntrashFailed'
  constructor(public message: string = 'Could not untrash the object', properties?: any) {
    super(message, properties)
  }
}
