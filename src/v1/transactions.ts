import { Client } from '../client'
import * as errors from '../errors'

export interface PdfRequestObject {
  transactionId: string
  template: string
  query?: TransactionsQuery
}

export interface TransactionsQuery {
  uri?: string
  format?: string
}

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionResponse {
  data: object[]
}

export class Transactions {
  endpoint: string
  http: Client
  public options: TransactionsOptions

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v1/transactions'
    this.options.base = this.options.base || 'https://api.tillhub.com'
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
}
