import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface CorrespondencesOptions {
  user?: string
  base?: string
}

export interface CorrespondencesQuery {
  limit?: number
  uri?: string
  query?: {
    start?: string
  }
}

export interface CorrespondencesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<CorrespondencesResponse>
}

export interface CorrespondenceResponse {
  data: Correspondence
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Correspondence {
  metadata?: Record<string, unknown>
  channel?: string
  recipient?: Record<string, unknown>
  sender?: Record<string, unknown>
  payload_type?: string
  payload?: Record<string, unknown>
  channel_message?: Record<string, unknown>
  customer: string
  resource_type?: string
  resource?: string
  sent_at?: string
  delivered_at?: string
  status?: string
  status_details?: Record<string, unknown>
  type?: string
}

export class Correspondences extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/correspondences'
  endpoint: string
  http: Client
  public options: CorrespondencesOptions
  public uriHelper: UriHelper

  constructor (options: CorrespondencesOptions, http: Client) {
    super(http, {
      endpoint: Correspondences.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Correspondences.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: CorrespondencesQuery | undefined): Promise<CorrespondencesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CorrespondencesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<CorrespondencesResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new CorrespondencesFetchFailed(error.message, { error })
    }
  }

  async get (correspondenceId: string): Promise<CorrespondenceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${correspondenceId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new CorrespondenceFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Correspondence,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CorrespondenceFetchFailed(error.message, { error })
    }
  }

  async put (correspondenceId: string, correspondence: Correspondence): Promise<CorrespondenceResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${correspondenceId}`)
    try {
      const response = await this.http.getClient().put(uri, correspondence)

      return {
        data: response.data.results[0] as Correspondence,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CorrespondencePutFailed(error.message, { error })
    }
  }

  async create (correspondence: Correspondence): Promise<CorrespondenceResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, correspondence)

      return {
        data: response.data.results[0] as Correspondence,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new CorrespondenceCreationFailed(error.message, { error })
    }
  }
}

export class CorrespondencesFetchFailed extends BaseError {
  public name = 'CorrespondencesFetchFailed'
  constructor (
    public message: string = 'Could not fetch Correspondences',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CorrespondencesFetchFailed.prototype)
  }
}

export class CorrespondenceFetchFailed extends BaseError {
  public name = 'CorrespondenceFetchFailed'
  constructor (
    public message: string = 'Could not fetch correspondence',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CorrespondenceFetchFailed.prototype)
  }
}

export class CorrespondencePutFailed extends BaseError {
  public name = 'CorrespondencePutFailed'
  constructor (
    public message: string = 'Could not alter correspondence',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CorrespondencePutFailed.prototype)
  }
}

export class CorrespondenceCreationFailed extends BaseError {
  public name = 'CorrespondenceCreationFailed'
  constructor (
    public message: string = 'Could not create correspondence',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CorrespondenceCreationFailed.prototype)
  }
}
