import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface PurchaseOrdersOptions {
  user?: string
  base?: string
}

export interface PurchaseOrdersCreateQuery {
  purchaseOrderNumber: string
  businessPartner: {
    id: string
  }
  status?: PurchaseOrderStatus
  notes?: string | null
  recipients?: string[] // list of emails normally
}

export interface PurchaseOrdersUpdateQuery {
  purchaseOrderNumber: string
  businessPartner: {
    id: string
  }
  status?: PurchaseOrderStatus
  notes?: string | null
  recipients?: string[] // list of emails normally
}

export interface PurchaseOrdersSingleResponse {
  data: PurchaseOrder
  msg: string
}

export interface PurchaseOrdersMultipleResponse {
  data: PurchaseOrder[]
  msg: string
}

export type PurchaseOrderStatus = 'draft' | 'sent' | 'done'

export interface PurchaseOrder {
  purchaseOrderNumber: string
  businessPartner: {
    id: string
  }
  status: PurchaseOrderStatus
  id?: string
  sentAt?: string | null
  createdAt?: string
  createdBy?: string
  notes?: string | null
  recipients?: string[] // list of emails normally
  totalAmount?: string
  products?: PurchaseOrderProduct[]
}

export interface PurchaseOrderProduct {
  productId: string
  productName: string
  price: number
  vatPercent: number
  discountPercent: number
  quantity: number
  totalUntaxed?: number
  totalWithTax?: number
}

export class PurchaseOrders extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/purchase-orders'
  endpoint: string
  http: Client
  public options: PurchaseOrdersOptions
  public uriHelper: UriHelper

  constructor (options: PurchaseOrdersOptions, http: Client) {
    super(http, {
      endpoint: PurchaseOrders.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = PurchaseOrders.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async get (purchaseOrderId: string): Promise<PurchaseOrdersSingleResponse> {
    const base = this.uriHelper.generateBaseUri(`/${purchaseOrderId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new PurchaseOrdersGetFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PurchaseOrdersGetFailed(error.message, { error })
    }
  }

  async create (purchaseOrder: PurchaseOrdersCreateQuery): Promise<PurchaseOrdersSingleResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base)
    try {
      const response = await this.http.getClient().post(uri, purchaseOrder)
      if (response.status !== 200) {
        throw new PurchaseOrdersCreationFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PurchaseOrdersCreationFailed(error.message, { error })
    }
  }

  async put (purchaseOrderId: string, purchaseOrder: PurchaseOrdersUpdateQuery): Promise<PurchaseOrdersSingleResponse> {
    const base = this.uriHelper.generateBaseUri(`/${purchaseOrderId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)
    try {
      const response = await this.http.getClient().put(uri, purchaseOrder)
      if (response.status !== 200) {
        throw new PurchaseOrdersUpdateFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PurchaseOrdersUpdateFailed(error.message, { error })
    }
  }

  async upsertProducts (purchaseOrderId: string, purchaseOrder: PurchaseOrderProduct): Promise<PurchaseOrdersSingleResponse> {
    const base = this.uriHelper.generateBaseUri(`/${purchaseOrderId}`)
    const uri = this.uriHelper.generateUriWithQuery(base)
    try {
      const response = await this.http.getClient().post(uri, purchaseOrder)
      if (response.status !== 200) {
        throw new PurchaseOrdersProductsUpsertFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PurchaseOrdersProductsUpsertFailed(error.message, { error })
    }
  }
}

export class PurchaseOrdersGetFailed extends BaseError {
  public name = 'PurchaseOrdersGetFailed'
  constructor (
    public message: string = 'Could get purchase order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersGetFailed.prototype)
  }
}

export class PurchaseOrdersCreationFailed extends BaseError {
  public name = 'PurchaseOrdersCreationFailed'
  constructor (
    public message: string = 'Could not create purchase order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersCreationFailed.prototype)
  }
}

export class PurchaseOrdersUpdateFailed extends BaseError {
  public name = 'PurchaseOrdersUpdateFailed'
  constructor (
    public message: string = 'Could not update purchase order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersUpdateFailed.prototype)
  }
}

export class PurchaseOrdersProductsUpsertFailed extends BaseError {
  public name = 'PurchaseOrdersProductsUpsertFailed'
  constructor (
    public message: string = 'Could upsert products for purchase order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersProductsUpsertFailed.prototype)
  }
}
