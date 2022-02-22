import { Client } from '../client'
import * as errors from '../errors/tags'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { TagsOptions, TagsQuery, TagsResponse } from '../v0/tags'

export class Tags extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/tags'
  endpoint: string
  http: Client
  public options: TagsOptions
  public uriHelper: UriHelper

  constructor (options: TagsOptions, http: Client) {
    super(http, {
      endpoint: Tags.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
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
      if (response.status !== 200) {
        throw new errors.TagsFetchAllFailed(undefined, { status: response.status })
      }
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
}
