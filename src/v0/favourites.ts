import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import * as errors from '../errors'

export interface Item {
  type?: string,
  object_id: string,
  client_id: string,
  order_index: number
}

export interface Tab {
  name?: string,
  order_index: number,
  items: Item[]
}

export interface Favourite {
  id?: string
  branches?: string[]
  name?: string
  tabs?: Tab[]
  client_id?: string
  created_at?: Date,
  updated_at?: Date
}

export interface FavouritesResponse {
  data: Favourite[]
  metadata: object
  msg?: string
}

export interface FavouriteResponse {
  data: Favourite
  metadata: object
  msg?: string
}

export interface FavouritesOptions {
  user?: string
  base?: string
}

export class Favourites {
  endpoint: string
  http: Client
  public options: FavouritesOptions
  public uriHelper: UriHelper

  constructor(options: FavouritesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/favourites'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll(query?: Object): Promise<FavouritesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.FavouritesFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      } as FavouritesResponse
    } catch (e) {
      throw new errors.FavouritesFetchFailed()
    }
  }

  async get(favouriteId: string): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${favouriteId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.FavouriteFetchFailed()

      return {
        data: response.data.results[0] as Favourites,
        metadata: { count: response.data.count },
        msg: response.data.msg
      } as FavouriteResponse
    } catch (e) {
      throw new errors.FavouriteFetchFailed()
    }
  }

  async create(favourite: Favourite): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().post(uri, favourite)
      if (response.status !== 200) throw new errors.FavouriteCreateFailed()

      return {
        data: response.data.results[0] as Favourites,
        metadata: { count: response.data.count }
      } as FavouriteResponse
    } catch (e) {
      throw new errors.FavouriteCreateFailed()
    }
  }

  async update(favouriteId: string, favourite: Favourite): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${favouriteId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().put(uri, favourite)
      if (response.status !== 200) throw new errors.FavouriteUpdateFailed()

      return {
        data: response.data.results[0] as Favourites,
        metadata: { count: response.data.count }
      } as FavouriteResponse
    } catch (e) {
      throw new errors.FavouriteUpdateFailed()
    }
  }

  async delete(favouriteId: string): Promise<FavouriteResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${favouriteId}`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.FavouriteDeleteFailed()

      return {
        msg: response.data.msg
      } as FavouriteResponse
    } catch (e) {
      throw new errors.FavouriteDeleteFailed()
    }
  }
}
