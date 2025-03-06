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
    q?: string
    deleted?: boolean
    active?: boolean
  }
}

export interface ContentTemplatesResponse {
  data: Array<Record<string, unknown>>
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

export type ContentTypeType = 'video' | 'image' | 'text' | 'transition'

export interface ContentTemplate {
  id?: string
  name?: string
  active?: boolean
  deleted?: boolean
  contents?: Contents
}

export interface Contents {
  idle?: string[]
  welcome?: string[]
  cart?: string[]
  payment?: string[]
  paymentTerminal?: string[]
  paymentApproved?: string[]
  goodbye?: string[]
  logo?: string[]
  runtime?: string[]
}

export class ContentTemplates extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/content_templates'
  endpoint: string
  http: Client
  public options: ContentTemplatesOptions
  public uriHelper: UriHelper

  constructor (options: ContentTemplatesOptions, http: Client) {
    super(http, {
      endpoint: ContentTemplates.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ContentTemplates.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async meta (queryOrOptions?: ContentTemplatesQuery): Promise<ContentTemplatesResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ContentTemplatesMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new ContentTemplatesMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentTemplatesMetaFailed(error.message, { error })
    }
  }

  async getAll (
    queryOrOptions?: ContentTemplatesQuery | undefined
  ): Promise<ContentTemplatesResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ContentTemplatesFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<ContentTemplatesResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new ContentTemplatesFetchFailed(error.message, { error })
    }
  }

  async get (templateId: string): Promise<ContentTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${templateId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ContentTemplateFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ContentTemplate,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentTemplateFetchFailed(error.message, { error })
    }
  }

  async patch (templateId: string, content: ContentTemplate): Promise<ContentTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${templateId}`)
    try {
      const response = await this.http.getClient().patch(uri, content)

      return {
        data: response.data.results[0] as ContentTemplate,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentTemplatePatchFailed(error.message, { error })
    }
  }

  async create (content: ContentTemplate): Promise<ContentTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, content)

      return {
        data: response.data.results[0] as ContentTemplate,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentTemplateCreationFailed(error.message, { error })
    }
  }

  async delete (templateId: string): Promise<ContentTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${templateId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ContentTemplateDeleteFailed()

      return {
        data: response.data.results[0] as ContentTemplate,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ContentTemplateDeleteFailed(error.message, { error })
    }
  }
}

export class ContentTemplatesFetchFailed extends BaseError {
  public name = 'ContentTemplatesFetchFailed'
  constructor (
    public message: string = 'Could not fetch content templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplatesFetchFailed.prototype)
  }
}

export class ContentTemplateFetchFailed extends BaseError {
  public name = 'ContentTemplateFetchFailed'
  constructor (
    public message: string = 'Could not fetch content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplateFetchFailed.prototype)
  }
}

export class ContentTemplatePatchFailed extends BaseError {
  public name = 'ContentTemplatePatchFailed'
  constructor (
    public message: string = 'Could not alter content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplatePatchFailed.prototype)
  }
}

export class ContentTemplateCreationFailed extends BaseError {
  public name = 'ContentTemplateCreationFailed'
  constructor (
    public message: string = 'Could not create content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplateCreationFailed.prototype)
  }
}

export class ContentTemplateDeleteFailed extends BaseError {
  public name = 'ContentTemplateDeleteFailed'
  constructor (
    public message: string = 'Could not delete content template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplateDeleteFailed.prototype)
  }
}

export class ContentTemplatesMetaFailed extends BaseError {
  public name = 'ContentTemplatesMetaFailed'
  constructor (
    public message: string = 'Could not fetch the content templates meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentTemplatesMetaFailed.prototype)
  }
}
