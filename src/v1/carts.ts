import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper, HandlerQuery } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface Images {
  '1x'?: string
  avatar?: string
}

export interface Cart {
  id?: string
  name?: string
}

export interface CartsOptions {
  user?: string
  base?: string
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    [key: string]: any
  }
}

export interface CartDeleteOptions {
  [key: string]: any
}

export interface CartsResponse {
  data?: Cart[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<CartsResponse>
}

export interface CartResponse {
  data: Cart
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
  errors?: ErrorObject[]
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface CartsCreateQuery {
  [key: string]: any
}

export interface HandlerProductsQuery extends HandlerQuery {
  query?: CartsCreateQuery
}

export interface ProductsUpdateRequestObject {
  cartId: string
  body: Cart
}

export class Carts extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/carts'
  endpoint: string
  http: Client
  public options: CartsOptions
  public uriHelper: UriHelper

  constructor (options: CartsOptions, http: Client) {
    super(http, { endpoint: Carts.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Carts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (cart: Cart, query?: Record<string, unknown>): Promise<CartResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().post(uri, cart)
      if (response.status !== 200) {
        throw new CartsCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error: any) {
      throw new CartsCreateFailed(error.message, { error })
    }
  }

  async getAll (options?: CartsOptions | undefined): Promise<CartsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CartsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<CartsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new CartsFetchFailed(error.message, { error })
    }
  }

  async get (cartId: string): Promise<CartResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${cartId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CartFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Cart,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CartFetchFailed(error.message, { error })
    }
  }

  async meta (): Promise<CartsResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CartsMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new CartsMetaFailed('could not get cart metadata unexpectedly', {
          status: response.status
        })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CartsMetaFailed(error.message, { error })
    }
  }

  async put (cartId: string, cart: Cart): Promise<CartResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${cartId}`)

    try {
      const response = await this.http.getClient().put(uri, cart)
      if (response.status !== 200) {
        throw new CartsUpdateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CartsUpdateFailed(error.message, { error })
    }
  }

  async delete (cartId: string, deleteOptions?: CartDeleteOptions): Promise<CartsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${cartId}`)
      const uri = this.uriHelper.generateUriWithQuery(base, deleteOptions)

      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new CartsDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new CartsDeleteFailed(error.message, { error })
    }
  }

  async search (searchTerm: string): Promise<CartsResponse> {
    const base = this.uriHelper.generateBaseUri('/search')
    const uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm })
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CartsSearchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CartsSearchFailed(error.message, { error })
    }
  }
}

export class CartFetchFailed extends BaseError {
  public name = 'CartFetchFailed'
  constructor (
    public message: string = 'Could not fetch cart',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CartFetchFailed.prototype)
  }
}

export class CartsSearchFailed extends BaseError {
  public name = 'CartsSearchFailed'
  constructor (
    public message: string = 'Could complete carts search',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsSearchFailed.prototype)
  }
}

export class CartsDeleteFailed extends BaseError {
  public name = 'CartsDeleteFailed'
  constructor (public message: string = 'Could delete cart', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsDeleteFailed.prototype)
  }
}

export class CartsUpdateFailed extends BaseError {
  public name = 'CartsUpdateFailed'
  constructor (public message: string = 'Could update cart', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsUpdateFailed.prototype)
  }
}

export class CartsMetaFailed extends BaseError {
  public name = 'CartsMetaFailed'
  constructor (
    public message: string = 'Could fetch carts metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsMetaFailed.prototype)
  }
}

export class CartsFetchFailed extends BaseError {
  public name = 'CartsFetchFailed'
  constructor (public message: string = 'Could fetch carts', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsFetchFailed.prototype)
  }
}

export class CartsCreateFailed extends BaseError {
  public name = 'CartsCreateFailed'
  constructor (public message: string = 'Could create cart', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, CartsCreateFailed.prototype)
  }
}
