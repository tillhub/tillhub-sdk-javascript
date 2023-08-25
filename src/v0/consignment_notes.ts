import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ConsignmentNotesOptions {
  user?: string
  base?: string
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
