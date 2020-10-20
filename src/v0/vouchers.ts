import { diff, jsonPatchPathConverter } from 'just-diff'
import safeGet from 'just-safe-get'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { Customer } from './customers'

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
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<VouchersResponse>
}

export interface VoucherLogsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
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

export interface BoundedCustomersGetResponse {
  data?: Customer[]
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface BoundedCustomersPostResponse {
  data: {
    id: string
    voucher_id: string
    customer_id: string
  }
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
  data: Array<Record<string, unknown>>
}

export class Vouchers extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/vouchers'
  endpoint: string
  http: Client
  logs: VoucherLogs
  public options: VouchersOptions
  public uriHelper: UriHelper

  constructor (options: VouchersOptions, http: Client) {
    super(http, {
      endpoint: Vouchers.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http
    this.logs = new VoucherLogs(options, http)

    this.endpoint = Vouchers.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VouchersResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VouchersFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<VouchersResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new VouchersFetchFailed(undefined, { error })
    }
  }

  async meta (q?: VouchersMetaQuery | undefined): Promise<VouchersResponse> {
    try {
      const base = this.uriHelper.generateBaseUri('/meta')
      const uri = this.uriHelper.generateUriWithQuery(base, q)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VouchersMetaFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) {
        throw new VouchersMetaFailed('could not get voucher metadata unexpectedly')
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new VouchersMetaFailed(undefined, { error })
    }
  }

  async delete (voucherId: string): Promise<VouchersResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${voucherId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) {
        throw new VoucherDeleteFailed(undefined, { status: response.status })
      }

      return {
        msg: response.data.msg
      }
    } catch (error) {
      throw new VoucherDeleteFailed(undefined, { error })
    }
  }

  async count (): Promise<VouchersResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VouchersCountFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new VouchersCountFailed(undefined, { error })
    }
  }

  async get (voucherId: string): Promise<VoucherResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${voucherId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new VoucherFetchFailed()

      return {
        data: response.data.results[0] as Voucher,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new VoucherFetchFailed(undefined, { error })
    }
  }

  async getLogs (
    voucherId: string,
    optionsOrQuery?: VouchersQueryOptions | undefined
  ): Promise<VoucherLogsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri(`/${voucherId}/logs`)
      const uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VoucherLogsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<VoucherLogsResponse> => this.getLogs(voucherId, { uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error) {
      throw new VoucherLogsFetchFailed(undefined, { error })
    }
  }

  async put (voucherId: string, voucher: Voucher): Promise<VoucherResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${voucherId}`)
    try {
      const response = await this.http.getClient().put(uri, voucher)

      return {
        data: response.data.results[0] as Voucher,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new VoucherPutFailed(undefined, { error })
    }
  }

  async patch (source: Voucher, target: Voucher): Promise<VoucherResponse> {
    if (!source.id || !target.id || source.id !== target.id) {
      throw new VoucherTypeError(
        'source and target Record<string, unknown> require ID to be set and be equal to each other'
      )
    }
    const uri = this.uriHelper.generateBaseUri(`/${source.id}`)

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

      return {
        data: response.data.results[0] as Voucher,
        metadata: { count: response.data.count, patch }
      }
    } catch (error) {
      throw new VoucherPatchFailed(undefined, { error })
    }
  }

  async create (voucher: Voucher): Promise<VoucherResponse> {
    const uri = this.uriHelper.generateBaseUri()

    let response
    try {
      response = await this.http.getClient().post(uri, voucher)
    } catch (error) {
      const responseStatus = safeGet(error, 'response.status')

      if (responseStatus === 409) {
        throw new VoucherCodeConflict(undefined, { error })
      } else {
        throw new VoucherCreationFailed(undefined, { error })
      }
    }

    if (response.status !== 200) {
      throw new VoucherCreationFailed(safeGet(response, 'error.message'), { status: response.status })
    }
    return {
      data: response.data.results[0] as Voucher,
      metadata: { count: response.data.count }
    }
  }

  async getAllUsers (): Promise<UsersResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/users')

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VouchersUsersFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results
      }
    } catch (error) {
      throw new VouchersUsersFailed(undefined, { error })
    }
  }

  async getBoundedCustomers (voucherId: string): Promise<BoundedCustomersGetResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${voucherId}/customers`)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VouchersBoundedCustomerGetFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results
      }
    } catch (error) {
      throw new VouchersBoundedCustomerGetFailed(undefined, { error })
    }
  }

  async createBoundedCustomers (
    voucherId: string,
    customers: string[]
  ): Promise<BoundedCustomersPostResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${voucherId}/customers`)

      const response = await this.http.getClient().post(uri, customers)
      if (response.status !== 200) {
        throw new VouchersBoundedCustomerCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results
      }
    } catch (error) {
      throw new VouchersBoundedCustomerCreateFailed(undefined, { error })
    }
  }

  async updateBoundedCustomers (
    voucherId: string,
    customers: string[]
  ): Promise<BoundedCustomersPostResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${voucherId}/customers`)

      const response = await this.http.getClient().put(uri, customers)
      if (response.status !== 200) {
        throw new VouchersBoundedCustomerPutFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results
      }
    } catch (error) {
      throw new VouchersBoundedCustomerPutFailed(undefined, { error })
    }
  }
}

export class VoucherLogs extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/vouchers'
  endpoint: string
  http: Client
  public options: VouchersOptions
  public uriHelper: UriHelper

  constructor (options: VouchersOptions, http: Client) {
    super(http, {
      endpoint: VoucherLogs.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = VoucherLogs.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (optionsOrQuery?: VouchersQueryOptions | undefined): Promise<VoucherLogsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri('/logs')
      const uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VouchersLogsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<VoucherLogsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new VouchersLogsFetchFailed(undefined, { error })
    }
  }

  async meta (): Promise<VoucherLogsResponse> {
    const uri = this.uriHelper.generateBaseUri('/logs/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new VoucherLogsMetaFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) {
        throw new VouchersMetaFailed('could not get voucher metadata unexpectedly')
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new VoucherLogsMetaFailed(undefined, { error })
    }
  }
}

export class VoucherTypeError extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor (public message: string, properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherTypeError.prototype)
  }
}

export class VouchersFetchFailed extends BaseError {
  public name = 'VouchersFetchFailed'
  constructor (
    public message: string = 'Could not fetch the vouchers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersFetchFailed.prototype)
  }
}

export class VoucherLogsFetchFailed extends BaseError {
  public name = 'VoucherLogsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the voucher logs',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherLogsFetchFailed.prototype)
  }
}

export class VoucherFetchFailed extends BaseError {
  public name = 'VoucherFetchFailed'
  constructor (
    public message: string = 'Could not fetch voucher',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherFetchFailed.prototype)
  }
}

export class VoucherPutFailed extends BaseError {
  public name = 'VoucherPutFailed'
  constructor (
    public message: string = 'Could not alter voucher',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherPutFailed.prototype)
  }
}

export class VoucherPatchFailed extends BaseError {
  public name = 'VoucherPatchFailed'
  constructor (
    public message: string = 'Could not alter voucher',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherPatchFailed.prototype)
  }
}

export class VoucherCreationFailed extends BaseError {
  public name = 'VoucherPostFailed'
  constructor (
    public message: string = 'Could not create voucher',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherCreationFailed.prototype)
  }
}

export class VoucherCodeConflict extends BaseError {
  public name = 'VoucherCodeConflict'
  constructor (
    public message: string = 'This voucher code is already in use. Please use another code.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherCodeConflict.prototype)
  }
}

export class VouchersCountFailed extends BaseError {
  public name = 'VouchersCountFailed'
  constructor (
    public message: string = 'Could not count the vouchers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersCountFailed.prototype)
  }
}

export class VouchersMetaFailed extends BaseError {
  public name = 'VouchersMetaFailed'
  constructor (
    public message: string = 'Could not get voucher metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersMetaFailed.prototype)
  }
}

export class VoucherLogsMetaFailed extends BaseError {
  public name = 'VoucherLogsMetaFailed'
  constructor (
    public message: string = 'Could not get voucher logs metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherLogsMetaFailed.prototype)
  }
}

export class VoucherDeleteFailed extends BaseError {
  public name = 'VoucherDeleteFailed'
  constructor (
    public message: string = 'Could not delete the voucher',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VoucherDeleteFailed.prototype)
  }
}

export class VouchersLogsFetchFailed extends BaseError {
  public name = 'VouchersLogsFetchFailed'
  constructor (
    public message: string = 'Could not fetch the vouchers logs',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersLogsFetchFailed.prototype)
  }
}

export class VouchersLogsCountFailed extends BaseError {
  public name = 'VouchersLogsCountFailed'
  constructor (
    public message: string = 'Could not count the vouchers logs',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersLogsCountFailed.prototype)
  }
}

export class VouchersUsersFailed extends BaseError {
  public name = 'VouchersUsersFailed'
  constructor (
    public message: string = 'Could not get authorized voucher users',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersUsersFailed.prototype)
  }
}

export class VouchersBoundedCustomerGetFailed extends BaseError {
  public name = 'VouchersBoundedCustomerGetFailed'
  constructor (
    public message: string = 'Could not get the voucher bounded customers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersBoundedCustomerGetFailed.prototype)
  }
}

export class VouchersBoundedCustomerCreateFailed extends BaseError {
  public name = 'VouchersBoundedCustomerCreateFailed'
  constructor (
    public message: string = 'Could not create the voucher bounded customers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersBoundedCustomerCreateFailed.prototype)
  }
}

export class VouchersBoundedCustomerPutFailed extends BaseError {
  public name = 'VouchersBoundedCustomerPutFailed'
  constructor (
    public message: string = 'Could not update the voucher bounded customers',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VouchersBoundedCustomerPutFailed.prototype)
  }
}
