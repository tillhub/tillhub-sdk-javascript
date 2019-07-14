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
    deleted?: boolean;
    active?: boolean;
    start?: string;
    end?: string;
  }
}

export interface ProductServiceQuestionReponse {
  data: ProductServiceQuestionsResponse
  metadata?: {
    count?: number
  }
  msg?: string
}

export interface ProductServiceQuestionsResponse {
  data: object[]
  metadata: object
}

export interface ProductServiceQuestion {
  name?: string
  content?: string
  description?: string
  service_questions?: Array<String>
  answer_validation?: object
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

  constructor(options: ProductServiceQuestionsOptions, http: Client) {
    super(http, { endpoint: ProductServiceQuestions.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = ProductServiceQuestions.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: ProductServiceQuestionsQuery | undefined): Promise<ProductServiceQuestionsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<ProductServiceQuestionsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as ProductServiceQuestionsResponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionsFetchAllFailed(undefined, { error }))
      }
    })
  }

  get(questionId: string): Promise<ProductServiceQuestionReponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${questionId}`)
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.ProductServiceQuestionsFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ProductServiceQuestion,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionReponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionsFetchOneFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<ProductServiceQuestionsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.ProductServiceQuestionsGetMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionsResponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionsGetMetaFailed(undefined, { error }))
      }
    })
  }

  create(productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionReponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri()
        const response = await this.http.getClient().post(uri, productServiceQuestion)

        return resolve({
          data: response.data.results[0] as ProductServiceQuestion,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionReponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionsCreationFailed(undefined, { error }))
      }
    })
  }

  put(questionId: string, productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionReponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${questionId}`)
        const response = await this.http.getClient().put(uri, productServiceQuestion)
        response.status !== 200 &&
          reject(new errors.ProductServiceQuestionsPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ProductServiceQuestion,
          metadata: { count: response.data.count }
        } as ProductServiceQuestionReponse)
      } catch (error) {
        return reject(new errors.ProductServiceQuestionsPutFailed(undefined, { error }))
      }
    })
  }

  delete(taxId: string): Promise<ProductServiceQuestionReponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${taxId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.ProductServiceQuestionDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ProductServiceQuestionReponse)
      } catch (err) {
        return reject(new errors.ProductServiceQuestionDeleteFailed())
      }
    })
  }
}
