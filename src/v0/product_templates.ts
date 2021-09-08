import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface ProductTemplatesOptions {
  user?: string
  base?: string
}

export interface ProductTemplatesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ProductTemplatesResponse {
  data: ProductTemplate[]
  metadata: Record<string, unknown>
}

export interface ProductTemplateResponse {
  data?: ProductTemplate
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface ProductTemplate {
  id?: string
  name: string
  option_template?: {
    [key: string]: any
  }
}

export class ProductTemplates {
  endpoint: string
  http: Client
  public options: ProductTemplatesOptions
  public uriHelper: UriHelper

  constructor (options: ProductTemplatesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/product_templates'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: ProductTemplatesQuery | undefined): Promise<ProductTemplatesResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductTemplatesFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ProductTemplatesFetchFailed(undefined, { error })
    }
  }

  async get (
    productTemplateId: string,
    queryOrOptions?: ProductTemplatesQuery | undefined
  ): Promise<ProductTemplateResponse> {
    const base = this.uriHelper.generateBaseUri(`/${productTemplateId}`)
    const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new ProductTemplateFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0],
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ProductTemplateFetchFailed(undefined, { error })
    }
  }

  async search (searchTerm: string): Promise<ProductTemplatesResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, { q: searchTerm })
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductTemplatesSearchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ProductTemplatesSearchFailed(undefined, { error })
    }
  }

  async put (
    productTemplateId: string,
    productTemplate: ProductTemplate
  ): Promise<ProductTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${productTemplateId}`)
    try {
      const response = await this.http.getClient().put(uri, productTemplate)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ProductTemplatePutFailed(undefined, { error })
    }
  }

  async create (productTemplate: ProductTemplate): Promise<ProductTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, productTemplate)

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ProductTemplateCreationFailed(undefined, { error })
    }
  }

  async delete (taxId: string): Promise<ProductTemplateResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${taxId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new ProductTemplateDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err) {
      throw new ProductTemplateDeleteFailed()
    }
  }
}

export class ProductTemplatesFetchFailed extends BaseError {
  public name = 'ProductTemplatesFetchFailed'
  constructor (
    public message: string = 'Could not fetch product templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplatesFetchFailed.prototype)
  }
}

export class ProductTemplateFetchFailed extends BaseError {
  public name = 'ProductTemplateFetchFailed'
  constructor (
    public message: string = 'Could not fetch product template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplateFetchFailed.prototype)
  }
}

export class ProductTemplatePutFailed extends BaseError {
  public name = 'ProductTemplatePutFailed'
  constructor (
    public message: string = 'Could not alter product template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplatePutFailed.prototype)
  }
}

export class ProductTemplateCreationFailed extends BaseError {
  public name = 'ProductTemplateCreationFailed'
  constructor (
    public message: string = 'Could create product template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplateCreationFailed.prototype)
  }
}

export class ProuctTemplatesCountFailed extends BaseError {
  public name = 'ProuctTemplatesCountFailed'
  constructor (
    public message: string = 'Could not get count of product templates',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProuctTemplatesCountFailed.prototype)
  }
}

export class ProductTemplateDeleteFailed extends BaseError {
  public name = 'ProductTemplateDeleteFailed'
  constructor (
    public message: string = 'Could not delete product template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplateDeleteFailed.prototype)
  }
}

export class ProductTemplatesSearchFailed extends BaseError {
  public name = 'ProductTemplatesSearchFailed'
  constructor (
    public message: string = 'Could not search for product template',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplatesSearchFailed.prototype)
  }
}
