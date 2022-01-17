import { Client } from '../client'
import * as errors from '../errors/productServiceQuestions'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface ProductServiceQuestionsOptions {
  user?: string
  base?: string
}

export interface ProductServiceQuestionsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    start?: string
    end?: string
  }
}

export interface ProductServiceQuestionResponse {
  data?: ProductServiceQuestion
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ProductServiceQuestionsResponse {
  data: ProductServiceQuestion[]
  metadata: Record<string, unknown>
  next?: () => Promise<ProductServiceQuestionsResponse>
}

export interface ProductServiceQuestion {
  name?: string
  content?: string
  description?: string
  service_questions?: string[]
  answer_validation?: Record<string, unknown>
  required?: boolean
  deleted?: boolean
  active?: boolean
}

export class ProductServiceQuestions extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/product_service_questions'
  endpoint: string
  http: Client
  public options: ProductServiceQuestionsOptions
  public uriHelper: UriHelper

  constructor (options: ProductServiceQuestionsOptions, http: Client) {
    super(http, {
      endpoint: ProductServiceQuestions.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ProductServiceQuestions.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (
    query?: ProductServiceQuestionsQuery | undefined
  ): Promise<ProductServiceQuestionsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      const response = await this.http.getClient().get(uri)

      if (response.data.cursor?.next) {
        next = (): Promise<ProductServiceQuestionsResponse> =>
          this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count, cursor: response.data.cursor },
        next
      }
    } catch (error: any) {
      throw new errors.ProductServiceQuestionsFetchAllFailed(error.message, { error })
    }
  }

  async get (questionId: string): Promise<ProductServiceQuestionResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${questionId}`)
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ProductServiceQuestionsFetchOneFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductServiceQuestionsFetchOneFailed(error.message, { error })
    }
  }

  async meta (): Promise<ProductServiceQuestionsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/meta')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) throw new errors.ProductServiceQuestionsGetMetaFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductServiceQuestionsGetMetaFailed(error.message, { error })
    }
  }

  async create (productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()
      const response = await this.http.getClient().post(uri, productServiceQuestion)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductServiceQuestionsCreationFailed(error.message, { error })
    }
  }

  async put (
    questionId: string,
    productServiceQuestion: ProductServiceQuestion
  ): Promise<ProductServiceQuestionResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${questionId}`)
      const response = await this.http.getClient().put(uri, productServiceQuestion)
      if (response.status !== 200) { throw new errors.ProductServiceQuestionsPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ProductServiceQuestionsPutFailed(error.message, { error })
    }
  }

  async delete (taxId: string): Promise<ProductServiceQuestionResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${taxId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.ProductServiceQuestionDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.ProductServiceQuestionDeleteFailed()
    }
  }
}
