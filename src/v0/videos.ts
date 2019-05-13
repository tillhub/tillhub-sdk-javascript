import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'

export interface VideosOptions {
  user?: string
  base?: string
}

export interface VideosResponse {
  data: object
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

  constructor(options: VideosOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/videos'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  put(query: VideosQuery, payload: FormData): Promise<VideosResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.subsystem}/${
        query.prefix
        }${qs.stringify({ ext: query.ext }, { addQueryPrefix: true })}`
      try {
        const response = await this.http
          .getClient()
          .put(uri, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve({
          data: response.data.results
        } as VideosResponse)
      } catch (err) {
        return reject(new VideoPutFailed())
      }
    })
  }

  create(query: VideosQuery, payload: FormData): Promise<VideosResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.subsystem}/${
        query.prefix
        }${qs.stringify({ ext: query.ext }, { addQueryPrefix: true })}`
      try {
        const response = await this.http
          .getClient()
          .post(uri, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve({
          data: response.data.results
        } as VideosResponse)
      } catch (err) {
        return reject(new VideoCreationFailed())
      }
    })
  }
}

export class VideoCreationFailed extends BaseError {
  public name = 'VideoCreationFailed'
  constructor(public message: string = 'Could not create new video') {
    super(message)
  }
}

export class VideoPutFailed extends BaseError {
  public name = 'VideoPutFailed'
  constructor(public message: string = 'Could not update new video') {
    super(message)
  }
}
