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

export interface PurchaseOrdersBulkAddProductsQuery {
  products: PurchaseOrderProduct[]
}

export interface PurchaseOrdersBulkDeleteProductsQuery {
  products: string[] // product IDs
}

export interface PurchaseOrdersSingleResponse {
  data: PurchaseOrder
  msg: string
}

export interface PurchaseOrdersMultipleResponse {
  data: PurchaseOrder[]
  metadata?: Record<string, unknown>
  next?: () => Promise<PurchaseOrdersMultipleResponse>
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

export interface PurchaseOrderMetaQuery {
  deleted?: boolean
  location?: string
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

  async getAll (query?: Record<string, unknown>): Promise<PurchaseOrdersMultipleResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new PurchaseOrdersGetFailed(undefined, { status: response.status })
      }
      if (response.data.cursor?.next) {
        next = (): Promise<PurchaseOrdersMultipleResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new PurchaseOrdersGetFailed(error.message, { error })
    }
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

  async meta (q?: PurchaseOrderMetaQuery | undefined): Promise<PurchaseOrdersMultipleResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, q)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PurchaseOrdersMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new PurchaseOrdersMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new PurchaseOrdersMetaFailed(error.message, { error })
    }
  }

  async bulkAddProducts (purchaseOrderId: string, purchaseOrder: PurchaseOrdersBulkAddProductsQuery): Promise<PurchaseOrdersSingleResponse> {
    const base = this.uriHelper.generateBaseUri(`/${purchaseOrderId}/products`)
    const uri = this.uriHelper.generateUriWithQuery(base)
    try {
      const response = await this.http.getClient().post(uri, purchaseOrder)
      if (response.status !== 200) {
        throw new PurchaseOrdersBulkAddProductsFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PurchaseOrdersBulkAddProductsFailed(error.message, { error })
    }
  }

  async bulkDeleteProducts (purchaseOrderId: string, purchaseOrder: PurchaseOrdersBulkDeleteProductsQuery): Promise<PurchaseOrdersSingleResponse> {
    const base = this.uriHelper.generateBaseUri(`/${purchaseOrderId}/products`)
    const uri = this.uriHelper.generateUriWithQuery(base)
    try {
      const response = await this.http.getClient().delete(uri, {
        data: purchaseOrder
      })
      if (response.status !== 200) {
        throw new PurchaseOrdersBulkDeleteProductsFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new PurchaseOrdersBulkDeleteProductsFailed(error.message, { error })
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

export class PurchaseOrdersBulkAddProductsFailed extends BaseError {
  public name = 'PurchaseOrdersBulkAddProductsFailed'
  constructor (
    public message: string = 'Could not bulk add products for purchase order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersBulkAddProductsFailed.prototype)
  }
}

export class PurchaseOrdersBulkDeleteProductsFailed extends BaseError {
  public name = 'PurchaseOrdersBulkDeleteProductsFailed'
  constructor (
    public message: string = 'Could not bulk delete products for purchase order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersBulkDeleteProductsFailed.prototype)
  }
}

export class PurchaseOrdersMetaFailed extends BaseError {
  public name = 'PurchaseOrdersMetaFailed'
  constructor (
    public message: string = 'Could not get PurchaseOrder metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PurchaseOrdersMetaFailed.prototype)
  }
}
