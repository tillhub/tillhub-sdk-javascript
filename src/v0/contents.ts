import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ContentOptions {
  user?: string
  base?: string
}

export interface ContentsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ContentsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
  next?: () => Promise<ContentsResponse>
}

export interface ContentResponse {
  data?: Content
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type ContentTypeType = 'video' | 'image' | 'text' | 'transition'

export interface Content {
  id?: string
  name?: string
  type: ContentTypeType
  payload: string | null
  content_configuration: {
    [key: string]: any
  } | null
  payload_configuration: {
    [key: string]: any
  } | null
  active?: boolean
  deleted?: boolean
  metadata: {
    [key: string]: any
  } | null
}

export class Contents extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/contents'
  endpoint: string
  http: Client
  public options: ContentOptions
  public uriHelper: UriHelper

  constructor (options: ContentOptions, http: Client) {
    super(http, {
      endpoint: Contents.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Contents.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: ContentsQuery | undefined): Promise<ContentsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ContentsFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<ContentsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new ContentsFetchFailed(error.message, { error })
    }
  }

  async get (contentId: string): Promise<ContentResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${contentId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ContentFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as Content,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentFetchFailed(error.message, { error })
    }
  }

  async search (searchTerm: string): Promise<ContentsResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm })

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ContentsSearchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentsSearchFailed(error.message, { error })
    }
  }

  async patch (contentId: string, content: Content): Promise<ContentResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${contentId}`)
    try {
      const response = await this.http.getClient().patch(uri, content)

      return {
        data: response.data.results[0] as Content,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentPatchFailed(error.message, { error })
    }
  }

  async create (content: Content): Promise<ContentResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, content)

      return {
        data: response.data.results[0] as Content,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ContentCreationFailed(error.message, { error })
    }
  }

  async delete (contentId: string): Promise<ContentResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${contentId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ContentDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new ContentDeleteFailed(error.message, { error })
    }
  }
}

export class ContentsFetchFailed extends BaseError {
  public name = 'ContentsFetchFailed'
  constructor (
    public message: string = 'Could not fetch contents',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentsFetchFailed.prototype)
  }
}

export class ContentFetchFailed extends BaseError {
  public name = 'ContentFetchFailed'
  constructor (
    public message: string = 'Could not fetch content',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentFetchFailed.prototype)
  }
}

export class ContentPatchFailed extends BaseError {
  public name = 'ContentPatchFailed'
  constructor (
    public message: string = 'Could not alter content',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentPatchFailed.prototype)
  }
}

export class ContentCreationFailed extends BaseError {
  public name = 'ContentCreationFailed'
  constructor (
    public message: string = 'Could not create content',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentCreationFailed.prototype)
  }
}

export class ContentDeleteFailed extends BaseError {
  public name = 'ContentDeleteFailed'
  constructor (
    public message: string = 'Could not delete content',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentDeleteFailed.prototype)
  }
}

export class ContentsSearchFailed extends BaseError {
  public name = 'ContentDeleteFailed'
  constructor (
    public message: string = 'Could not search contents',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ContentsSearchFailed.prototype)
  }
}
