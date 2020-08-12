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
  data: Pricebook
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

  constructor(options: PricebooksOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: PricebooksQuery | undefined): Promise<PricebooksResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri('/prices/book')
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<PricebooksResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as PricebooksResponse)
      } catch (error) {
        return reject(new PricebooksFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<PricebooksResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/prices/book/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new PricebooksMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as PricebooksResponse)
      } catch (error) {
        return reject(new PricebooksMetaFailed(undefined, { error }))
      }
    })
  }

  get(pricebookId: string): Promise<PricebookResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/prices/book/${pricebookId}`)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new PricebookFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Pricebook,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as PricebookResponse)
      } catch (error) {
        return reject(new PricebookFetchFailed(undefined, { error }))
      }
    })
  }

  put(pricebookId: string, pricebook: Pricebook): Promise<PricebookResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/prices/book/${pricebookId}`)
      try {
        const response = await this.http.getClient().put(uri, pricebook)

        return resolve({
          data: response.data.results[0] as Pricebook,
          metadata: { count: response.data.count }
        } as PricebookResponse)
      } catch (error) {
        return reject(new PricebookPutFailed(undefined, { error }))
      }
    })
  }

  create(pricebook: Pricebook): Promise<PricebookResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri('/prices/book')
      try {
        const response = await this.http.getClient().post(uri, pricebook)

        return resolve({
          data: response.data.results[0] as Pricebook,
          metadata: { count: response.data.count }
        } as PricebookResponse)
      } catch (error) {
        return reject(new PricebookCreationFailed(undefined, { error }))
      }
    })
  }

  delete(pricebookId: string): Promise<PricebookResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri(`/prices/book/${pricebookId}`)
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new PricebookDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as PricebookResponse)
      } catch (err) {
        return reject(new PricebookDeleteFailed())
      }
    })
  }
}

export class PricebooksFetchFailed extends BaseError {
  public name = 'PricebooksFetchFailed'
  constructor(public message: string = 'Could not fetch pricebooks', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebooksFetchFailed.prototype)
  }
}

class PricebooksMetaFailed extends BaseError {
  public name = 'PricebooksMetaFailed'
  constructor(public message: string = 'Could not fetch pricebooks meta call', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebooksMetaFailed.prototype)
  }
}

export class PricebookFetchFailed extends BaseError {
  public name = 'PricebookFetchFailed'
  constructor(public message: string = 'Could not fetch pricebook', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookFetchFailed.prototype)
  }
}

export class PricebookPutFailed extends BaseError {
  public name = 'PricebookPutFailed'
  constructor(public message: string = 'Could not alter pricebook', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookPutFailed.prototype)
  }
}

export class PricebookCreationFailed extends BaseError {
  public name = 'PricebookCreationFailed'
  constructor(public message: string = 'Could not create pricebook', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookCreationFailed.prototype)
  }
}

export class PricebookDeleteFailed extends BaseError {
  public name = 'PricebookDeleteFailed'
  constructor(public message: string = 'Could not delete pricebook', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, PricebookDeleteFailed.prototype)
  }
}
