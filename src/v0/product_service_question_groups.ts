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
    deleted?: boolean;
    active?: boolean;
    start?: string;
    end?: string;
  }
}

export interface ProductServiceQuestionGroupReponse {
  data: ProductServiceQuestionGroupsResponse
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ProductServiceQuestionGroupsResponse {
  data: object[]
  metadata: object
}

export interface ProductServiceQuestionGroup {
  name?: string
  custom_id?: string
  description?: string
  service_questions?: Array<String>
  deleted?: boolean
  active?: boolean
}

export class ProductServiceQuestionGroups extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_service_question_groups'
  endpoint: string
  http: Client
  public options: ProductServiceQuestionGroupsOptions
  public uriHelper: UriHelper

  constructor(options: ProductServiceQuestionGroupsOptions, http: Client) {
    super(http, { endpoint: ProductServiceQuestionGroups.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ProductServiceQuestionGroups.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: ProductServiceQuestionGroupsQuery | undefined): Promise<ProductServiceQuestionGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ProductServiceQuestionGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as ProductServiceQuestionGroupsResponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionGroupsFetchAllFailed(undefined, { error }))
      }
    })
  }

  get(groupId: string): Promise<ProductServiceQuestionGroupReponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${groupId}`)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.ProductServiceQuestionGroupsFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ProductServiceQuestionGroup,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionGroupReponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionGroupsFetchOneFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<ProductServiceQuestionGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.ProductServiceQuestionGroupsGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionGroupsResponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionGroupsGetMetaFailed(undefined, { error }))
      }
    })
  }

  create(productServiceQuestionGroup: ProductServiceQuestionGroup): Promise<ProductServiceQuestionGroupReponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()
        const response = await this.http.getClient().post(uri, productServiceQuestionGroup)

        return resolve({
          data: response.data.results[0] as ProductServiceQuestionGroup,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionGroupReponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionGroupsCreationFailed(undefined, { error }))
      }
    })
  }

  put(groupId: string, productServiceQuestionGroup: ProductServiceQuestionGroup): Promise<ProductServiceQuestionGroupReponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${groupId}`)
        const response = await this.http.getClient().put(uri, productServiceQuestionGroup)
        response.status !== 200 &&
          reject(new errors.ProductServiceQuestionGroupsPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ProductServiceQuestionGroup,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionGroupReponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionGroupsPutFailed(undefined, { error }))
      }
    })
  }
}
