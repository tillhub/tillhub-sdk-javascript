import { Client } from '../../../client'
import { UriHelper } from '../../../uri-helper'
import * as errors from '../../../errors/analytics'

export interface PaymentOptionsOptions {
  user?: string
  base?: string
}

export interface PaymentOptionsResponse {
  data: object[]
  metadata: object
}

export interface PaymentOptionsQuery {
  start?: string
  end?: string
  branch_number?: string
  register_id?: string
  payment_method?: string
  uri?: string
  format?: string
  legacy?: boolean
  cursor_field?: string
}

export class PaymentOptions {
  http: Client
  public options: PaymentOptionsOptions
  public uriHelper: UriHelper

  constructor(options: PaymentOptionsOptions, http: Client, uriHelper: UriHelper) {
    this.options = options
    this.http = http
    this.uriHelper = uriHelper
  }

  getAll(query?: PaymentOptionsQuery): Promise<PaymentOptionsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/payment_options')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as PaymentOptionsResponse)

      } catch (err) {
        return reject(new errors.ReportsPaymentOptionsFetchAllFailed())
      }
    })
  }

  meta(query?: PaymentOptionsQuery): Promise<PaymentOptionsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/reports/payment_options/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, query)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) return reject(new errors.ReportsPaymentOptionsMetaFailed(undefined, { status: response.status }))

        if (!response.data.results[0]) {
          return reject(
            new errors.ReportsPaymentOptionsMetaFailed('Could not get balances metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as PaymentOptionsResponse)

      } catch (err) {
        return reject(new errors.ReportsPaymentOptionsMetaFailed())
      }
    })
  }
}
