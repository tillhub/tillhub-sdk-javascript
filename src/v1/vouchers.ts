import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import {
  Vouchers as VoucherV0,
  VouchersOptions
} from '../v0/vouchers'

/**
 * @extends "VoucherV0"
 */

export interface VouchersQueryOptions {
  limit?: number
  uri?: string
  deleted?: boolean
  active?: boolean
  code?: string
  expires_at_start?: boolean
  expires_at_end?: boolean
  amount_from?: string
  amount_to?: string
  regions?: string[] | string
  issuable?: boolean
  reissuable?: boolean
  expires_at?: string
  partial_redemption?: boolean
  limited_to_region?: boolean
  refundable?: boolean
  mutable?: boolean
  exchange_for_cash?: boolean
  is_campaign?: boolean
}

export interface VouchersResponse {
  data: object[]
  metadata: object
  msg?: string
  next?: () => Promise<VouchersResponse>
}

export class Vouchers extends VoucherV0 {
  public static baseEndpointV1 = '/api/v1/vouchers'
  public endpointV1: string
  public uriHelperV1: UriHelper

  constructor(options: VouchersOptions, http: Client) {
    super(options, http)

    this.endpointV1 = Vouchers.baseEndpointV1
    this.uriHelperV1 = new UriHelper(this.endpointV1, options)
  }

  getAll(optionsOrQuery?: VouchersQueryOptions): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelperV1.generateBaseUri()
        const uri = this.uriHelperV1.generateUriWithQuery(base, optionsOrQuery)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VouchersFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<VouchersResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as VouchersResponse)
      } catch (error) {
        return reject(new VouchersFetchFailed(undefined, { error }))
      }
    })
  }
}

export class VouchersFetchFailed extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers', properties?: any) {
    super(message, properties)
  }
}
