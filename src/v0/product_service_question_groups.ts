import { Client } from '../client'
import * as errors from '../errors/productServiceQuestionGroups'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ProductServiceQuestionGroupsOptions {
  user?: string
  base?: string
}

export interface ProductServiceQuestionGroupsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    start?: string
    end?: string
  }
}

export interface ProductServiceQuestionGroupResponse {
  data: ProductServiceQuestionGroup
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ProductServiceQuestionGroupsResponse {
  data: ProductServiceQuestionGroup[]
  metadata: Record<string, unknown>
  next?: () => Promise<ProductServiceQuestionGroupsResponse>
}

export interface ProductServiceQuestionGroup {
  name?: string
  custom_id?: string
  description?: string
  service_questions?: string[]
  deleted?: boolean
  active?: boolean
}

export class ProductServiceQuestionGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_service_question_groups'
  endpoint: string
  http: Client
  public options: ProductServiceQuestionGroupsOptions
  public uriHelper: UriHelper

  constructor (options: ProductServiceQuestionGroupsOptions, http: Client) {
    super(http, {
      endpoint: ProductServiceQuestionGroups.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ProductServiceQuestionGroups.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (
    query?: ProductServiceQuestionGroupsQuery | undefined
  ): Promise<ProductServiceQuestionGroupsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ProductServiceQuestionGroupsResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error) {
      throw new errors.ProductServiceQuestionGroupsFetchAllFailed(undefined, { error })
    }
  }

  async get (groupId: string): Promise<ProductServiceQuestionGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${groupId}`)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ProductServiceQuestionGroupsFetchOneFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.ProductServiceQuestionGroupsFetchOneFailed(undefined, { error })
    }
  }

  async meta (): Promise<ProductServiceQuestionGroupsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.ProductServiceQuestionGroupsGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.ProductServiceQuestionGroupsGetMetaFailed(undefined, { error })
    }
  }

  async create (
    productServiceQuestionGroup: ProductServiceQuestionGroup
  ): Promise<ProductServiceQuestionGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, productServiceQuestionGroup)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.ProductServiceQuestionGroupsCreationFailed(undefined, { error })
    }
  }

  async put (
    groupId: string,
    productServiceQuestionGroup: ProductServiceQuestionGroup
  ): Promise<ProductServiceQuestionGroupResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${groupId}`)
      const response = await this.http.getClient().put(uri, productServiceQuestionGroup)
      if (response.status !== 200) { throw new errors.ProductServiceQuestionGroupsPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error) {
      throw new errors.ProductServiceQuestionGroupsPutFailed(undefined, { error })
    }
  }
}
