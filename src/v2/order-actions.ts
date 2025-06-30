import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface OrderActionsOptions {
  user?: string
  base?: string
}

export interface ChargeCancelRequest {
  amount?: number
  paymentReference?: string
}

export interface ChargeCancelResponse {
  data?: ChargeCancelResult
  msg?: string
  status?: any
}

export interface ChargeCancelResult {
  id: string
  amount: string
  currency: string
}

export interface AuthorizeCancelRequest {
  amount?: number
  paymentReference?: string
  reasonCode?: string
}

export interface AuthorizeCancelResponse {
  data?: AuthorizeCancelResult
  msg?: string
  status?: any
}

export interface AuthorizeCancelResult {
  id: string
  amount: string
  currency: string
}

export interface AuthorizeChargeRequest {
  amount?: number
  paymentReference?: string
}

export interface AuthorizeChargeResponse {
  data?: AuthorizeChargeResult
  msg?: string
  status?: any
}

export interface AuthorizeChargeResult {
  id: string
  amount: string
  currency: string
}

export class OrderActions extends ThBaseHandler {
  public static baseEndpoint = '/api/v2/orders'
  endpoint: string
  http: Client
  public options: OrderActionsOptions
  public uriHelper: UriHelper

  constructor (options: OrderActionsOptions, http: Client) {
    super(http, {
      endpoint: OrderActions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = OrderActions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async orderRefund (orderId: string, payload: ChargeCancelRequest): Promise<ChargeCancelResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/charge/cancel`)

    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderRefundFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ChargeCancelResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderRefundFailed(error.message, { error })
    }
  }

  async orderCancel (orderId: string, payload: AuthorizeCancelRequest): Promise<AuthorizeCancelResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/authorize/cancel`)

    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderCancelFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AuthorizeCancelResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderCancelFailed(error.message, { error })
    }
  }

  async orderCapture (orderId: string, payload: AuthorizeChargeRequest): Promise<AuthorizeChargeResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/authorize/charge`)
    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderCaptureFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AuthorizeChargeResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderCaptureFailed(error.message, { error })
    }
  }
}

export class OrderRefundFailed extends BaseError {
  public name = 'OrderRefundFailed'
  constructor (
    public message: string = 'Could not refund order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderRefundFailed.prototype)
  }
}

export class OrderCancelFailed extends BaseError {
  public name = 'OrderCancelFailed'
  constructor (
    public message: string = 'Could not cancel authorize for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderCancelFailed.prototype)
  }
}

export class OrderCaptureFailed extends BaseError {
  public name = 'OrderCaptureFailed'
  constructor (
    public message: string = 'Could not authorize charge for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderCaptureFailed.prototype)
  }
}
