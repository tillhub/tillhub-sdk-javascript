import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface PdfRequestObject {
  transactionId: string
  template: string
  query?: TransactionsQuery
}

export interface TransactionsQuery {
  uri?: string
  format?: string
  legacy?: boolean
  query?: object
}

export interface TransactionsMetaQuery {
  type?: string | string[]
  legacy?: boolean
}

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionResponse {
  data: object[]
  next?: () => Promise<TransactionResponse>
}

enum SignatureTypes {
  Fiksaltrust = 'fiskaltrust'
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
    super(http, { endpoint: Transactions.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
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
        return reject(new errors.TransactionFetchFailed(undefined, { error }))
      }
    })
  }

  meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.TransactionsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as TransactionResponse)
      } catch (error) {
        return reject(new errors.TransactionsGetMetaFailed(undefined, { error }))
      }
    })
  }
}

export class TransactionsLegacy {
  endpoint: string
  http: Client
  signing: Signing
  public options: TransactionsOptions

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http
    this.signing = new Signing(options, http)

    this.endpoint = '/api/v1/transactions'
    this.options.base = this.options.base || 'https://api.tillhub.com'
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
        return reject(new errors.TransactionFetchFailed(undefined, { error }))
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
          uri = `${this.options.base}${this.endpoint}/${
            this.options.user
            }/${transactionId}/legacy/${template}/pdf`
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
        return reject(new errors.TransactionPdfFailed(err.message))
      }
    })
  }

  meta(q?: TransactionsMetaQuery | undefined): Promise<TransactionResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta/legacy`

      try {
        const queryString = qs.stringify(q)
        if (queryString) {
          uri = `${uri}?${queryString}`
        }

        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new errors.TransactionsGetMetaFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count }
        } as TransactionResponse)
      } catch (error) {
        return reject(new errors.TransactionsGetMetaFailed(undefined, { error }))
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
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/initialise`

        const response = await this.http.getClient().post(uri, signingConfiguration, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningInitialisationFailed(err.message))
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
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/yearly`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningYearlyReceiptFailed(err.message))
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
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/monthly`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningMonthlyReceiptFailed(err.message))
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
        let uri = `${this.options.base}${this.endpoint}/${
          this.options.user
          }/legacy/signing/${singingResourceType}/${singingResource}/${signingSystem}/zero`

        const response = await this.http.getClient().post(uri, undefined, {
          headers: {
            Accept: 'application/json'
          }
        })

        return resolve({
          data: response.data.results
        } as any)
      } catch (err) {
        return reject(new errors.TransactionSigningZeroReceiptFailed(err.message))
      }
    })
  }
}
