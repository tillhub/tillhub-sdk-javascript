import { Client } from '../client'
import * as errors from '../errors'

export interface ExpenseAccountsOptions {
  user?: string
  base?: string
}

export interface ExpenseAccountsQuery {
  limit?: number
  uri?: string
}

export interface ExpenseAccountsResponse {
  data: ExpenseAccount[]
  metadata: object
}

export interface ExpenseAccountResponse {
  data: ExpenseAccount
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface ExpenseAccount {
  id?: string
}

export type ExpenseAccountType = 'expense' | 'deposit' | 'bank'

export interface ExpenseAccount {
  name: string
  active?: boolean
  fa_account_number: number
  tax?: string
  type: ExpenseAccountType
}

export class ExpenseAccounts {
  endpoint: string
  http: Client
  public options: ExpenseAccountsOptions

  constructor(options: ExpenseAccountsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/expnse_accounts'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(query?: ExpenseAccountsQuery | undefined): Promise<ExpenseAccountsResponse> {
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
          return reject(new errors.ExpenseAccountsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as ExpenseAccountsResponse)
      } catch (error) {
        return reject(new errors.ExpenseAccountsFetchFailed(undefined, { error }))
      }
    })
  }

  get(expenseAccountId: string): Promise<ExpenseAccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${expenseAccountId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.ExpenseAccountFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as ExpenseAccount,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as ExpenseAccountResponse)
      } catch (error) {
        return reject(new errors.ExpenseAccountFetchFailed(undefined, { error }))
      }
    })
  }

  put(expenseAccountId: string, expenseAccount: ExpenseAccount): Promise<ExpenseAccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${expenseAccountId}`
      try {
        const response = await this.http.getClient().put(uri, expenseAccount)

        return resolve({
          data: response.data.results[0] as ExpenseAccount,
          metadata: { count: response.data.count }
        } as ExpenseAccountResponse)
      } catch (error) {
        return reject(new errors.ExpenseAccountPutFailed(undefined, { error }))
      }
    })
  }

  create(expenseAccount: ExpenseAccount): Promise<ExpenseAccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, expenseAccount)

        return resolve({
          data: response.data.results[0] as ExpenseAccount,
          metadata: { count: response.data.count }
        } as ExpenseAccountResponse)
      } catch (error) {
        return reject(new errors.ExpenseAccountCreationFailed(undefined, { error }))
      }
    })
  }

  delete(expenseAccountId: string): Promise<ExpenseAccountResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${expenseAccountId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.CustomerDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as ExpenseAccountResponse)
      } catch (err) {
        return reject(new errors.ExpenseAccountDeleteFailed())
      }
    })
  }
}
