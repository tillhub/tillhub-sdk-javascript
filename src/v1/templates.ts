import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface TemplatesOptions {
  limit?: number
  uri?: string
  query?: any
}

type TemplateTypes = 'delivery_note_v1' | 'invoice_v1' | 'full_receipt_v1'
type PaperSize = 'A4' | 'letter'
type Font = 'Open Sans'

interface TemplateOptions {
  title?: String
  logo?: String
  main_text?: String
  addresses?: {
    self?: {
      enabled: Boolean
    } | null
    local?: {
      enabled: Boolean
    } | null
  } | null
  font_color?: String
  font?: Font
  paper_size?: PaperSize
}

export interface Template {
  name?: string | null
  type: TemplateTypes
  options?: TemplateOptions | null
  active?: Boolean
  deleted?: Boolean
}

export interface TemplatesPreviewRequestObject {
  body: TemplatesPreviewBody
  templateId: string
  query?: TemplatesQuery
}

export interface TemplatesPreviewBody {
  paper_size?: string
  title?: string
  addresses?: object
  main_text?: string
  attention?: string
  font_color?: string
  font?: string
}

export interface TemplatesQuery {
  format?: string
}

export interface TemplatesOptions {
  user?: string
  base?: string
}

export interface TemplatesResponse {
  data: object[]
  metadata: object
}

export class Templates {
  endpoint: string
  http: Client
  public options: TemplatesOptions

  constructor(options: TemplatesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/templates'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  create(template: Template): Promise<TemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, template)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TemplatesResponse)
      } catch (err) {
        return reject(new errors.TemplatesCreationFailed())
      }
    })
  }

  put(templateId: string, template: Template): Promise<TemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${templateId}`
      try {
        const response = await this.http.getClient().put(uri, template)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TemplatesResponse)
      } catch (err) {
        return reject(new errors.TemplatesPutFailed())
      }
    })
  }

  getAll(options?: TemplatesOptions | undefined): Promise<TemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        let uri
        if (options && options.uri) {
          uri = options.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            options && options.query ? `?${qs.stringify(options.query)}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor }
        } as TemplatesResponse)
      } catch (err) {
        return reject(new errors.TemplatesFetchFailed())
      }
    })
  }

  preview(requestObject: TemplatesPreviewRequestObject): Promise<TemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      const { body, query, templateId } = requestObject

      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/${templateId}/preview`

      try {
        if (query && query.format) {
          uri = `${uri}?format=${query.format}`
        }

        const response = await this.http.getClient().post(uri, body, {
          headers: {
            Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
          }
        })

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TemplatesResponse)
      } catch (err) {
        return reject(new errors.TemplatesPreviewFailed())
      }
    })
  }
}
