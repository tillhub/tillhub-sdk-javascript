import { Client } from '../client'
import * as errors from '../errors'

export interface ImagesOptions {
  user?: string
  base?: string
}

export interface ImagesResponse {
  data: object
}

export interface ImagesQuery {
  subsystem: 'products' | 'customers' | 'branches'
  prefix: string
}

export class Images {
  endpoint: string
  http: Client
  public options: ImagesOptions

  constructor(options: ImagesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/images'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  put(query: ImagesQuery, payload: FormData): Promise<ImagesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.subsystem}/${
        query.prefix
      }`
      try {
        const response = await this.http
          .getClient()
          .put(uri, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve({
          data: response.data.results
        } as ImagesResponse)
      } catch (err) {
        return reject(new errors.ImagePutFailed())
      }
    })
  }

  create(query: ImagesQuery, payload: FormData): Promise<ImagesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${query.subsystem}/${
        query.prefix
      }`
      try {
        const response = await this.http
          .getClient()
          .post(uri, payload, { headers: { 'Content-Type': 'multipart/form-data' } })
        return resolve({
          data: response.data.results
        } as ImagesResponse)
      } catch (err) {
        return reject(new errors.ImageCreationFailed())
      }
    })
  }
}
