import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface DocumentsOptions {
  user?: string
  base?: string
}

export interface DocumentsMultipleResponse {
  data: Document[]
  metadata?: Record<string, unknown>
  next?: () => Promise<DocumentsMultipleResponse>
}

export interface Document {
  createdAt?: string
  documentNumber: string
  documentType: string
  id: string
  updatedAt?: string
}

export interface DocumentsSendBody {
  partnerName: string
  recipients: string[]
}

export interface DocumentsPreviewQuery {
  partnerName: string
}

export interface DocumentsPreviewResponse {
  data: {
    subject?: string
    body?: string
  }
}

export interface DocumentsSendResponse {
  data: { success: true }
  msg: string
}

export interface DocumentsDownloadResponse {
  data?: string
  contentType?: string
  filename?: string
}

export interface DocumentsBulkDownloadBody {
  documentIds: string[]
}

export class Documents extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/documents'
  endpoint: string
  http: Client
  public options: DocumentsOptions
  public uriHelper: UriHelper

  constructor (options: DocumentsOptions, http: Client) {
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

  async getAll (query?: Record<string, unknown>): Promise<DocumentsMultipleResponse> {
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

  async meta (query?: Record<string, unknown>): Promise<DocumentsMultipleResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, query)
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

  async preview (documentId: string, query: DocumentsPreviewQuery): Promise<DocumentsPreviewResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${documentId}/preview`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results[0]
      }
    } catch (error: any) {
      throw new DocumentsPreviewFailed(error.message)
    }
  }

  async send (documentId: string, body: DocumentsSendBody): Promise<DocumentsSendResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${documentId}/send`)

      const response = await this.http.getClient().post(uri, body)

      return {
        data: response.data.results[0],
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new DocumentsSendFailed(error.message)
    }
  }

  async download (documentId: string): Promise<DocumentsDownloadResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${documentId}/download`)

      const response = await this.http.getClient().get(uri)
      const pdfObj = response.data.results[0]

      return {
        data: pdfObj.base64Content,
        contentType: pdfObj.contentType,
        filename: pdfObj.fileName
      }
    } catch (error: any) {
      throw new DocumentsDownloadFailed(error.message)
    }
  }

  async bulkDownload (body: DocumentsBulkDownloadBody): Promise<DocumentsDownloadResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/download`)

      const response = await this.http.getClient().post(uri, body)
      const pdfObj = response.data.results[0]

      return {
        data: pdfObj.base64Content,
        contentType: pdfObj.contentType,
        filename: pdfObj.fileName
      }
    } catch (error: any) {
      throw new DocumentsBulkDownloadFailed(error.message)
    }
  }
}

export class DocumentsGetFailed extends BaseError {
  public name = 'DocumentsGetFailed'
  constructor (
    public message: string = 'Could not get document',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsGetFailed.prototype)
  }
}

export class DocumentsMetaFailed extends BaseError {
  public name = 'DocumentsMetaFailed'
  constructor (
    public message: string = 'Could not get documents metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsMetaFailed.prototype)
  }
}

class DocumentsPreviewFailed extends BaseError {
  public name = 'DocumentsPreviewFailed'
  constructor (
    public message: string = 'Could not create preview',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsPreviewFailed.prototype)
  }
}

export class DocumentsSendFailed extends BaseError {
  public name = 'DocumentsSendFailed'
  constructor (
    public message: string = 'Could not send email',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsSendFailed.prototype)
  }
}

export class DocumentsDownloadFailed extends BaseError {
  public name = 'DocumentsDownloadFailed'
  constructor (
    public message: string = 'Could not download file',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsDownloadFailed.prototype)
  }
}

export class DocumentsBulkDownloadFailed extends BaseError {
  public name = 'DocumentsBulkDownloadFailed'
  constructor (
    public message: string = 'Could not download files',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentsBulkDownloadFailed.prototype)
  }
}
