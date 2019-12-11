import qs from 'qs'
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
  data: object[]
  metadata: object
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
  metadata?: object
  channel?: string,
  recipient?: object,
  sender?: object,
  payload_type?: string,
  payload?: object,
  channel_message?: object,
  customer: string,
  resource_type?: string,
  resource?: string,
  sent_at?: string,
  delivered_at?: string,
  status?: string,
  status_details?: object,
  type?: string
}

export class Correspondences extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/correspondences'
  endpoint: string
  http: Client
  public options: CorrespondencesOptions
  public uriHelper: UriHelper

  constructor(options: CorrespondencesOptions, http: Client) {
    super(http, { endpoint: Correspondences.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Correspondences.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: CorrespondencesQuery | undefined): Promise<CorrespondencesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
            }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new CorrespondencesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<CorrespondencesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as CorrespondencesResponse)
      } catch (error) {
        return reject(new CorrespondencesFetchFailed(undefined, { error }))
      }
    })
  }

  get(correspondenceId: string): Promise<CorrespondenceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${correspondenceId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new CorrespondenceFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Correspondence,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as CorrespondenceResponse)
      } catch (error) {
        return reject(new CorrespondenceFetchFailed(undefined, { error }))
      }
    })
  }

  put(correspondenceId: string, correspondence: Correspondence): Promise<CorrespondenceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${correspondenceId}`
      try {
        const response = await this.http.getClient().put(uri, correspondence)

        return resolve({
          data: response.data.results[0] as Correspondence,
          metadata: { count: response.data.count }
        } as CorrespondenceResponse)
      } catch (error) {
        return reject(new CorrespondencePutFailed(undefined, { error }))
      }
    })
  }

  create(correspondence: Correspondence): Promise<CorrespondenceResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, correspondence)

        return resolve({
          data: response.data.results[0] as Correspondence,
          metadata: { count: response.data.count }
        } as CorrespondenceResponse)
      } catch (error) {
        return reject(new CorrespondenceCreationFailed(undefined, { error }))
      }
    })
  }
}

export class CorrespondencesFetchFailed extends BaseError {
  public name = 'CorrespondencesFetchFailed'
  constructor(public message: string = 'Could not fetch Correspondences', properties?: any) {
    super(message, properties)
  }
}

export class CorrespondenceFetchFailed extends BaseError {
  public name = 'CorrespondenceFetchFailed'
  constructor(public message: string = 'Could not fetch correspondence', properties?: any) {
    super(message, properties)
  }
}

export class CorrespondencePutFailed extends BaseError {
  public name = 'CorrespondencePutFailed'
  constructor(public message: string = 'Could not alter correspondence', properties?: any) {
    super(message, properties)
  }
}

export class CorrespondenceCreationFailed extends BaseError {
  public name = 'CorrespondenceCreationFailed'
  constructor(public message: string = 'Could not create correspondence', properties?: any) {
    super(message, properties)
  }
}

export class CorrespondencesCountFailed extends BaseError {
  public name = 'CorrespondencesCountFailed'
  constructor(public message: string = 'Could not count the Correspondences', properties?: any) {
    super(message, properties)
  }
}
