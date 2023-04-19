import { Supplier } from './suppliers'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface SuppliersProductsRelationOptions {
  user?: string
  base?: string
}

export interface SuppliersProductsRelationBulkCreateQuery {
  productId: string[]
}

export interface SuppliersProductsRelationMapQuery {
  productId: string[]
}

export interface SuppliersProductsRelationBulkDeleteQuery {
  productId: string[]
}

export interface SuppliersProductsRelationDefaultResponse {
  data: {
    businessPartners: Supplier[]
    productId: string
  }
  msg: string
}

export interface SuppliersProductsRelationProductIdsResponse {
  data: {
    productId: string[]
  }
  msg: string
}

export interface SuppliersProductsRelationMapResponse {
  data: {
    productsToBusinessPartnersMap: Record<string, string[]>
    businessPartners: Record<string, Supplier>
  }
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

  async getProductIds (supplierId: string): Promise<SuppliersProductsRelationProductIdsResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new SuppliersProductsRelationProductIdsFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationProductIdsFailed(error.message, { error })
    }
  }

  async getSuppliers (productId: string): Promise<SuppliersProductsRelationDefaultResponse> {
    const uri = this.uriHelper.generateBaseUri(`/lookup/${productId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new SuppliersProductsRelationSuppliersFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationSuppliersFailed(error.message, { error })
    }
  }

  async getMap (query: SuppliersProductsRelationMapQuery): Promise<SuppliersProductsRelationMapResponse> {
    const uri = this.uriHelper.generateBaseUri('/map')

    try {
      const response = await this.http.getClient().post(uri, {
        productId: query.productId
      })
      if (response.status !== 200) {
        throw new SuppliersProductsRelationMapFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationMapFailed(error.message, { error })
    }
  }

  async create (supplierId: string, productId: string): Promise<SuppliersProductsRelationDefaultResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}/${productId}`)
    try {
      const response = await this.http.getClient().post(uri)
      if (response.status !== 200) {
        throw new SuppliersProductsRelationCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationCreationFailed(error.message, { error })
    }
  }

  async bulkCreate (supplierId: string, query: SuppliersProductsRelationBulkCreateQuery): Promise<SuppliersProductsRelationDefaultResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)
    try {
      const response = await this.http.getClient().post(uri, {
        productId: query.productId
      })

      if (response.status !== 200) {
        throw new SuppliersProductsRelationBulkCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationBulkCreationFailed(error.message, { error })
    }
  }

  async delete (supplierId: string, productId: string): Promise<SuppliersProductsRelationDefaultResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}/${productId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new SuppliersProductsRelationDeleteFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationDeleteFailed(error.message, { error })
    }
  }

  async bulkDelete (supplierId: string, query: SuppliersProductsRelationBulkDeleteQuery): Promise<SuppliersProductsRelationDefaultResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${supplierId}`)
    try {
      const response = await this.http.getClient().delete(uri, {
        data: {
          productId: query.productId
        }
      })

      if (response.status !== 200) {
        throw new SuppliersProductsRelationBulkDeleteFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new SuppliersProductsRelationBulkDeleteFailed(error.message, { error })
    }
  }
}

export class SuppliersProductsRelationProductIdsFailed extends BaseError {
  public name = 'SuppliersProductsRelationProductIdsFailed'
  constructor (
    public message: string = 'Could not fetch supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationProductIdsFailed.prototype)
  }
}

export class SuppliersProductsRelationSuppliersFailed extends BaseError {
  public name = 'SuppliersProductsRelationSuppliersFailed'
  constructor (
    public message: string = 'Could not make a lookup for supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationSuppliersFailed.prototype)
  }
}

export class SuppliersProductsRelationMapFailed extends BaseError {
  public name = 'SuppliersProductsRelationMapFailed'
  constructor (
    public message: string = 'Could not make a map for supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationMapFailed.prototype)
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

export class SuppliersProductsRelationBulkCreationFailed extends BaseError {
  public name = 'SuppliersProductsRelationBulkCreationFailed'
  constructor (
    public message: string = 'Could not bulk create supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationBulkCreationFailed.prototype)
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

export class SuppliersProductsRelationBulkDeleteFailed extends BaseError {
  public name = 'SuppliersProductsRelationBulkDeleteFailed'
  constructor (
    public message: string = 'Could not bulk delete the supplier and product relation',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, SuppliersProductsRelationBulkDeleteFailed.prototype)
  }
}
