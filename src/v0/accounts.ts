import { Client } from '../client'
import * as errors from '../errors'

export interface AccountsOptions {
  user?: string
  base?: string
}

export interface AccountsQuery {
  limit?: number
  uri?: string
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

export type AccountType = 'expense' | 'deposit' | 'bank'
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

export class Accounts {
  endpoint: string
  http: Client
  public options: AccountsOptions

  constructor(options: AccountsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/accounts'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: AccountsQuery | undefined): Promise<AccountsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        let uri
        if (query && query.uri) {
          uri = query.uri
        } else {
          uri = `${this.options.base}${this.endpoint}/${this.options.user}`
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

  put(accountId: string, Account: Account): Promise<AccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${accountId}`
      try {
        const response = await this.http.getClient().put(uri, Account)

        return resolve({
          data: response.data.results[0] as Account,
          metadata: { count: response.data.count }
        } as AccountResponse)
      } catch (error) {
        return reject(new errors.AccountPutFailed(undefined, { error }))
      }
    })
  }

  create(Account: Account): Promise<AccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, Account)

        return resolve({
          data: response.data.results[0] as Account,
          metadata: { count: response.data.count }
        } as AccountResponse)
      } catch (error) {
        return reject(new errors.AccountCreationFailed(undefined, { error }))
      }
    })
  }
}
