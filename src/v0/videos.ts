import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface VideosOptions {
  user?: string
  base?: string
}

export interface VideosResponse {
  data: Record<string, unknown>
}

export interface VideosQuery {
  subsystem: 'contentVideos'
  prefix: string
  ext?: string
}

export class Videos {
  endpoint: string
  http: Client
  public options: VideosOptions
  public uriHelper: UriHelper

  constructor (options: VideosOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/videos'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async put (query: VideosQuery, payload: FormData): Promise<VideosResponse> {
    const base = this.uriHelper.generateBaseUri(`/${query.subsystem}/${query.prefix}`)
    const uri = this.uriHelper.generateUriWithQuery(base, { ext: query.ext })

    try {
      const response = await this.http
        .getClient()
        .put(uri, payload, { timeout: 60000, headers: { 'Content-Type': 'multipart/form-data' } })
      return {
        data: response.data.results
      }
    } catch (err) {
      throw new VideoPutFailed()
    }
  }

  async create (query: VideosQuery, payload: FormData): Promise<VideosResponse> {
    const base = this.uriHelper.generateBaseUri(`/${query.subsystem}/${query.prefix}`)
    const uri = this.uriHelper.generateUriWithQuery(base, { ext: query.ext })

    try {
      const response = await this.http.getClient().post(uri, payload, {
        timeout: 60000,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      return {
        data: response.data.results
      }
    } catch (err) {
      throw new VideoCreationFailed()
    }
  }
}

export class VideoCreationFailed extends BaseError {
  public name = 'VideoCreationFailed'
  constructor (public message: string = 'Could not create new video') {
    super(message)
    Object.setPrototypeOf(this, VideoCreationFailed.prototype)
  }
}

export class VideoPutFailed extends BaseError {
  public name = 'VideoPutFailed'
  constructor (public message: string = 'Could not update new video') {
    super(message)
    Object.setPrototypeOf(this, VideoPutFailed.prototype)
  }
}
