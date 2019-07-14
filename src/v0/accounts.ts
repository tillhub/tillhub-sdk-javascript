import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'

export interface AccountsOptions {
  user?: string
  base?: string
}

export type AccountType = 'expense' | 'deposit' | 'bank'

export interface AccountsQueryOrOptions {
  limit?: number
  uri?: string
  query?: {
    type?: AccountType
    deleted?: boolean
    active?: boolean
  }
}

export interface AccountsResponse {
  data: Account[]
  metadata: object
}

export interface AccountResponse {
  data: Account
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface Account {
  id?: string
}

interface AccountsRefType {
  branch: string
  branch_number: number
  name: string
  account: string
}

export interface Account {
  name: string
  fa_account_number?: string
  type: AccountType
  accounts: AccountsRefType[]
}

export class Accounts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/accounts'
  endpoint: string
  http: Client
  public options: AccountsOptions

  constructor(options: AccountsOptions, http: Client) {
    super(http, { endpoint: Accounts.baseEndpoint, base: options.base || 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Accounts.baseEndpoint
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(queryOrOptions?: AccountsQueryOrOptions | undefined): Promise<AccountsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (queryOrOptions && queryOrOptions.uri) {
          uri = queryOrOptions.uri
        } else {
          let queryString = ''
          if (queryOrOptions && (queryOrOptions.query || queryOrOptions.limit)) {
            queryString = qs.stringify({ limit: queryOrOptions.limit, ...queryOrOptions.query })
          }

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${queryString ? `?${queryString}` : ''}`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.AccountsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as AccountsResponse)
      } catch (error) {
        return reject(new errors.AccountsFetchFailed(undefined, { error }))
      }
    })
  }

  get(accountId: string): Promise<AccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${accountId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.AccountFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Account,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as AccountResponse)
      } catch (error) {
        return reject(new errors.AccountFetchFailed(undefined, { error }))
      }
    })
  }

  put(accountId: string, account: Account): Promise<AccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${accountId}`
      try {
        const response = await this.http.getClient().put(uri, account)

        return resolve({
          data: response.data.results[0] as Account,
          metadata: { count: response.data.count }
        } as AccountResponse)
      } catch (error) {
        return reject(new errors.AccountPutFailed(undefined, { error }))
      }
    })
  }

  create(account: Account): Promise<AccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, account)

        return resolve({
          data: response.data.results[0] as Account,
          metadata: { count: response.data.count }
        } as AccountResponse)
      } catch (error) {
        return reject(new errors.AccountCreationFailed(undefined, { error }))
      }
    })
  }

  delete(accountId: string): Promise<AccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${accountId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.AccountDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as AccountResponse)
      } catch (err) {
        return reject(new errors.AccountDeleteFailed())
      }
    })
  }
}
