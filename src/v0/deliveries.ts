import { Client } from '../client'
import * as errors from '../errors'

export interface DeliveriesCreateRequestObject {
  query?: DeliveriesCreateQuery
  body: DeliveriesCreateBody
}

export interface DeliveriesUpdateRequestObject {
  query: DeliveriesUpdateQuery
  body: DeliveriesUpdateBody
}

export interface DeliveriesOptions {
  user?: string
  base?: string
}

export interface DeliveriesGetAllQuery {
  limit?: number
  embed?: string[]
  uri?: string
}

export interface DeliveriesGetOneQuery {
  deliveryId: string
  embed?: string[]
}

export interface DeliveriesCreateQuery {
  limit?: number
  embed?: string[]
}

export interface DeliveriesUpdateQuery {
  deliveryId: string
  embed?: string[]
}

export interface DeliveriesDeleteQuery {
  deliveryId: string
}

export interface DeliveriesResponse {
  data: object[]
  metadata: object
  next?: Promise<DeliveriesResponse>
  msg?: string
}

export interface DeliveriesCreateBody {
  items: object[]
  order?: string | null
  open?: boolean
  deleted?: boolean
  ordered_at?: string | null
  received?: boolean
  delivered?: boolean
  dispatched?: boolean
  revoked?: boolean
  received_at?: string | null
  dispatched_at?: string | null
  delivered_at?: string | null
  revoked_at?: string | null
  comments?: string | null
  from?: string | null
  to?: string | null
  recipient?: object | null
  sender?: object | null
  metadata?: object
  orders?: object[]
  issuer?: object
  stock_mode?: string | null
  status?: string | null
}

export interface DeliveriesUpdateBody {
  order?: string | null
  open?: boolean
  deleted?: boolean
  ordered_at?: string | null
  received?: boolean
  delivered?: boolean
  dispatched?: boolean
  revoked?: boolean
  received_at?: string | null
  dispatched_at?: string | null
  delivered_at?: string | null
  revoked_at?: string | null
  comments?: string | null
  from?: string | null
  to?: string | null
  recipient?: object | null
  sender?: object | null
  metadata?: object
  orders?: object[]
  issuer?: object
  stock_mode?: string | null
  status?: string | null
}

export class Deliveries {
  endpoint: string
  http: Client
  public options: DeliveriesOptions

  constructor(options: DeliveriesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/deliveries'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: DeliveriesGetAllQuery | undefined): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri
      let next

      try {
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        if (query && query.embed) {
          const queryString = query.embed
            .map(item => {
              return `embed[]=${item}`
            })
            .join('&')

          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesFetchAllFailed())
      }
    })
  }

  getOne(query: DeliveriesGetOneQuery): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.deliveryId}`

      try {
        if (query.embed) {
          const queryString = query.embed
            .map(item => {
              return `embed[]=${item}`
            })
            .join('&')

          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesFetchOneFailed())
      }
    })
  }

  createDelivery(requestObject: DeliveriesCreateRequestObject): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}`

      try {
        if (query && query.embed) {
          const queryString = query.embed
            .map(item => {
              return `embed[]=${item}`
            })
            .join('&')

          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().post(uri, body)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesCreateFailed())
      }
    })
  }

  updateDelivery(requestObject: DeliveriesUpdateRequestObject): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.deliveryId}`

      if (query.embed) {
        const queryString = query.embed
          .map(item => {
            return `embed[]=${item}`
          })
          .join('&')

        uri = `${uri}?${queryString}`
      }

      try {
        const response = await this.http.getClient().put(uri, body)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesUpdateFailed())
      }
    })
  }

  deleteDelivery(query: DeliveriesDeleteQuery): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.deliveryId}`
      try {
        const response = await this.http.getClient().delete(uri)

        return resolve({
          msg: response.data.msg
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesDeleteFailed())
      }
    })
  }
}
