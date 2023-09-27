import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface DocumentsOptions {
  user?: string
  base?: string
}

export interface DocumentsMetaQuery {
  documentNumber?: string
}

export interface DocumentsMultipleResponse {
  data: Document[]
  metadata?: Record<string, unknown>
  next?: () => Promise<DocumentsMultipleResponse>
}

export interface Document {
  id: string
  createdAt?: string
  createdBy?: string
  documentType: string
  filter: Record<string, any>
  location: string | null
  expireDate: string | null
}

export class Documents extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/documents'
  endpoint: string
  http: Client
  public options: DocumentsOptions
  public uriHelper: UriHelper

  constructor(options: DocumentsOptions, http: Client) {
    super(http, {
      endpoint: Documents.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Documents.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll(query?: Record<string, unknown>): Promise<DocumentsMultipleResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new DocumentsGetFailed(undefined, { status: response.status })
      }
      if (response.data.cursor?.next) {
        next = (): Promise<DocumentsMultipleResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new DocumentsGetFailed(error.message, { error })
    }
  }

  async meta(q?: DocumentsMetaQuery | undefined): Promise<DocumentsMultipleResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, q)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new DocumentsMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new DocumentsMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DocumentsMetaFailed(error.message, { error })
    }
  }
}

export class DocumentsGetFailed extends BaseError {
  public name = 'DocumentsGetFailed'
  constructor(
    public message: string = 'Could not get document',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsGetFailed.prototype)
  }
}

export class DocumentsMetaFailed extends BaseError {
  public name = 'DocumentsMetaFailed'
  constructor(
    public message: string = 'Could not get documents metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsMetaFailed.prototype)
  }
}
