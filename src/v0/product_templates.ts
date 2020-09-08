import qs from 'qs'
import { Client } from '../client'
import { BaseError } from '../errors'

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
  data: ProductTemplate
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface ProductTemplate {
  id?: string
}

export interface ProductTemplate {
  name: string
  option_template?: {
    [key: string]: any
  }
}

export class ProductTemplates {
  endpoint: string
  http: Client
  public options: ProductTemplatesOptions

  constructor (options: ProductTemplatesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/product_templates'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
  }

  getAll (queryOrOptions?: ProductTemplatesQuery | undefined): Promise<ProductTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions?.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductTemplatesFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as ProductTemplatesResponse)
      } catch (error) {
        return reject(new ProductTemplatesFetchFailed(undefined, { error }))
      }
    })
  }

  get (
    productTemplateId: string,
    queryOrOptions?: ProductTemplatesQuery | undefined
  ): Promise<ProductTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      let uri
      if (queryOrOptions?.uri) {
        uri = queryOrOptions.uri
      } else {
        let queryString = ''
        if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
          queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
        }

        uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productTemplateId}${
          queryString ? `?${queryString}` : ''
        }`
      }

      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new ProductTemplateFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ProductTemplate,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ProductTemplateResponse)
      } catch (error) {
        return reject(new ProductTemplateFetchFailed(undefined, { error }))
      }
    })
  }

  search (searchTerm: string): Promise<ProductTemplatesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}?q=${searchTerm}`
      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new ProductTemplatesSearchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as ProductTemplatesResponse)
      } catch (error) {
        return reject(new ProductTemplatesSearchFailed(undefined, { error }))
      }
    })
  }

  put (
    productTemplateId: string,
    productTemplate: ProductTemplate
  ): Promise<ProductTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${productTemplateId}`
      try {
        const response = await this.http.getClient().put(uri, productTemplate)

        return resolve({
          data: response.data.results[0] as ProductTemplate,
          metadata: { count: response.data.count }
        } as ProductTemplateResponse)
      } catch (error) {
        return reject(new ProductTemplatePutFailed(undefined, { error }))
      }
    })
  }

  create (productTemplate: ProductTemplate): Promise<ProductTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, productTemplate)

        return resolve({
          data: response.data.results[0] as ProductTemplate,
          metadata: { count: response.data.count }
        } as ProductTemplateResponse)
      } catch (error) {
        return reject(new ProductTemplateCreationFailed(undefined, { error }))
      }
    })
  }

  delete (taxId: string): Promise<ProductTemplateResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${taxId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new ProductTemplateDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ProductTemplateResponse)
      } catch (err) {
        return reject(new ProductTemplateDeleteFailed())
      }
    })
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
