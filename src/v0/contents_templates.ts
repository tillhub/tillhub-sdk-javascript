import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ContentTemplatesOptions {
  user?: string
  base?: string
}

export interface ContentsTemplatesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ContentsTemplatesResponse {
  data: object[]
  metadata: object
  next?: () => Promise<ContentsTemplatesResponse>
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

export class ContentsTemplates extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/contents_templates'
  endpoint: string
  http: Client
  public options: ContentTemplatesOptions
  public uriHelper: UriHelper

  constructor(options: ContentTemplatesOptions, http: Client) {
    super(http, { endpoint: ContentsTemplates.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ContentsTemplates.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: ContentsTemplatesQuery | undefined): Promise<ContentsTemplatesResponse> {
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
          return reject(new ContentsTemplatesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ContentsTemplatesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as ContentsTemplatesResponse)
      } catch (error) {
        return reject(new ContentsTemplatesFetchFailed(undefined, { error }))
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

  search(searchTerm: string): Promise<ContentsTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ContentsTemplatesSearchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ContentsTemplatesResponse)
      } catch (error) {
        return reject(new ContentsTemplatesSearchFailed(undefined, { error }))
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

export class ContentsTemplatesFetchFailed extends BaseError {
  public name = 'ContentsTemplatesFetchFailed'
  constructor(public message: string = 'Could not fetch contents templates', properties?: any) {
    super(message, properties)
  }
}

export class ContentTemplateFetchFailed extends BaseError {
  public name = 'ContentTemplateFetchFailed'
  constructor(public message: string = 'Could not fetch content template', properties?: any) {
    super(message, properties)
  }
}

export class ContentTemplatePatchFailed extends BaseError {
  public name = 'ContentTemplatePatchFailed'
  constructor(public message: string = 'Could not alter content template', properties?: any) {
    super(message, properties)
  }
}

export class ContentTemplateCreationFailed extends BaseError {
  public name = 'ContentTemplateCreationFailed'
  constructor(public message: string = 'Could not create content template', properties?: any) {
    super(message, properties)
  }
}

export class ContentTemplateDeleteFailed extends BaseError {
  public name = 'ContentTemplateDeleteFailed'
  constructor(public message: string = 'Could not delete content template', properties?: any) {
    super(message, properties)
  }
}

export class ContentsTemplatesSearchFailed extends BaseError {
  public name = 'ContentsTemplatesSearchFailed'
  constructor(public message: string = 'Could not search contents templates', properties?: any) {
    super(message, properties)
  }
}
