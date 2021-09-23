import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface Item {
  type?: string
  object_id: string
  client_id: string
  order_index: number
}

export interface Tab {
  name?: string
  order_index: number
  items: Item[]
}

export interface Abocard {
  id?: string
  name?: string
  linked_product?: string
  system_revenue_account?: string
  system_tax_account?: string
  system_tax_rate?: string
  used_product_price?: number
  price_source?: string
  price_id?: string
  selling_price?: number
  discount_value?: number
  total_value?: number
  units?: number
  voucher_value_per_unit?: number
  discount_value_per_unit?: number
  locations?: string[]
  location_group?: string[]
}

export interface AbocardsResponse {
  data: Abocard[]
  metadata: Record<string, unknown>
  msg?: string
  next?: () => Promise<AbocardsResponse>
}

export interface AbocardResponse {
  data?: Abocard
  metadata?: Record<string, unknown>
  msg?: string
}

export interface AbocardsOptions {
  user?: string
  base?: string
}

export class AbocardSystems extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/abocard/systems'
  endpoint: string
  http: Client
  public options: AbocardsOptions
  public uriHelper: UriHelper

  constructor (options: AbocardsOptions, http: Client) {
    super(http, {
      endpoint: AbocardSystems.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = AbocardSystems.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: Record<string, unknown>): Promise<AbocardsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AbocardsFetchFailed()

      if (response.data.cursor?.next) {
        next = (): Promise<AbocardsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (e) {
      throw new AbocardsFetchFailed()
    }
  }

  async get (abocardId: string): Promise<AbocardResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${abocardId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new AbocardFetchFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count },
        msg: response.data.msg
      }
    } catch (e) {
      throw new AbocardFetchFailed()
    }
  }

  async create (abocard: Abocard): Promise<AbocardResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, abocard)
      if (response.status !== 200) throw new AbocardCreateFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (e) {
      throw new AbocardCreateFailed()
    }
  }

  async update (abocardId: string, abocard: Abocard): Promise<AbocardResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${abocardId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().put(uri, abocard)
      if (response.status !== 200) throw new AbocardUpdateFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (e) {
      throw new AbocardUpdateFailed()
    }
  }

  async delete (abocardId: string): Promise<AbocardResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${abocardId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new AbocardDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (e) {
      throw new AbocardDeleteFailed()
    }
  }
}

export class AbocardsFetchFailed extends BaseError {
  public name = 'AbocardsFetchFailed'
  constructor (
    public message: string = 'Could not fetch abocards set',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AbocardsFetchFailed.prototype)
  }
}

export class AbocardFetchFailed extends BaseError {
  public name = 'AbocardFetchFailed'
  constructor (
    public message: string = 'Could not fetch abocard',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AbocardFetchFailed.prototype)
  }
}

export class AbocardCreateFailed extends BaseError {
  public name = 'AbocardCreateFailed'
  constructor (
    public message: string = 'Could not create abocard',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AbocardCreateFailed.prototype)
  }
}

export class AbocardDeleteFailed extends BaseError {
  public name = 'AbocardDeleteFailed'
  constructor (
    public message: string = 'Could not delete abocard',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AbocardDeleteFailed.prototype)
  }
}

export class AbocardUpdateFailed extends BaseError {
  public name = 'AbocardUpdateFailed'
  constructor (
    public message: string = 'Could not update abocard',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, AbocardUpdateFailed.prototype)
  }
}
