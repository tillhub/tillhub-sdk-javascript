import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'

export type TransactionBatchUploadSource = 'UOD'

export enum FileStatus {
  UPLOADING = 'UPLOADING',
  UPLOADED = 'UPLOADED',
  PROCESSING = 'PROCESSING',
  UPLOAD_FAILED = 'UPLOAD_FAILED',
  PROCESSING_FAILED = 'PROCESSING_FAILED',
  PROCESSING_DONE = 'PROCESSING_DONE'
}

export interface FileBatch {
  id: number
  inputFileName: string
  inputFileFormat: 'csv'
  uploadedOn: string
  inputFileSize: number
  state: FileStatus
  createdBy: string
  outputFileName: string
}

export interface FileBatchFilters {
  fileName?: string
  state?: FileStatus
  uploadedOn?: string
  inputFileSize?: number
}

export interface TransactionBatchesQuery extends FileBatchFilters {
  active?: boolean
}

export interface TransactionBatchesQueryHandler {
  limit?: number
  uri?: string
  query?: TransactionBatchesQuery
  orderFields?: string[] | string
}

export interface FileUploadPayload {
  publicKey: string
  unzerId: string
  createdBy: string
  source: TransactionBatchUploadSource
  file: File
}

export interface TransactionBatchesOptions {
  user?: string
  base?: string
}

export interface TransactionBatchUploadResponse {
  data?: Record<string, unknown>
  msg?: string
}

export interface TransactionBatchesListResponse {
  data: FileBatch[]
  metadata: Record<string, unknown>
  next?: () => Promise<TransactionBatchesListResponse>
}

export interface TransactionBatchesMetaData {
  data: Record<string, unknown>
  metadata: Record<string, unknown>
}

export class TransactionBatches {
  endpoint: string
  http: Client
  public options: TransactionBatchesOptions
  public uriHelper: UriHelper

  constructor (options: TransactionBatchesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/transaction-batches'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  /**
   * List transaction batches.
   * GET /api/v0/transaction-batches
   */
  async getAll (query?: TransactionBatchesQueryHandler | undefined): Promise<TransactionBatchesListResponse> {
    let next
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TransactionBatchesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursors?.after) {
        next = (): Promise<TransactionBatchesListResponse> =>
          this.getAll({ ...query, uri: response.data.cursors.after })
      }

      return {
        data: response.data.results as FileBatch[],
        metadata: { cursor: response.data.cursors },
        next
      }
    } catch (error: any) {
      throw new TransactionBatchesFetchFailed(error.message, { error })
    }
  }

  /**
   * Get transaction batches metadata (e.g. total count).
   * GET /api/v0/transaction-batches/meta
   */
  async meta (query?: TransactionBatchesQueryHandler | undefined): Promise<TransactionBatchesMetaData> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(`${base}/meta`, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new TransactionBatchesMetaFailed(undefined, { status: response.status })
      }
      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new TransactionBatchesMetaFailed(error.message, { error })
    }
  }

  /**
   * Download the processed batch file.
   * GET /api/v0/transaction-batches/:id/download
   */
  async download (id: string | number): Promise<Blob> {
    const base = this.uriHelper.generateBaseUri(`/${id}/download`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri, {
        responseType: 'blob'
      })
      if (response.status !== 200) {
        throw new TransactionBatchDownloadFailed(undefined, { status: response.status })
      }
      return response.data as Blob
    } catch (error: any) {
      throw new TransactionBatchDownloadFailed(error.message, { error })
    }
  }

  /**
   * Download the originally uploaded file (before processing).
   * GET /api/v0/transaction-batches/:id/download-input
   */
  async downloadInput (id: string | number): Promise<Blob> {
    const base = this.uriHelper.generateBaseUri(`/${id}/download-input`)
    const uri = this.uriHelper.generateUriWithQuery(base)

    try {
      const response = await this.http.getClient().get(uri, {
        responseType: 'blob'
      })
      if (response.status !== 200) {
        throw new TransactionBatchDownloadInputFailed(undefined, { status: response.status })
      }
      return response.data as Blob
    } catch (error: any) {
      throw new TransactionBatchDownloadInputFailed(error.message, { error })
    }
  }

  /**
   * Upload a transaction batch file via multipart/form-data.
   * POST /api/v0/transaction-batches/upload
   */
  async upload (payload: FileUploadPayload): Promise<TransactionBatchUploadResponse> {
    const formData = new FormData()
    formData.append('publicKey', payload.publicKey)
    formData.append('unzerId', payload.unzerId)
    formData.append('createdBy', payload.createdBy)
    formData.append('source', payload.source)
    formData.append('file', payload.file)

    const uri = this.uriHelper.generateBaseUri('/upload')

    try {
      const response = await this.http.getClient().post(uri, formData, {
        timeout: 60000,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return {
        data: response.data.results ?? response.data,
        msg: response.data.msg
      }
    } catch (error: any) {
      const msg =
        typeof error?.message === 'string'
          ? error.message
          : (error?.response?.data?.message ?? 'Could not upload transaction batch')
      throw new TransactionBatchUploadFailed(msg, { status: error?.response?.status })
    }
  }
}

export class TransactionBatchUploadFailed extends BaseError {
  public name = 'TransactionBatchUploadFailed'
  constructor (
    public message: string = 'Could not upload transaction batch',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionBatchUploadFailed.prototype)
  }
}

export class TransactionBatchesFetchFailed extends BaseError {
  public name = 'TransactionBatchesFetchFailed'
  constructor (
    public message: string = 'Could not fetch transaction batches',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionBatchesFetchFailed.prototype)
  }
}

export class TransactionBatchesMetaFailed extends BaseError {
  public name = 'TransactionBatchesMetaFailed'
  constructor (
    public message: string = 'Could not fetch transaction batches meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionBatchesMetaFailed.prototype)
  }
}

export class TransactionBatchDownloadFailed extends BaseError {
  public name = 'TransactionBatchDownloadFailed'
  constructor (
    public message: string = 'Could not download transaction batch file',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionBatchDownloadFailed.prototype)
  }
}

export class TransactionBatchDownloadInputFailed extends BaseError {
  public name = 'TransactionBatchDownloadInputFailed'
  constructor (
    public message: string = 'Could not download transaction batch input file',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionBatchDownloadInputFailed.prototype)
  }
}
