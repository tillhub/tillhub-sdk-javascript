import { Supplier } from './suppliers'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface SuppliersProductsRelationOptions {
  user?: string
  base?: string
}

export interface SuppliersProductsRelationCreateQuery {
  productId: []
}

export interface SuppliersProductsRelationResponse {
  data: {
    productId: string[]
  }
  msg: string
}

export interface SuppliersProductsRelationCreateResponse {
  data: {
    productsToBusinessPartnersMap: Record<string, string>
    businessPartners: Record<string, Supplier>
  }
  msg: string
}

export interface SuppliersProductsRelationDeleteResponse {
  msg: string
}

export interface SuppliersProductsRelationLookupResponse {
  data: Supplier[]
  msg: string
}

export interface SuppliersProductsRelation {
  id?: string
}

export class SuppliersProductsRelation extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/business-partner-products'
  endpoint: string
  http: Client
  public options: SuppliersProductsRelationOptions
  public uriHelper: UriHelper

  constructor (options: SuppliersProductsRelationOptions, http: Client) {
    super(http, {
      endpoint: SuppliersProductsRelation.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = SuppliersProductsRelation.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (supplierId: string): Promise<SuppliersProductsRelationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new SuppliersProductsRelationFetchFailed(undefined, { status: response.status })
      }
      return {
        data: response.data[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationFetchFailed(error.message, { error })
    }
  }

  async create (supplierId: string, query: SuppliersProductsRelationCreateQuery): Promise<SuppliersProductsRelationCreateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)
    try {
      const response = await this.http.getClient().post(uri, {
        productId: query.productId
      })

      if (response.status !== 200) {
        throw new SuppliersProductsRelationCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationCreationFailed(error.message, { error })
    }
  }

  async delete (supplierId: string, productId: string): Promise<SuppliersProductsRelationDeleteResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}/${productId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new SuppliersProductsRelationDeleteFailed(undefined, { status: response.status })
      }
      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationDeleteFailed(error.message, { error })
    }
  }

  async lookup (productId: string): Promise<SuppliersProductsRelationLookupResponse> {
    const uri = this.uriHelper.generateBaseUri(`/lookup/${productId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new SuppliersProductsRelationLookupFailed(undefined, { status: response.status })
      }

      return {
        data: response.data,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationLookupFailed(error.message, { error })
    }
  }
}

export class SuppliersProductsRelationFetchFailed extends BaseError {
  public name = 'SuppliersProductsRelationFetchFailed'
  constructor (
    public message: string = 'Could not fetch supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationFetchFailed.prototype)
  }
}

export class SuppliersProductsRelationCreationFailed extends BaseError {
  public name = 'SuppliersProductsRelationCreationFailed'
  constructor (
    public message: string = 'Could not create supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationCreationFailed.prototype)
  }
}

export class SuppliersProductsRelationDeleteFailed extends BaseError {
  public name = 'SuppliersProductsRelationDeleteFailed'
  constructor (
    public message: string = 'Could not delete the supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationDeleteFailed.prototype)
  }
}

export class SuppliersProductsRelationLookupFailed extends BaseError {
  public name = 'SuppliersProductsRelationLookupFailed'
  constructor (
    public message: string = 'Could not make a lookup for supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationLookupFailed.prototype)
  }
}
