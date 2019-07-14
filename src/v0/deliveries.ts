import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

export interface DeliveriesOptions {
  user?: string
  base?: string
}

export interface DeliveriesQuery {
  limit?: number
  embed?: string[]
  uri?: string
}

export interface DeliveriesGetOneRequestObject {
  deliveryId: string
  query?: DeliveriesQuery
}

export interface DeliveriesCreateRequestObject {
  body: DeliveriesCreateBody
  query?: DeliveriesQuery
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

export interface DeliveriesUpdateRequestObject {
  body: DeliveriesUpdateBody
  deliveryId: string
  query?: DeliveriesQuery
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

export interface DeliveriesSimpleUpdateRequestBody {
  deliveryId: string
  query?: DeliveriesQuery
}

export interface DeliveryItemsCreateRequestObject {
  body: DeliveryItemsCreateBody
  query?: DeliveriesQuery
}

export interface DeliveryItemsCreateBody {
  items: object[]
}

export interface DeliveryItemsCreateBodyItem {
  product: string
  delivery: string
  position?: number
  qty?: number | null
  qty_picked?: number | null
  stock?: string
  stock_location?: string
  added_at?: string
  comments?: string | null
}

export interface DeliveryItemsGetAllRequestObject {
  deliveryId: string
  query?: DeliveriesQuery
}

export interface DeliveryItemUpdateRequestObject {
  itemId: string
  body: DeliveryItemsUpdateBody
  query?: DeliveriesQuery
}

export interface DeliveryItemsUpdateBody {
  product?: string
  delivery?: string
  position?: number
  qty?: number | null
  qty_picked?: number | null
  stock?: string
  stock_location?: string
  added_at?: string
  comments?: string | null
}

export interface DeliveriesResponse {
  data: object[]
  metadata: object
  next?: () => Promise<DeliveriesResponse>
  msg?: string
}

export class Deliveries extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/deliveries'
  endpoint: string
  http: Client
  public options: DeliveriesOptions

  constructor(options: DeliveriesOptions, http: Client) {
    super(http, { endpoint: Deliveries.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Deliveries.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: DeliveriesQuery | undefined): Promise<DeliveriesResponse> {
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
          next = (): Promise<DeliveriesResponse> => this.getAll({ uri: response.data.cursor.next })
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

  getOne(requestObject: DeliveriesGetOneRequestObject): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { deliveryId, query } = requestObject
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deliveryId}`

      try {
        if (query && query.embed) {
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

  createDeliveryPDF(deliveryId: string): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${
        this.options.user
        }/${deliveryId}/pdf?format=uri`

      try {
        const response = await this.http.getClient().post(uri, null, {
          headers: {
            Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
          }
        })

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesPDFFailed())
      }
    })
  }

  updateDelivery(requestObject: DeliveriesUpdateRequestObject): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query, deliveryId } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deliveryId}`

      if (query && query.embed) {
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

  setInProgress(requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { deliveryId, query } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${
        this.options.user
        }/${deliveryId}/in_progress`

      if (query && query.embed) {
        const queryString = query.embed
          .map(item => {
            return `embed[]=${item}`
          })
          .join('&')

        uri = `${uri}?${queryString}`
      }

      try {
        const response = await this.http.getClient().post(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesInProgressFailed())
      }
    })
  }

  dispatchDelivery(requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { deliveryId, query } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deliveryId}/dispatch`

      if (query && query.embed) {
        const queryString = query.embed
          .map(item => {
            return `embed[]=${item}`
          })
          .join('&')

        uri = `${uri}?${queryString}`
      }

      try {
        const response = await this.http.getClient().post(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as DeliveriesResponse)
      } catch (err) {
        return reject(new errors.DeliveriesDispatchFailed())
      }
    })
  }

  deleteDelivery(deliveryId: string): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deliveryId}`
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

  createDeliveryItems(
    requestObject: DeliveryItemsCreateRequestObject
  ): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/items`

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
        return reject(new errors.DeliveryItemsCreateFailed())
      }
    })
  }

  getAllDeliveryItems(
    requestObject: DeliveryItemsGetAllRequestObject
  ): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { deliveryId, query } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${deliveryId}/items`

      try {
        if (query && query.embed) {
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
        return reject(new errors.DeliveryItemsFetchAllFailed())
      }
    })
  }

  updateDeliveryItem(requestObject: DeliveryItemUpdateRequestObject): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query, itemId } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/items/${itemId}`

      if (query && query.embed) {
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
        return reject(new errors.DeliveryItemUpdateFailed())
      }
    })
  }

  deleteDeliveryItem(itemId: string): Promise<DeliveriesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/items/${itemId}`
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
