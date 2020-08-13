import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ContentTemplatesOptions {
  user?: string
  base?: string
}

export interface ContentTemplatesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ContentTemplatesResponse {
  data: Record<string, unknown>[]
  metadata: Record<string, unknown>
  next?: () => Promise<ContentTemplatesResponse>
}

export interface ContentTemplateResponse {
  data: ContentTemplate
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface ContentTemplate {
  id?: string
}

export type ContentTypeType = 'video' | 'image' | 'text' | 'transition'

export interface ContentTemplate {
  name?: string
  active?: boolean
  deleted?: boolean
  contents?: Contents
}

export interface Contents {
  idle?: Array<string>
  welcome?: Array<string>
  cart?: Array<string>
  payment?: Array<string>
  payment_terminal?: Array<string>
  payment_approved?: Array<string>
  goodbye?: Array<string>
  logo?: Array<string>
  runtime?: Array<string>
}

export class ContentTemplates extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/content_templates'
  endpoint: string
  http: Client
  public options: ContentTemplatesOptions
  public uriHelper: UriHelper

  constructor(options: ContentTemplatesOptions, http: Client) {
    super(http, {
      endpoint: ContentTemplates.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ContentTemplates.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: ContentTemplatesQuery | undefined): Promise<ContentTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ContentTemplatesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ContentTemplatesResponse> =>
            this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as ContentTemplatesResponse)
      } catch (error) {
        return reject(new ContentTemplatesFetchFailed(undefined, { error }))
      }
    })
  }

  get(templateId: string): Promise<ContentTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${templateId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new ContentTemplateFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ContentTemplate,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ContentTemplateResponse)
      } catch (error) {
        return reject(new ContentTemplateFetchFailed(undefined, { error }))
      }
    })
  }

  search(searchTerm: string): Promise<ContentTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ContentTemplatesSearchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ContentTemplatesResponse)
      } catch (error) {
        return reject(new ContentTemplatesSearchFailed(undefined, { error }))
      }
    })
  }

  patch(templateId: string, content: ContentTemplate): Promise<ContentTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${templateId}`
      try {
        const response = await this.http.getClient().patch(uri, content)

        return resolve({
          data: response.data.results[0] as ContentTemplate,
          metadata: { count: response.data.count }
        } as ContentTemplateResponse)
      } catch (error) {
        return reject(new ContentTemplatePatchFailed(undefined, { error }))
      }
    })
  }

  create(content: ContentTemplate): Promise<ContentTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, content)

        return resolve({
          data: response.data.results[0] as ContentTemplate,
          metadata: { count: response.data.count }
        } as ContentTemplateResponse)
      } catch (error) {
        return reject(new ContentTemplateCreationFailed(undefined, { error }))
      }
    })
  }

  delete(templateId: string): Promise<ContentTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${templateId}`
      try {
        const response = await this.http.getClient().patch(uri, { deleted: true, active: false })
        response.status !== 200 && reject(new ContentTemplateDeleteFailed())

        return resolve({
          data: response.data.results[0] as ContentTemplate,
          msg: response.data.msg
        } as ContentTemplateResponse)
      } catch (err) {
        return reject(new ContentTemplateDeleteFailed())
      }
    })
  }
}

export class ContentTemplatesFetchFailed extends BaseError {
  public name = 'ContentTemplatesFetchFailed'
  constructor(
    public message: string = 'Could not fetch content templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplatesFetchFailed.prototype)
  }
}

export class ContentTemplateFetchFailed extends BaseError {
  public name = 'ContentTemplateFetchFailed'
  constructor(
    public message: string = 'Could not fetch content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplateFetchFailed.prototype)
  }
}

export class ContentTemplatePatchFailed extends BaseError {
  public name = 'ContentTemplatePatchFailed'
  constructor(
    public message: string = 'Could not alter content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplatePatchFailed.prototype)
  }
}

export class ContentTemplateCreationFailed extends BaseError {
  public name = 'ContentTemplateCreationFailed'
  constructor(
    public message: string = 'Could not create content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplateCreationFailed.prototype)
  }
}

export class ContentTemplateDeleteFailed extends BaseError {
  public name = 'ContentTemplateDeleteFailed'
  constructor(
    public message: string = 'Could not delete content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplateDeleteFailed.prototype)
  }
}

export class ContentTemplatesSearchFailed extends BaseError {
  public name = 'ContentTemplatesSearchFailed'
  constructor(
    public message: string = 'Could not search content templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplatesSearchFailed.prototype)
  }
}
