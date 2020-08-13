import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { ThBaseHandler } from '../base'

export interface ReasonsOptions {
  user?: string
  base?: string
}

export interface ReasonsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ReasonsResponse {
  data: Reason[]
  metadata: Record<string, unknown>
}

export interface ReasonResponse {
  data: Reason
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Reason {
  id?: string
  name?: string
  description?: string
  type?: string
  behavior?: Behavior
}

export interface Behavior {
  stock?: string
  stock_location?: string
  navigation?: string
}

export class Reasons extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/reasons'
  endpoint: string
  http: Client
  public options: ReasonsOptions

  constructor(options: ReasonsOptions, http: Client) {
    super(http, { endpoint: Reasons.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Reasons.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(queryOrOptions?: ReasonsQuery | undefined): Promise<ReasonsResponse> {
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
          return reject(new ReasonsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as ReasonsResponse)
      } catch (error) {
        return reject(new ReasonsFetchFailed(undefined, { error }))
      }
    })
  }

  get(reasonId: string): Promise<ReasonResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${reasonId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new ReasonsFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Reason,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ReasonResponse)
      } catch (error) {
        return reject(new ReasonsFetchOneFailed(undefined, { error }))
      }
    })
  }

  put(reasonId: string, reason: Reason): Promise<ReasonResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${reasonId}`
      try {
        const response = await this.http.getClient().put(uri, reason)

        return resolve({
          data: response.data.results[0] as Reason,
          metadata: { count: response.data.count }
        } as ReasonResponse)
      } catch (error) {
        return reject(new ReasonsPutFailed(undefined, { error }))
      }
    })
  }

  create(reason: Reason): Promise<ReasonResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, reason)

        return resolve({
          data: response.data.results[0] as Reason,
          metadata: { count: response.data.count }
        } as ReasonResponse)
      } catch (error) {
        return reject(new ReasonsCreationFailed(undefined, { error }))
      }
    })
  }

  delete(reasonId: string): Promise<ReasonResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${reasonId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new ReasonsDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ReasonResponse)
      } catch (err) {
        return reject(new ReasonsDeleteFailed())
      }
    })
  }
}

export class ReasonsFetchFailed extends BaseError {
  public name = 'ReasonsFetchFailed'
  constructor(
    public message: string = 'Could not fetch reasons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsFetchFailed.prototype)
  }
}

export class ReasonsFetchOneFailed extends BaseError {
  public name = 'ReasonsFetchOneFailed'
  constructor(
    public message: string = 'Could not fetch one reason',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsFetchOneFailed.prototype)
  }
}

export class ReasonsPutFailed extends BaseError {
  public name = 'ReasonsPutFailed'
  constructor(
    public message: string = 'Could not update reason',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsPutFailed.prototype)
  }
}

export class ReasonsCreationFailed extends BaseError {
  public name = 'ReasonsCreationFailed'
  constructor(
    public message: string = 'Could not create reasons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsCreationFailed.prototype)
  }
}

export class ReasonsDeleteFailed extends BaseError {
  public name = 'ReasonsDeleteFailed'
  constructor(
    public message: string = 'Could not delete reasons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReasonsDeleteFailed.prototype)
  }
}
