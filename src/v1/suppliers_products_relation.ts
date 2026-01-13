import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface SuppliersProductsRelationOptions {
  user?: string
  base?: string
}

export interface SuppliersProductsRelationBulkDeleteItem {
  businessPartnerId: string
  productId: string[]
}

export interface SuppliersProductsRelationBulkDeleteBody {
  items: SuppliersProductsRelationBulkDeleteItem[]
}

export interface SuppliersProductsRelationBulkDeleteResponse {
  data: Record<string, unknown>
  msg: string
}

export class SuppliersProductsRelation extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/business-partner-products'
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

  async bulkDelete (body: SuppliersProductsRelationBulkDeleteBody): Promise<SuppliersProductsRelationBulkDeleteResponse> {
    const uri = this.uriHelper.generateBaseUri('/bulk')

    try {
      const response = await this.http.getClient().delete(uri, {
        data: body
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
