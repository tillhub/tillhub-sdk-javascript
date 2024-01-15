
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface DocumentExportsOptions {
  user?: string
  base?: string
}

export interface DocumentExportssMultipleResponse {
  data: DocumentExport[]
  metadata?: Record<string, unknown>
  next?: () => Promise<DocumentExportssMultipleResponse>
}

export interface DocumentExport {
  id: string
  documentType: string
  createdAt: string | null
  updatedAt: string | null
  isSuccess: boolean | null
  status: 'pending' | 'success' | 'error'
  documentNumber: string | null
  schedule: null | {
    id: string
    documentType: string
    startDate: string
    lastExportedAt: string | null
    email: string
    active: boolean
    createdAt: string
    updatedAt: string
  }
  user: null | {
    id: string
    customId: string
    name?: string
    email?: string
    createdAt: string
    updatedAt: string
  }
}

export class DocumentExports extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/documents/exports'
  endpoint: string
  http: Client
  public options: DocumentExportsOptions
  public uriHelper: UriHelper

  constructor (options: DocumentExportsOptions, http: Client) {
    super(http, {
      endpoint: DocumentExports.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = DocumentExports.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: Record<string, unknown>): Promise<DocumentExportssMultipleResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new DocumentExportsGetFailed(undefined, { status: response.status })
      }
      if (response.data.cursor?.next) {
        next = (): Promise<DocumentExportssMultipleResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new DocumentExportsGetFailed(error.message, { error })
    }
  }
}

export class DocumentExportsGetFailed extends BaseError {
  public name = 'DocumentExportssGetFailed'
  constructor (
    public message: string = 'Could not get document exports',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentExportsGetFailed.prototype)
  }
}
