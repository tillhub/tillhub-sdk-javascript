import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface InvoicesOptions {
  user?: string
  base?: string
}

export interface InvoicesQuery {
  limit?: number
  offset?: number
  filter?: string
  order_by?: string
  direction?: string
  location?: string
  embed?: string[]
  uri?: string
  archived?: boolean
  deleted?: boolean
  active?: boolean
}

export interface InvoicesGetOneRequestObject {
  invoiceId: string
  query?: InvoicesQuery
}

export interface InvoicesCreateRequestObject {
  body: InvoicesCreateBody
  query?: InvoicesQuery
}

export interface InvoicesCreateBody {
  comments?: string | null
  customer?: string | null
  customer_external_reference_id?: string | null
  amount?: Record<string, unknown> | null
  currency?: string | null
  issued_at?: string | null
  balance?: number | null
  due_date?: string | null
  status?: string | null
  archived?: boolean | null
  archived_at?: string | null
  custom_id?: string | null
  external_reference_id?: string | null
  external_reference?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
  origins?: string[] | null
  related_to?: string[] | null
  depends_on?: string[] | null
  deleted?: boolean | null
  active?: boolean | null
  assignee?: string | null
  assigned_by?: string | null
}

export interface InvoicesUpdateRequestObject {
  body: InvoicesUpdateBody
  invoiceId: string
  query?: InvoicesQuery
}

export interface InvoicesUpdateBody {
  comments?: string | null
  customer?: string | null
  customer_external_reference_id?: string | null
  amount?: Record<string, unknown> | null
  currency?: string | null
  issued_at?: string | null
  balance?: number | null
  due_date?: string | null
  status?: string | null
  archived?: boolean | null
  archived_at?: string | null
  custom_id?: string | null
  external_reference_id?: string | null
  external_reference?: Record<string, unknown> | null
  metadata?: Record<string, unknown> | null
  origins?: string[] | null
  related_to?: string[] | null
  depends_on?: string[] | null
  deleted?: boolean | null
  active?: boolean | null
  assignee?: string | null
  assigned_by?: string | null
}

export interface InvoicesSimpleUpdateRequestBody {
  invoiceId: string
  query?: InvoicesQuery
}

export interface InvoicesResponse {
  data?: Array<Record<string, unknown>>
  metadata?: Record<string, unknown>
  next?: () => Promise<InvoicesResponse>
  msg?: string
}

export class Invoices extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/invoices'
  endpoint: string
  http: Client
  public options: InvoicesOptions
  public uriHelper: UriHelper

  constructor (options: InvoicesOptions, http: Client) {
    super(http, {
      endpoint: Invoices.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Invoices.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  generateUriQueryEmbed (base: string, query?: InvoicesQuery): string {
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

  async getAll (query?: InvoicesQuery | undefined): Promise<InvoicesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<InvoicesResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new errors.InvoicesFetchAllFailed(error.message, { error })
    }
  }

  async getMeta (): Promise<InvoicesResponse> {
    const uri = this.uriHelper.generateBaseUri('/meta')

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.InvoicesGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.InvoicesGetMetaFailed(error.message, { error })
    }
  }

  async getOne (requestObject: InvoicesGetOneRequestObject): Promise<InvoicesResponse> {
    const { invoiceId, query } = requestObject

    try {
      const base = this.uriHelper.generateBaseUri(`/${invoiceId}`)
      const uri = this.generateUriQueryEmbed(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.InvoicesFetchOneFailed()
    }
  }

  async create (requestObject: InvoicesCreateRequestObject): Promise<InvoicesResponse> {
    const { body, query } = requestObject

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.generateUriQueryEmbed(base, query)

      const response = await this.http.getClient().post(uri, body)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.InvoicesCreateFailed(error.message, { error })
    }
  }

  async update (requestObject: InvoicesUpdateRequestObject): Promise<InvoicesResponse> {
    const { body, query, invoiceId } = requestObject

    try {
      const base = this.uriHelper.generateBaseUri(`/${invoiceId}`)
      const uri = this.generateUriQueryEmbed(base, query)

      const response = await this.http.getClient().put(uri, body)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.InvoicesUpdateFailed(error.message, { error })
    }
  }

  async deleteOne (invoiceId: string): Promise<InvoicesResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${invoiceId}`)
      const response = await this.http.getClient().delete(uri)

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.InvoicesDeleteFailed(error.message, { error })
    }
  }
}
