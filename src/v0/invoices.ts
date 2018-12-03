import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

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
  amount?: object | null
  currency?: string | null
  issued_at?: string | null
  balance?: number | null
  due_date?: string | null
  status?: string | null
  archived?: boolean | null
  archived_at?: string | null
  custom_id?: string | null
  external_reference_id?: string | null
  external_reference?: object | null
  metadata?: object | null
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
  amount?: object | null
  currency?: string | null
  issued_at?: string | null
  balance?: number | null
  due_date?: string | null
  status?: string | null
  archived?: boolean | null
  archived_at?: string | null
  custom_id?: string | null
  external_reference_id?: string | null
  external_reference?: object | null
  metadata?: object | null
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
  data: object[]
  metadata: object
  next?: Promise<InvoicesResponse>
  msg?: string
}

export class Invoices {
  endpoint: string
  http: Client
  public options: InvoicesOptions

  constructor(options: InvoicesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/invoices'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(q?: InvoicesQuery | undefined): Promise<InvoicesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri
      let next

      try {
        if (q && q.uri) {
          uri = q.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
        }

        const queryString = qs.stringify(q)
        if (queryString) {
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
        } as InvoicesResponse)
      } catch (err) {
        return reject(new errors.InvoicesFetchAllFailed())
      }
    })
  }

  getMeta(): Promise<InvoicesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) reject(new errors.InvoicesGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as InvoicesResponse)
      } catch (err) {
        return reject(new errors.InvoicesGetMetaFailed())
      }
    })
  }

  getOne(requestObject: InvoicesGetOneRequestObject): Promise<InvoicesResponse> {
    return new Promise(async (resolve, reject) => {
      const { invoiceId, query } = requestObject
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${invoiceId}`

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
        } as InvoicesResponse)
      } catch (err) {
        return reject(new errors.InvoicesFetchOneFailed())
      }
    })
  }

  create(requestObject: InvoicesCreateRequestObject): Promise<InvoicesResponse> {
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
        } as InvoicesResponse)
      } catch (err) {
        return reject(new errors.InvoicesCreateFailed())
      }
    })
  }

  update(requestObject: InvoicesUpdateRequestObject): Promise<InvoicesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query, invoiceId } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${invoiceId}`

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
        } as InvoicesResponse)
      } catch (err) {
        return reject(new errors.InvoicesUpdateFailed(err.message))
      }
    })
  }

  deleteOne(invoiceId: string): Promise<InvoicesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${invoiceId}`
      try {
        const response = await this.http.getClient().delete(uri)

        return resolve({
          msg: response.data.msg
        } as InvoicesResponse)
      } catch (err) {
        return reject(new errors.InvoicesDeleteFailed())
      }
    })
  }
}
