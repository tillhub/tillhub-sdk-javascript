import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'

export interface ProductTemplateDefaultsOptions {
  user?: string
  base?: string
}

export interface ProductTemplateDefaultsResponse {
  data: ProductTemplate[]
  metadata: Record<string, unknown>
}

export interface ProductTemplate {
  id?: string
  name: string
  option_template?: {
    [key: string]: any
  }
}

export class ProductTemplateDefaults {
  endpoint: string
  http: Client
  public options: ProductTemplateDefaultsOptions
  public uriHelper: UriHelper

  constructor (options: ProductTemplateDefaultsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/statics/default_variants'
    // Remove user as this endpoint is not user-specific and we don't want the id added to the url.
    this.options.user = ''
    this.options.base = this.options.base ?? 'https://api.tillhub.com'

    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<ProductTemplateDefaultsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new ProductTemplateDefaultsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new ProductTemplateDefaultsFetchFailed(error.message, { error })
    }
  }
}

export class ProductTemplateDefaultsFetchFailed extends BaseError {
  public name = 'ProductTemplateDefaultsFetchFailed'
  constructor (
    public message: string = 'Could not fetch product template defaults',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductTemplateDefaultsFetchFailed.prototype)
  }
}
