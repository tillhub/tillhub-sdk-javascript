
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
  status: 'pending' | 'completed' | 'error'
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

export interface DocumentExportsMetric {
  tags: {
    operation: string
    documentType: string
    result: 'success' | 'error'
  }
}

export interface DocumentExportsMetricResponse {
  data: DocumentExportsMetric
  metadata: Record<string, unknown>
}

export interface DocumentsExportsCreateResponse {
  data: {
    correlationId: string;
  }
}

export interface DocumentsExportsCreatePayload {
  documentType: string;
  email: string;
  filter: Record<string, unknown>;
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
      if (response.data.cursors?.after) {
        next = (): Promise<DocumentExportssMultipleResponse> =>
          this.getAll({ uri: response.data.cursors.after })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new DocumentExportsGetFailed(error.message, { error })
    }
  }

  async meta (query?: Record<string, unknown>): Promise<DocumentExportssMultipleResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, query)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new DocumentExportsMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new DocumentExportsMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new DocumentExportsMetaFailed(error.message, { error })
    }
  }

  async metric (metric: DocumentExportsMetric): Promise<DocumentExportsMetricResponse> {
    const uri = this.uriHelper.generateBaseUri('/metric')
    try {
      const response = await this.http.getClient().post(uri, metric)
      if (response.status !== 200) {
        throw new DocumentExportsMetricFailed(undefined, { status: response.status })
      }
      return {
        data: response.data,
        metadata: {}
      }
    } catch (error: any) {
      throw new DocumentExportsMetricFailed(error.message, { error })
    }
  }

  async create (options: DocumentsExportsCreatePayload): Promise<DocumentsExportsCreateResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, options)

      return {
        data: response.data.results[0],
      }
    } catch (error: any) {
      throw new DocumentExportsCreateFailed(error.message, { error })
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

export class DocumentExportsCreateFailed extends BaseError {
  public name = 'DocumentExportsCreateFailed'
  constructor (
    public message: string = 'Could not create document exports',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentExportsCreateFailed.prototype)
  }
}

export class DocumentExportsMetaFailed extends BaseError {
  public name = 'DocumentExportsMetaFailed'
  constructor (
    public message: string = 'Could not get document exports metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentExportsMetaFailed.prototype)
  }
}

export class DocumentExportsMetricFailed extends BaseError {
  public name = 'DocumentExportsMetricFailed'
  constructor (
    public message: string = 'Could not send document exports metric',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, DocumentExportsMetricFailed.prototype)
  }
}
