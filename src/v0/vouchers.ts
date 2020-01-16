import { diff, jsonPatchPathConverter } from 'just-diff'
import qs from 'qs'
import safeGet from 'just-safe-get'
import { Client } from '../client'
import { BaseError } from '../errors'
import { ThBaseHandler } from '../base'

export interface VouchersOptions {
  user?: string
  base?: string
}

export interface VouchersQueryOptions {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface VouchersMetaQuery {
  deleted?: boolean
  active?: boolean
}

export interface VouchersResponse {
  data: object[]
  metadata: object
  msg?: string
  next?: () => Promise<VouchersResponse>
}

export interface VoucherLogsResponse {
  data: object[]
  metadata: object
  msg?: string
  next?: () => Promise<VoucherLogsResponse>
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
  code?: string
}

export interface UsersResponse {
  data: object[]
}

export class Vouchers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/vouchers'
  endpoint: string
  http: Client
  logs: VoucherLogs
  public options: VouchersOptions

  constructor(options: VouchersOptions, http: Client) {
    super(http, { endpoint: Vouchers.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http
    this.logs = new VoucherLogs(options, http)

    this.endpoint = Vouchers.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (optionsOrQuery && optionsOrQuery.uri) {
          uri = optionsOrQuery.uri
        } else {
          let queryString = ''
          if (optionsOrQuery && (optionsOrQuery.query || optionsOrQuery.limit)) {
            queryString = qs.stringify({ limit: optionsOrQuery.limit, ...optionsOrQuery.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
            }`
        }

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

  meta(q?: VouchersMetaQuery | undefined): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const queryString = qs.stringify(q)

        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VouchersMetaFailed(undefined, { status: response.status }))
        }

        if (!response.data.results[0]) {
          return reject(
            new VouchersMetaFailed('could not get voucher metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (error) {
        return reject(new VouchersMetaFailed(undefined, { error }))
      }
    })
  }

  delete(voucherId: string): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}`
      try {
        const response = await this.http.getClient().delete(uri)
        if (response.status !== 200) {
          return reject(new VoucherDeleteFailed(undefined, { status: response.status }))
        }

        return resolve({
          msg: response.data.msg
        } as VouchersResponse)
      } catch (error) {
        return reject(new VoucherDeleteFailed(undefined, { error }))
      }
    })
  }

  count(): Promise<VouchersResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VouchersCountFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (error) {
        return reject(new VouchersCountFailed(undefined, { error }))
      }
    })
  }

  get(voucherId: string): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new VoucherFetchFailed())

        return resolve({
          data: response.data.results[0] as Voucher,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as VoucherResponse)
      } catch (error) {
        return reject(new VoucherFetchFailed(undefined, { error }))
      }
    })
  }

  getLogs(
    voucherId: string,
    optionsOrQuery?: VouchersQueryOptions | undefined
  ): Promise<VoucherLogsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (optionsOrQuery && optionsOrQuery.uri) {
          uri = optionsOrQuery.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/${voucherId}/logs`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VoucherLogsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<VoucherLogsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as VouchersResponse)
      } catch (error) {
        return reject(new VoucherLogsFetchFailed(undefined, { error }))
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
      } catch (error) {
        return reject(new VoucherPutFailed(undefined, { error }))
      }
    })
  }

  patch(source: Voucher, target: Voucher): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      if (!source.id || !target.id || source.id !== target.id) {
        return reject(
          new VoucherTypeError(
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
      } catch (error) {
        return reject(new VoucherPatchFailed(undefined, { error }))
      }
    })
  }

  create(voucher: Voucher): Promise<VoucherResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`

      let response
      try {
        response = await this.http.getClient().post(uri, voucher)
      } catch (error) {
        const { response = {} } = error
        const errorMessage = safeGet(response, 'data.error.message') || safeGet(response, 'data.msg')
        return reject(new VoucherCreationFailed(errorMessage, { error }))
      }

      if (response.status !== 200) {
        return reject(new VoucherCreationFailed(safeGet(response, 'error.message'), { status: response.status }))
      }

      return resolve({
        data: response.data.results[0] as Voucher,
        metadata: { count: response.data.count }
      } as VoucherResponse)
    })
  }

  getAllUsers(): Promise<UsersResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri = `${this.options.base}${this.endpoint}/${this.options.user}/users`

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VouchersUsersFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results
        } as UsersResponse)
      } catch (error) {
        return reject(new VouchersUsersFailed(undefined, { error }))
      }
    })
  }
}

export class VoucherLogs extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/vouchers'
  endpoint: string
  http: Client
  public options: VouchersOptions

  constructor(options: VouchersOptions, http: Client) {
    super(http, { endpoint: VoucherLogs.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = VoucherLogs.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VoucherLogsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (optionsOrQuery && optionsOrQuery.uri) {
          uri = optionsOrQuery.uri
        } else {
          let queryString = ''
          if (optionsOrQuery && (optionsOrQuery.query || optionsOrQuery.limit)) {
            queryString = qs.stringify({ limit: optionsOrQuery.limit, ...optionsOrQuery.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs${
            queryString ? `?${queryString}` : ''
            }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VouchersLogsFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<VoucherLogsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as VouchersResponse)
      } catch (error) {
        return reject(new VouchersLogsFetchFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<VoucherLogsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/logs/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new VoucherLogsMetaFailed(undefined, { status: response.status }))
        }

        if (!response.data.results[0]) {
          return reject(
            new VouchersMetaFailed('could not get voucher metadata unexpectedly')
          )
        }

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as VouchersResponse)
      } catch (error) {
        return reject(new VoucherLogsMetaFailed(undefined, { error }))
      }
    })
  }
}

export class VoucherTypeError extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string, properties?: any) {
    super(message, properties)
  }
}

export class VouchersFetchFailed extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers', properties?: any) {
    super(message, properties)
  }
}

export class VoucherLogsFetchFailed extends BaseError {
  public name = 'VoucherLogsFetchFailed'
  constructor(public message: string = 'Could not fetch the voucher logs', properties?: any) {
    super(message, properties)
  }
}

export class VoucherFetchFailed extends BaseError {
  public name = 'VoucherFetchFailed'
  constructor(public message: string = 'Could not fetch voucher', properties?: any) {
    super(message, properties)
  }
}

export class VoucherPutFailed extends BaseError {
  public name = 'VoucherPutFailed'
  constructor(public message: string = 'Could not alter voucher', properties?: any) {
    super(message, properties)
  }
}

export class VoucherPatchFailed extends BaseError {
  public name = 'VoucherPatchFailed'
  constructor(public message: string = 'Could not alter voucher', properties?: any) {
    super(message, properties)
  }
}

export class VoucherCreationFailed extends BaseError {
  public name = 'VoucherPostFailed'
  constructor(public message: string = 'Could not create voucher', properties?: any) {
    super(message, properties)
  }
}

export class VouchersCountFailed extends BaseError {
  public name = 'VouchersCountFailed'
  constructor(public message: string = 'Could not count the vouchers', properties?: any) {
    super(message, properties)
  }
}

export class VouchersMetaFailed extends BaseError {
  public name = 'VouchersMetaFailed'
  constructor(public message: string = 'Could not get voucher metadata', properties?: any) {
    super(message, properties)
  }
}

export class VoucherLogsMetaFailed extends BaseError {
  public name = 'VoucherLogsMetaFailed'
  constructor(public message: string = 'Could not get voucher logs metadata', properties?: any) {
    super(message, properties)
  }
}

export class VoucherDeleteFailed extends BaseError {
  public name = 'VoucherDeleteFailed'
  constructor(public message: string = 'Could not delete the voucher', properties?: any) {
    super(message, properties)
  }
}

export class VouchersLogsFetchFailed extends BaseError {
  public name = 'VouchersLogsFetchFailed'
  constructor(public message: string = 'Could not fetch the vouchers logs', properties?: any) {
    super(message, properties)
  }
}

export class VouchersLogsCountFailed extends BaseError {
  public name = 'VouchersLogsCountFailed'
  constructor(public message: string = 'Could not count the vouchers logs', properties?: any) {
    super(message, properties)
  }
}

export class VouchersUsersFailed extends BaseError {
  public name = 'VouchersUsersFailed'
  constructor(public message: string = 'Could not get authorized voucher users', properties?: any) {
    super(message, properties)
  }
}
