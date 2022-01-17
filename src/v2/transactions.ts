import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'

interface TransactionsOptions {
  user?: string
  base?: string
}

interface TransactionImageResponseItem {
  correlationId?: string
}

interface TransactionImageCreateResponse {
  data: TransactionImageResponseItem[]
  metadata?: Record<string, unknown>
}

interface TransactionImageGetResponse {
  data: TransactionImage[]
  metadata?: Record<string, unknown>
}

interface TransactionImage {
  original: string
  '1x': string
  '2x': string
  '3x': string
}

export class Transactions {
  endpoint: string
  http: Client
  public options: TransactionsOptions
  public uriHelper: UriHelper

  constructor (options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v2/transactions'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getImages (transactionId: string): Promise<TransactionImageGetResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${transactionId}/images`)
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new TransactionsGetImagesFailed(undefined, { status: response.status })
      }

      if (!response.data.results[0]) throw new TransactionsGetImagesFailed()

      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new TransactionsGetImagesFailed(error.message, { error })
    }
  }

  async createImage (transactionId: string, image: string): Promise<TransactionImageCreateResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${transactionId}/images`)
      const response = await this.http.getClient().post(uri, image)

      if (response.status !== 200) {
        throw new TransactionsImageCreateFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results
      }
    } catch (error: any) {
      throw new TransactionsImageCreateFailed(error.message, { error })
    }
  }
}

export class TransactionsGetImagesFailed extends BaseError {
  public name = 'TransactionsGetImagesFailed'
  constructor (
    public message: string = 'Could not get the transaction\'s images',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsGetImagesFailed.prototype)
  }
}

export class TransactionsImageCreateFailed extends BaseError {
  public name = 'TransactionsImageCreateFailed'
  constructor (
    public message: string = 'Could not create transactions image',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsImageCreateFailed.prototype)
  }
}
