import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

export interface ImagesOptions {
  user?: string
  base?: string
}

export interface ImagesResponse {
  data: Record<string, unknown>
}

export interface ImagesQuery {
  subsystem: 'products' | 'customers' | 'branches' | 'staff'
  prefix: string
  acceptFormats?: string[]
  metadata?: boolean
  flatten?: Record<string, unknown> | null
}

export class Images {
  endpoint: string
  http: Client
  public options: ImagesOptions
  public uriHelper: UriHelper

  constructor (options: ImagesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/images'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async put (query: ImagesQuery, payload: FormData): Promise<ImagesResponse> {
    const base = this.uriHelper.generateBaseUri(`/${query.subsystem}/${query.prefix}`)
    const uri = this.uriHelper.generateUriWithQuery(base, {
      acceptFormats: query.acceptFormats ?? ['jpeg', 'png'],
      metadata: query.metadata ?? true,
      flatten: query.flatten !== undefined ? query.flatten : null
    })
    try {
      const response = await this.http
        .getClient()
        .put(uri, payload, { headers: { 'Content-Type': 'image/jpeg' } })
      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new errors.ImagePutFailed()
    }
  }

  async create (query: ImagesQuery, payload: FormData): Promise<ImagesResponse> {
    const base = this.uriHelper.generateBaseUri(`/${query.subsystem}/${query.prefix}`)
    const uri = this.uriHelper.generateUriWithQuery(base, {
      acceptFormats: query.acceptFormats ?? ['jpeg', 'png'],
      metadata: query.metadata ?? true,
      flatten: query.flatten !== undefined ? query.flatten : null
    })
    try {
      const response = await this.http
        .getClient()
        .post(uri, payload, { headers: { 'Content-Type': 'image/jpeg' } })
      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new errors.ImageCreationFailed()
    }
  }
}
