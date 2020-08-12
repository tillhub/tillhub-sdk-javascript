import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'
import { BaseError } from '../errors/baseError'

export interface PdfRequestObject {
  transactionId: string
  template: string
  query?: TransactionsQuery
}

export interface TransactionsQuery {
  uri?: string
  format?: string
  legacy?: boolean
  query?: Record<string, unknown>
}

export interface TransactionsMetaQuery {
  type?: string | string[]
  legacy?: boolean
  query?: Record<string, unknown>
}

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionResponse {
  data: Record<string, unknown>[]
  next?: () => Promise<TransactionResponse>
}

export interface TransactionImageResponse {
  data: Record<string, unknown>
}

export interface TransactionImage {
  original: string
  '1x': string
  '2x': string
  '3x': string
}

interface FiskaltrustAuth {
  cashbox: string
  cashbox_auth: string
}

export class Transactions extends ThBaseHandler {
  public static baseEndpoint = '/api/v1/transactions'
  endpoint: string
  http: Client
  // signing: Signing
  public options: TransactionsOptions
  public uriHelper: UriHelper

  constructor(options: TransactionsOptions, http: Client) {
    super(http, {
      endpoint: Transactions.baseEndpoint,
      base: options.base || 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http
    // this.signing = new Signing(options, http)

    this.endpoint = Transactions.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<TransactionResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as TransactionResponse)
      } catch (error) {
        return reject(new TransactionFetchFailed(undefined, { error }))
      }
    })
  }

  meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/meta')
        const uri = this.uriHelper.generateUriWithQuery(base, q)

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new TransactionsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as TransactionResponse)
      } catch (error) {
        return reject(new TransactionsGetMetaFailed(undefined, { error }))
      }
    })
  }

  getImages(transactionId: string): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${transactionId}/images`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200)
          reject(new TransactionsGetImageFailed(undefined, { status: response.status }))

        if (!response.data.results[0]) reject(new TransactionsGetImageFailed())

        return resolve({
          data: response.data.results
        } as TransactionResponse)
      } catch (error) {
        return reject(new TransactionsGetImageFailed(undefined, { error }))
      }
    })
  }

  putImage(transactionId: string, image: TransactionImage): Promise<TransactionImageResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${transactionId}/images`)
        const response = await this.http.getClient().put(uri, image)

        if (response.status !== 200)
          reject(new TransactionsImagePutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results
        } as TransactionImageResponse)
      } catch (error) {
        return reject(new TransactionsImagePutFailed(undefined, { error }))
      }
    })
  }

  createImage(transactionId: string, image: TransactionImage): Promise<TransactionImageResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/${transactionId}/images`)
        const response = await this.http.getClient().post(uri, image)

        if (response.status !== 200)
          reject(new TransactionsImageCreateFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results
        } as TransactionImageResponse)
      } catch (error) {
        return reject(new TransactionsImageCreateFailed(undefined, { error }))
      }
    })
  }
}

export class TransactionsLegacy {
  endpoint: string
  http: Client
  signing: Signing
  public options: TransactionsOptions
  public uriHelper: UriHelper

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http
    this.signing = new Signing(options, http)

    this.endpoint = '/api/v1/transactions'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: TransactionsQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/legacy`
        }

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<TransactionResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as TransactionResponse)
      } catch (error) {
        return reject(new TransactionFetchFailed(undefined, { error }))
      }
    })
  }

  pdfUri(requestObject: PdfRequestObject): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      const { query, transactionId, template } = requestObject

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}/${transactionId}/legacy/${template}/pdf`
        }

        if (query && query.format) {
          uri = `${uri}?format=${query.format}`
        }

        const response = await this.http.getClient().post(uri, null, {
          headers: {
            Accept: 'application/json' // not needed for tillhub-api, but axios sets default headers { 'accept': 'application/json, text/plain, */*' } if not specified
          }
        })

        return resolve({
          data: response.data.results
        } as TransactionResponse)
      } catch (err) {
        return reject(new TransactionPdfFailed(err.message))
      }
    })
  }

  meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri('/meta/legacy')
        const uri = this.uriHelper.generateUriWithQuery(base, q)

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new TransactionsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as TransactionResponse)
      } catch (error) {
        return reject(new TransactionsGetMetaFailed(undefined, { error }))
      }
    })
  }
}

export class Signing {
  endpoint: string
  http: Client
  public options: TransactionsOptions

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/transactions'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  initialise(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string,
    signingConfiguration: FiskaltrustAuth
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/initialise`

        const response = await this.http.getClient().post(uri, signingConfiguration, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new TransactionSigningInitialisationFailed(err.message))
      }
    })
  }

  yearly(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/yearly`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new TransactionSigningYearlyReceiptFailed(err.message))
      }
    })
  }

  monthly(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/monthly`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new TransactionSigningMonthlyReceiptFailed(err.message))
      }
    })
  }

  zero(
    singingResourceType: string,
    singingResource: string,
    signingSystem: string
  ): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/zero`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new TransactionSigningZeroReceiptFailed(err.message))
      }
    })
  }
}

class TransactionFetchFailed extends BaseError {
  public name = 'TransactionFetchFailed'
  constructor(
    public message: string = 'Could not fetch transaction',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionFetchFailed.prototype)
  }
}

class TransactionPdfFailed extends BaseError {
  public name = 'TransactionPdfFailed'
  constructor(
    public message: string = 'Could not create pdf',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionPdfFailed.prototype)
  }
}

class TransactionSigningInitialisationFailed extends BaseError {
  public name = 'TransactionSigningInitialisationFailed'
  constructor(
    public message: string = 'Could not initialise signing system',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningInitialisationFailed.prototype)
  }
}

class TransactionSigningYearlyReceiptFailed extends BaseError {
  public name = 'TransactionSigningYearlyReceiptFailed'
  constructor(
    public message: string = 'Could not generate yearly receipt',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningYearlyReceiptFailed.prototype)
  }
}

class TransactionSigningMonthlyReceiptFailed extends BaseError {
  public name = 'TransactionSigningMonthlyReceiptFailed'
  constructor(
    public message: string = 'Could not generate monthly receipt',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningMonthlyReceiptFailed.prototype)
  }
}

class TransactionSigningZeroReceiptFailed extends BaseError {
  public name = 'TransactionSigningZeroReceiptFailed'
  constructor(
    public message: string = 'Could not generate zero receipt',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionSigningZeroReceiptFailed.prototype)
  }
}

class TransactionsGetMetaFailed extends BaseError {
  public name = 'TransactionsGetMetaFailed'
  constructor(
    public message: string = 'Could not get transactions meta',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsGetMetaFailed.prototype)
  }
}

class TransactionsGetImageFailed extends BaseError {
  public name = 'TransactionsGetImageFailed'
  constructor(
    public message: string = 'Could not get transactions image',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsGetImageFailed.prototype)
  }
}

class TransactionsImagePutFailed extends BaseError {
  public name = 'TransactionsImagePutFailed'
  constructor(
    public message: string = 'Could not update transactions image',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsImagePutFailed.prototype)
  }
}

class TransactionsImageCreateFailed extends BaseError {
  public name = 'TransactionsImageCreateFailed'
  constructor(
    public message: string = 'Could not create transactions image',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, TransactionsImageCreateFailed.prototype)
  }
}
