import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface PricebooksOptions {
  user?: string
  base?: string
}

export interface PricebooksQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    name?: string
  }
}

export interface PricebooksResponse {
  data: Pricebook[]
  metadata: Record<string, unknown>
  next?: () => Promise<PricebooksResponse>
}

export interface PricebookResponse {
  data?: Pricebook
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Pricebook {
  name?: string
  custom_id?: string
  constraints?: Record<string, unknown>
  active?: boolean
  deleted?: boolean
}

export class Pricebooks {
  http: Client
  public options: PricebooksOptions
  public uriHelper: UriHelper

  constructor (options: PricebooksOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  async getAll (query?: PricebooksQuery | undefined): Promise<PricebooksResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/prices/book')
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<PricebooksResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new PricebooksFetchFailed(error.message, { error })
    }
  }

  async meta (): Promise<PricebooksResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/prices/book/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new PricebooksMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebooksMetaFailed(error.message, { error })
    }
  }

  async get (pricebookId: string): Promise<PricebookResponse> {
    const uri = this.uriHelper.generateBaseUri(`/prices/book/${pricebookId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PricebookFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Pricebook,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookFetchFailed(error.message, { error })
    }
  }

  async put (pricebookId: string, pricebook: Pricebook): Promise<PricebookResponse> {
    const uri = this.uriHelper.generateBaseUri(`/prices/book/${pricebookId}`)
    try {
      const response = await this.http.getClient().put(uri, pricebook)

      return {
        data: response.data.results[0] as Pricebook,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookPutFailed(error.message, { error })
    }
  }

  async create (pricebook: Pricebook): Promise<PricebookResponse> {
    const uri = this.uriHelper.generateBaseUri('/prices/book')
    try {
      const response = await this.http.getClient().post(uri, pricebook)

      return {
        data: response.data.results[0] as Pricebook,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PricebookCreationFailed(error.message, { error })
    }
  }

  async delete (pricebookId: string): Promise<PricebookResponse> {
    const uri = this.uriHelper.generateBaseUri(`/prices/book/${pricebookId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new PricebookDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PricebookDeleteFailed(error.message, { error })
    }
  }

  async copy (pricebookIds: string[]): Promise<PricebookResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/prices/book/copy')
      const response = await this.http.getClient().post(uri, pricebookIds)

      if (response.status !== 200) throw new PricebooksCopyFailed()

      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new PricebooksCopyFailed(error.message, { error })
    }
  }
}

export class PricebooksFetchFailed extends BaseError {
  public name = 'PricebooksFetchFailed'
  constructor (
    public message: string = 'Could not fetch pricebooks',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebooksFetchFailed.prototype)
  }
}

class PricebooksMetaFailed extends BaseError {
  public name = 'PricebooksMetaFailed'
  constructor (
    public message: string = 'Could not fetch pricebooks meta call',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebooksMetaFailed.prototype)
  }
}

export class PricebookFetchFailed extends BaseError {
  public name = 'PricebookFetchFailed'
  constructor (
    public message: string = 'Could not fetch pricebook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookFetchFailed.prototype)
  }
}

export class PricebookPutFailed extends BaseError {
  public name = 'PricebookPutFailed'
  constructor (
    public message: string = 'Could not alter pricebook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookPutFailed.prototype)
  }
}

export class PricebookCreationFailed extends BaseError {
  public name = 'PricebookCreationFailed'
  constructor (
    public message: string = 'Could not create pricebook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookCreationFailed.prototype)
  }
}

export class PricebookDeleteFailed extends BaseError {
  public name = 'PricebookDeleteFailed'
  constructor (
    public message: string = 'Could not delete pricebook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookDeleteFailed.prototype)
  }
}

export class PricebooksCopyFailed extends BaseError {
  public name = 'PricebooksCopyFailed'
  constructor (
    public message: string = 'Could not copy pricebook',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebooksCopyFailed.prototype)
  }
}
