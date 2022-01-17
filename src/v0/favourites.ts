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

export interface Favourite {
  id?: string
  branches?: string[]
  name?: string
  tabs?: Tab[]
  client_id?: string
  created_at?: Date
  updated_at?: Date
}

export interface FavouritesResponse {
  data: Favourite[]
  metadata: Record<string, unknown>
  msg?: string
  next?: () => Promise<FavouritesResponse>
}

export interface FavouriteResponse {
  data?: Favourite
  metadata?: Record<string, unknown>
  msg?: string
}

export interface FavouritesOptions {
  user?: string
  base?: string
}

export class Favourites extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/favourites'
  endpoint: string
  http: Client
  public options: FavouritesOptions
  public uriHelper: UriHelper

  constructor (options: FavouritesOptions, http: Client) {
    super(http, {
      endpoint: Favourites.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Favourites.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: Record<string, unknown>): Promise<FavouritesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new FavouritesFetchFailed()

      if (response.data.cursor?.next) {
        next = (): Promise<FavouritesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new FavouritesFetchFailed(error.message, { error })
    }
  }

  async get (favouriteId: string): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${favouriteId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new FavouriteFetchFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count },
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FavouriteFetchFailed(error.message, { error })
    }
  }

  async create (favourite: Favourite): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, favourite)
      if (response.status !== 200) throw new FavouriteCreateFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new FavouriteCreateFailed(error.message, { error })
    }
  }

  async update (favouriteId: string, favourite: Favourite): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${favouriteId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().put(uri, favourite)
      if (response.status !== 200) throw new FavouriteUpdateFailed()

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new FavouriteUpdateFailed(error.message, { error })
    }
  }

  async delete (favouriteId: string): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${favouriteId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new FavouriteDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FavouriteDeleteFailed(error.message, { error })
    }
  }
}

export class FavouritesFetchFailed extends BaseError {
  public name = 'FavouritesFetchFailed'
  constructor (
    public message: string = 'Could not fetch favourites set',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FavouritesFetchFailed.prototype)
  }
}

export class FavouriteFetchFailed extends BaseError {
  public name = 'FavouriteFetchFailed'
  constructor (
    public message: string = 'Could not fetch favourite',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FavouriteFetchFailed.prototype)
  }
}

export class FavouriteCreateFailed extends BaseError {
  public name = 'FavouriteCreateFailed'
  constructor (
    public message: string = 'Could not create favourite',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FavouriteCreateFailed.prototype)
  }
}

export class FavouriteDeleteFailed extends BaseError {
  public name = 'FavouriteDeleteFailed'
  constructor (
    public message: string = 'Could not delete favourite',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FavouriteDeleteFailed.prototype)
  }
}

export class FavouriteUpdateFailed extends BaseError {
  public name = 'FavouriteUpdateFailed'
  constructor (
    public message: string = 'Could not update favourite',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FavouriteUpdateFailed.prototype)
  }
}
