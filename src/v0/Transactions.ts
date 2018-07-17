import { Client } from '../Client'
import * as errors from '../Errors'

export interface TransactionsOptions {
  user?: string
  base?: string
}

export interface TransactionsQuery {
  limit?: number
  uri?: string
}

export interface TransactionResponse {
  data: object[]
  metadata: object
  next?: Promise<TransactionResponse>
}

export class Transactions {
  endpoint: string
  http: Client
  public options: TransactionsOptions

  constructor(options: TransactionsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/transactions'
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

        if (response.data.cursor && response.data.curso.next) {
          next = this.getAll({ uri: response.data.curso.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as TransactionResponse)
      } catch (err) {
        console.log(err)

        return reject(new errors.TransactionFetchFailed())
      }
    })
  }
}
