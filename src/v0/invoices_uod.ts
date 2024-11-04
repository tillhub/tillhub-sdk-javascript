import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

declare type StateTypes = 'Open' | 'Paid' | 'Dunning' | 'Encashment' | 'Cancellation' | 'Cancellation paid'
declare type DocumentTypes = 'Standard' | 'Credit Note' | 'Partial Cancellation' | 'Full Cancellation'
declare type OriginTypes = 'Ecom' | 'POS'
declare type InvoiceType = 'pdf' | 'csv'

export interface UodInvoicesResponse {
  data: UodInvoicesEntity[]
  metadata: Record<string, unknown>
  next?: () => Promise<UodInvoicesResponse>
}

export interface UodInvoicesOptions {
  user?: string
  base?: string
}

export interface UodInvoicesQueryHandler {
  limit?: number
  uri?: string
  query?: UodInvoicesQuery
  orderFields?: string[] | string
}

export interface UodInvoicesQuery extends UodInvoicesEntity {
  active?: boolean
}

export interface UodInvoicesEntity {
  document: Document
  billingPeriodStart: Date | string
  billingPeriodEnd: Date | string
  origin?: OriginTypes
  state?: StateTypes
  type?: DocumentTypes
  csvUrl?: string
  pdfUrl?: string
}

export interface Document {
  id?: string
  documentNumber?: string
  createdAt?: Date | string
  updatedAt?: Date | string
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
}

export interface DocumentsDownloadResponse {
  url?: string
  data?: string
  contentType?: string
  filename?: string
  correlationId?: string
}

export class UodInvoices extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/documents/unzer-one-invoices'
  endpoint: string
  http: Client
  public options: UodInvoicesOptions
  public uriHelper: UriHelper

  constructor (options: UodInvoicesOptions, http: Client) {
    super(http, {
      endpoint: UodInvoices.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = UodInvoices.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: UodInvoicesQueryHandler | undefined): Promise<UodInvoicesResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new UodInvoicesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<UodInvoicesResponse> => this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as UodInvoicesEntity[],
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new UodInvoicesFetchFailed(error.message, { error })
    }
  }

  async download (documentId: string, type: InvoiceType): Promise<DocumentsDownloadResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/download/${documentId}/type/${type}`)

      const response = await this.http.getClient().get(uri)
      const pdfObj = response.data.results[0]

      if ('correlationId' in pdfObj) {
        // File is being regenerated. Return the correlation id.
        return {
          correlationId: pdfObj.correlationId
        }
      }

      if ('url' in pdfObj) {
        // Direct url to the file is available. Return it alongside the filename
        return {
          url: pdfObj.url,
          filename: pdfObj.fileName
        }
      }

      return {
        data: pdfObj.base64Content,
        contentType: pdfObj.contentType,
        filename: pdfObj.fileName
      }
    } catch (error: any) {
      throw new DocumentsDownloadFailed(error.message)
    }
  }
}

export class UodInvoicesFetchFailed extends BaseError {
  public name = 'UodInvoicesFetchFailed'
  constructor (
    public message: string = 'Could not fetch invoices',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, UodInvoicesFetchFailed.prototype)
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
