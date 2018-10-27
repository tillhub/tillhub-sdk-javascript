import { diff, jsonPatchPathConverter } from 'just-diff'
import { Client } from '../client'
import * as errors from '../errors'

export interface VouchersOptions {
  user?: string
  base?: string
}

export interface VouchersQuery {
  limit?: number
  uri?: string
}

export interface VouchersResponse {
  data: object[]
  metadata: object
  msg?: string
}

export interface VoucherResponse {
  data: Voucher
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

type VoucherFormatTypes = 'numeric' | 'alphanumeric' | 'alphabetic'
type VoucherTypes = 'amount' | 'discount' | 'product'

export interface Voucher {
  id?: string
}

export interface Voucher {
  type?: VoucherTypes | null
  format: string | null
  format_type: VoucherFormatTypes | null
  amount?: number | null
  amount_max?: number | null
  currency?: string
  issuable?: boolean
  reissuable?: boolean
  issuer?: string
  comment?: string
  expires_at?: string
  title?: string
  partial_redemption?: boolean
  active?: boolean
  namespace?: string
  limited_to_region?: boolean
  refundable?: boolean
  mutable?: boolean
  exchange_for_cash?: boolean
  restriction_single_transaction?: boolean
}

export class Vouchers {
  endpoint: string
  http: Client
  public options: VouchersOptions

  constructor(options: VouchersOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/vouchers'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: VouchersQuery | undefined): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersFetchFailed())

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersFetchFailed())
      }
    })
  }

  delete(voucherId: string): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.VoucherDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VoucherDeleteFailed())
      }
    })
  }

  count(): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersCountFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersCountFailed())
      }
    })
  }

  getAllLogs(query?: VouchersQuery | undefined): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersLogsFetchFailed())

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersLogsFetchFailed())
      }
    })
  }

  countLogs(): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.VouchersLogsCountFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (err) {
        return reject(new errors.VouchersLogsCountFailed())
      }
    })
  }

  get(voucherId: string): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.VoucherFetchFailed())

        return resolve({
          data: response.data.results[0] as Voucher,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as VoucherResponse)
      } catch (err) {
        return reject(new errors.VoucherFetchFailed())
      }
    })
  }

  put(voucherId: string, voucher: Voucher): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}`
      try {
        const response = await this.http.getClient().put(uri, voucher)

        return resolve({
          data: response.data.results[0] as Voucher,
          metadata: { count: response.data.count }
        } as VoucherResponse)
      } catch (err) {
        return reject(new errors.VoucherPutFailed())
      }
    })
  }

  patch(source: Voucher, target: Voucher): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      if (!source.id || !target.id || source.id !== target.id) {
        return reject(
          new errors.VoucherTypeError(
            'source and target object require ID to be set and be equal to each other'
          )
        )
      }

      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${source.id}`
      try {
        const patch = diff(source, target, jsonPatchPathConverter)

        const response = await this.http.getClient()({
          method: 'PATCH',
          url: uri,
          headers: {
            'content-type': 'application/json-patch+json'
          },
          data: patch
        })

        return resolve({
          data: response.data.results[0] as Voucher,
          metadata: { count: response.data.count, patch }
        } as VoucherResponse)
      } catch (err) {
        return reject(new errors.VoucherPatchFailed())
      }
    })
  }

  create(voucher: Voucher): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, voucher)

        return resolve({
          data: response.data.results[0] as Voucher,
          metadata: { count: response.data.count }
        } as VoucherResponse)
      } catch (err) {
        return reject(new errors.VoucherCreationFailed())
      }
    })
  }
}
