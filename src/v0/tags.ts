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

export interface TagResponse {
  data: TagsResponse
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface TagsResponse {
  data: Array<Record<string, unknown>>
  metadata: Record<string, unknown>
}

export interface Tag {
  name?: string
  deleted?: boolean
  legacy_id?: number
  update_id?: number
}

export class Tags extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/tags'
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

  getAll (query?: TagsQuery | undefined): Promise<TagsResponse> {
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

  get (tagId: string): Promise<TagResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${tagId}`)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.TagsFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Tag,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as TagResponse)
      } catch (error) {
        return reject(new errors.TagsFetchOneFailed(undefined, { error }))
      }
    })
  }

  meta (): Promise<TagsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri('/meta')
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.TagsGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as TagsResponse)
      } catch (error) {
        return reject(new errors.TagsGetMetaFailed(undefined, { error }))
      }
    })
  }

  create (tag: Tag): Promise<TagResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()
        const response = await this.http.getClient().post(uri, tag)

        return resolve({
          data: response.data.results[0] as Tag,
          metadata: { count: response.data.count }
        } as TagResponse)
      } catch (error) {
        return reject(new errors.TagsCreationFailed(undefined, { error }))
      }
    })
  }

  put (tagId: string, tag: Tag): Promise<TagResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${tagId}`)
        const response = await this.http.getClient().put(uri, tag)
        response.status !== 200 &&
          reject(new errors.TagsPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Tag,
          metadata: { count: response.data.count }
        } as TagResponse)
      } catch (error) {
        return reject(new errors.TagsPutFailed(undefined, { error }))
      }
    })
  }
}
