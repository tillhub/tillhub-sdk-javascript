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

  async orderChargeCancel (orderId: string, payload: ChargeCancelRequest): Promise<ChargeCancelResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/charge/cancel`)

    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderChargeCancelFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ChargeCancelResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderChargeCancelFailed(error.message, { error })
    }
  }

  async orderAuthorizeCancel (orderId: string, payload: AuthorizeCancelRequest): Promise<AuthorizeCancelResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/authorize/cancel`)

    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderAuthorizeCancelFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AuthorizeCancelResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderAuthorizeCancelFailed(error.message, { error })
    }
  }

  async orderAuthorizeCharge (orderId: string, payload: AuthorizeChargeRequest): Promise<AuthorizeChargeResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${orderId}/authorize/charge`)
    try {
      const response = await this.http.getClient().post(uri, payload)
      if (response.status !== 200) {
        throw new OrderAuthorizeChargeFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as AuthorizeChargeResult,
        msg: response.data.msg,
        status: response.status
      }
    } catch (error: any) {
      throw new OrderAuthorizeChargeFailed(error.message, { error })
    }
  }
}

export class OrderChargeCancelFailed extends BaseError {
  public name = 'OrderChargeCancelFailed'
  constructor (
    public message: string = 'Could not cancel charge for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderChargeCancelFailed.prototype)
  }
}

export class OrderAuthorizeCancelFailed extends BaseError {
  public name = 'OrderAuthorizeCancelFailed'
  constructor (
    public message: string = 'Could not cancel authorize for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderAuthorizeCancelFailed.prototype)
  }
}

export class OrderAuthorizeChargeFailed extends BaseError {
  public name = 'OrderAuthorizeChargeFailed'
  constructor (
    public message: string = 'Could not authorize charge for order',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, OrderAuthorizeChargeFailed.prototype)
  }
}
