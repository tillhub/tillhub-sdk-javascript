import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface PaymentMethodsOptions {
  user?: string
  base?: string
}

export interface PaymentMethodsQueryHandler {
  limit?: number
  uri?: string
  query?: PaymentMethodsQuery
}

export interface PaymentMethodsQuery extends PaymentMethodEntity {
  deleted?: boolean
  active?: boolean
  businessUnitId?: string
}

export interface PaymentMethodEntity {
  id: string
  label: string // Translation label
}

export interface PaymentMethodResponse {
  data: PaymentMethodEntity[]
  metadata: Record<string, unknown>
  next?: () => Promise<PaymentMethodResponse>
}

export class PaymentMethods extends ThBaseHandler {
  public static baseEndpoint = '/api/v3/transactions'
  endpoint: string
  http: Client
  public options: PaymentMethodsOptions
  public uriHelper: UriHelper

  constructor (options: PaymentMethodsOptions, http: Client) {
    super(http, {
      endpoint: PaymentMethods.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = PaymentMethods.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: PaymentMethodsQueryHandler | undefined): Promise<PaymentMethodResponse> {
    const base = this.uriHelper.generateBaseUri('')
    const uri = this.uriHelper.generateUriWithQuery(`${base}/payment-method`, query)

    let next
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new PaymentMethodFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<PaymentMethodResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as PaymentMethodEntity[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new PaymentMethodFetchFailed(error.message, { error })
    }
  }
}

export class PaymentMethodFetchFailed extends BaseError {
  public name = 'PaymentMethodFetchFailed'
  constructor (
    public message: string = 'Could not fetch payment method',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, PaymentMethodFetchFailed.prototype)
  }
}
