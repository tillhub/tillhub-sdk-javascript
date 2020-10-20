import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
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
  items: Array<Record<string, unknown>>
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
  recipient?: Record<string, unknown> | null
  sender?: Record<string, unknown> | null
  metadata?: Record<string, unknown>
  orders?: Array<Record<string, unknown>>
  issuer?: Record<string, unknown>
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
  recipient?: Record<string, unknown> | null
  sender?: Record<string, unknown> | null
  metadata?: Record<string, unknown>
  orders?: Array<Record<string, unknown>>
  issuer?: Record<string, unknown>
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
  items: Array<Record<string, unknown>>
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
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  next?: () => Promise<DeliveriesResponse>
  msg?: string
}

export class Deliveries extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/deliveries'
  endpoint: string
  http: Client
  public options: DeliveriesOptions
  public uriHelper: UriHelper

  constructor (options: DeliveriesOptions, http: Client) {
    super(http, {
      endpoint: Deliveries.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Deliveries.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  generateUriQueryEmbed (base: string, query?: DeliveriesQuery): string {
    const { embed, ...restQuery } = query ?? {} // eslint-disable-line @typescript-eslint/no-unused-vars
    let uri = this.uriHelper.generateUriWithQuery(base, restQuery)

    if (query?.embed) {
      const queryString = query.embed
        .map((item) => {
          return `embed[]=${item}`
        })
        .join('&')

      const connector = uri.includes('?') ? '&' : '?'
      uri = `${uri}${connector}${queryString}`
    }
    return uri
  }

  async getAll (query?: DeliveriesQuery | undefined): Promise<DeliveriesResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<DeliveriesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (err) {
      throw new errors.DeliveriesFetchAllFailed()
    }
  }

  async getOne (requestObject: DeliveriesGetOneRequestObject): Promise<DeliveriesResponse> {
    const { deliveryId, query } = requestObject
    const base = this.uriHelper.generateBaseUri(`/${deliveryId}`)
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveriesFetchOneFailed()
    }
  }

  async createDelivery (requestObject: DeliveriesCreateRequestObject): Promise<DeliveriesResponse> {
    const { body, query } = requestObject
    const base = this.uriHelper.generateBaseUri()
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().post(uri, body)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveriesCreateFailed()
    }
  }

  async createDeliveryPDF (deliveryId: string): Promise<DeliveriesResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deliveryId}/pdf?format=uri`)
    try {
      const response = await this.http.getClient().post(uri, null, {
        headers: {
          Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
        }
      })

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveriesPDFFailed()
    }
  }

  async updateDelivery (requestObject: DeliveriesUpdateRequestObject): Promise<DeliveriesResponse> {
    const { body, query, deliveryId } = requestObject
    const base = this.uriHelper.generateBaseUri(`/${deliveryId}`)
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().put(uri, body)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveriesUpdateFailed()
    }
  }

  async setInProgress (requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse> {
    const { deliveryId, query } = requestObject
    const base = this.uriHelper.generateBaseUri(`/${deliveryId}/in_progress`)
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().post(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveriesInProgressFailed()
    }
  }

  async dispatchDelivery (requestObject: DeliveriesSimpleUpdateRequestBody): Promise<DeliveriesResponse> {
    const { deliveryId, query } = requestObject
    const base = this.uriHelper.generateBaseUri(`/${deliveryId}/dispatch`)
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().post(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveriesDispatchFailed()
    }
  }

  async deleteDelivery (deliveryId: string): Promise<DeliveriesResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${deliveryId}`)
    try {
      const response = await this.http.getClient().delete(uri)

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new errors.DeliveriesDeleteFailed()
    }
  }

  async createDeliveryItems (
    requestObject: DeliveryItemsCreateRequestObject
  ): Promise<DeliveriesResponse> {
    const { body, query } = requestObject
    const base = this.uriHelper.generateBaseUri('/items')
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().post(uri, body)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveryItemsCreateFailed()
    }
  }

  async getAllDeliveryItems (
    requestObject: DeliveryItemsGetAllRequestObject
  ): Promise<DeliveriesResponse> {
    const { deliveryId, query } = requestObject
    const base = this.uriHelper.generateBaseUri(`/${deliveryId}/items`)
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveryItemsFetchAllFailed()
    }
  }

  async updateDeliveryItem (requestObject: DeliveryItemUpdateRequestObject): Promise<DeliveriesResponse> {
    const { body, query, itemId } = requestObject
    const base = this.uriHelper.generateBaseUri(`/items/${itemId}`)
    const uri = this.generateUriQueryEmbed(base, query)

    try {
      const response = await this.http.getClient().put(uri, body)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.DeliveryItemUpdateFailed()
    }
  }

  async deleteDeliveryItem (itemId: string): Promise<DeliveriesResponse> {
    const uri = this.uriHelper.generateBaseUri(`/items/${itemId}`)
    try {
      const response = await this.http.getClient().delete(uri)

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new errors.DeliveriesDeleteFailed()
    }
  }
}
