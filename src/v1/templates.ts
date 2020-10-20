import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface TemplatesQueryOptions {
  limit?: number
  uri?: string
  query?: any
}

export type TemplateTypes = 'delivery_note_v1' | 'invoice_v1' | 'full_receipt_v1'
export type PaperSize = 'A4' | 'letter'
export type Font = 'Open Sans'

interface TemplateOptions {
  title?: string
  logo?: string
  main_text?: string
  addresses?: {
    self?: {
      enabled: boolean
    } | null
    local?: {
      enabled: boolean
    } | null
  } | null
  font_color?: string
  font?: Font
  paper_size?: PaperSize
}

export interface Template {
  name?: string | null
  type: TemplateTypes
  options?: TemplateOptions | null
  active?: boolean
  deleted?: boolean
}

export interface TemplatesPreviewRequestObject {
  body: TemplatesPreviewBody
  templateId: string
  query?: TemplatesQuery
}

export interface TemplatesPreviewBody {
  paper_size?: string
  title?: string
  addresses?: Record<string, unknown>
  main_text?: string
  attention?: string
  font_color?: string
  font?: string
}

export interface TemplatesQuery {
  format?: string
  deleted?: boolean
  active?: boolean
}

export interface TemplatesOptions {
  user?: string
  base?: string
}

export interface TemplatesResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
}

export class Templates extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/templates'
  endpoint: string
  http: Client
  public options: TemplatesOptions
  public uriHelper: UriHelper

  constructor (options: TemplatesOptions, http: Client) {
    super(http, {
      endpoint: Templates.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Templates.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async create (template: Template): Promise<TemplatesResponse> {
    const uri = this.uriHelper.generateBaseUri()

    try {
      const response = await this.http.getClient().post(uri, template)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.TemplatesCreationFailed()
    }
  }

  async put (templateId: string, template: Template): Promise<TemplatesResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${templateId}`)
    try {
      const response = await this.http.getClient().put(uri, template)

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.TemplatesPutFailed()
    }
  }

  async getAll (options?: TemplatesQueryOptions | undefined): Promise<TemplatesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, options)

      const response = await this.http.getClient().get(uri)

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor }
      }
    } catch (err) {
      throw new errors.TemplatesFetchFailed()
    }
  }

  async preview (requestObject: TemplatesPreviewRequestObject): Promise<TemplatesResponse> {
    const { body, query, templateId } = requestObject
    try {
      const base = this.uriHelper.generateBaseUri(`/${templateId}/preview`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().post(uri, body, {
        headers: {
          Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
        }
      })

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (err) {
      throw new errors.TemplatesPreviewFailed()
    }
  }
}
