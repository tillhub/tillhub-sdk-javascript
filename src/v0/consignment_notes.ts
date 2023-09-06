import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ConsignmentNotesResponse {
  data?: ConsignmentNote[]
  metadata?: Record<string, unknown>
  msg?: string
  next?: () => Promise<ConsignmentNotesResponse>
}

export interface ConsignmentNote {
  id: string
  createdAt?: string
  createdBy?: string
  purchaseOrder?: {
    id?: string
  }
  consignmentNoteNumber: string
}

export interface ConsignmentNotesOptions {
  base?: string
  limit?: number
  uri?: string
  query?: ConsignmentNotesQuery
}

export interface ConsignmentNotesQuery {
  consignmentNoteNumber?: string
  [key: string]: any
}
export interface ConsignmentNotesPdfResponse {
  data?: string
  contentType?: string
  filename?: string
}

export class ConsignmentNotes extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/consignment-notes'
  endpoint: string
  http: Client
  public options: ConsignmentNotesOptions
  public uriHelper: UriHelper

  constructor (options: ConsignmentNotesOptions, http: Client) {
    super(http, {
      endpoint: ConsignmentNotes.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ConsignmentNotes.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (options?: ConsignmentNotesOptions | undefined): Promise<ConsignmentNotesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new ConsignmentNotesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<ConsignmentNotesResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new ConsignmentNotesFetchFailed(error.message, { error })
    }
  }

  async pdfUri (consignmentNoteId: string): Promise<ConsignmentNotesPdfResponse> {
    try {
      const base = this.uriHelper.generateBaseUri(`/${consignmentNoteId}/pdf`)
      const uri = this.uriHelper.generateUriWithQuery(base)

      const response = await this.http.getClient().get(uri)
      const pdfObj = response.data.results[0]

      return {
        data: pdfObj.base64Content,
        contentType: pdfObj.contentType,
        filename: pdfObj.filename
      }
    } catch (error: any) {
      throw new ConsignmentNotesPdfFailed(error.message)
    }
  }
}

export class ConsignmentNotesFetchFailed extends BaseError {
  public name = 'ConsignmentNotesFetchFailed'
  constructor (
    public message: string = 'Could not fetch the consignment notes',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConsignmentNotesFetchFailed.prototype)
  }
}
class ConsignmentNotesPdfFailed extends BaseError {
  public name = 'ConsignmentNotesPdfFailed'
  constructor (
    public message: string = 'Could not download pdf',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ConsignmentNotesPdfFailed.prototype)
  }
}
