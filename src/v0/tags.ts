import { Client } from '../client'
import * as errors from '../errors/tags'
import { UriHelper } from '../uri-helper'

export interface TagsOptions {
  user?: string
  base?: string
}

export interface TagsQuery {
  limit?: number
  uri?: string
  name?: string
  q?: string
}

export interface TagsResponse {
  data: object[]
  metadata: object
}

export class Tags {
  endpoint: string
  http: Client
  public options: TagsOptions
  public uriHelper: UriHelper

  constructor(options: TagsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/tags'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: TagsQuery | undefined): Promise<TagsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<TagsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as TagsResponse)
      } catch (error) {
        return reject(new errors.TagsFetchAllFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<TagsResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const base = this.uriHelper.generateBaseUri(`/meta`)
        const uri = this.uriHelper.generateUriWithQuery(base)

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.TagsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as TagsResponse)
      } catch (error) {
        return reject(new errors.TagsGetMetaFailed(undefined, { error }))
      }
    })
  }
}
