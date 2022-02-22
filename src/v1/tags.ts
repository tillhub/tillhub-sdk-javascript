import { Client } from '../client'
import * as errors from '../errors/tags'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface TagsOptions {
  user?: string
  base?: string
}

export interface TagsQuery {
  limit?: number
  uri?: string
  name?: string
  active?: boolean
  q?: string
}

export interface TagsResponse {
  data: Tag[]
  metadata: Record<string, unknown>
  next?: () => Promise<TagsResponse>
}

export interface Tag {
  name?: string
  deleted?: boolean
  legacy_id?: number
  update_id?: number
}

export class Tags extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/tags'
  endpoint: string
  http: Client
  public options: TagsOptions
  public uriHelper: UriHelper

  constructor (options: TagsOptions, http: Client) {
    super(http, { endpoint: Tags.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Tags.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (query?: TagsQuery | undefined): Promise<TagsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<TagsResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.TagsFetchAllFailed(error.message, { error })
    }
  }

  async meta (): Promise<TagsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.TagsGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.TagsGetMetaFailed(error.message, { error })
    }
  }
}
