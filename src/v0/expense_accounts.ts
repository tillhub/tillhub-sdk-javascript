import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

export interface ExpenseAccountsOptions {
  user?: string
  base?: string
}

export interface ExpenseAccountsQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface ExpenseAccountsResponse {
  data: ExpenseAccount[]
  metadata: Record<string, unknown>
}

export interface ExpenseAccountResponse {
  data?: ExpenseAccount
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export type ExpenseAccountType = 'expense' | 'deposit' | 'bank'

export interface ExpenseAccount {
  id?: string
  name: string
  active?: boolean
  fa_account_number: number
  tax?: string
  type: ExpenseAccountType
  accepts_booking_from_safe?: boolean
}

export class ExpenseAccounts extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/expense_accounts'
  endpoint: string
  http: Client
  public options: ExpenseAccountsOptions
  public uriHelper: UriHelper

  constructor (options: ExpenseAccountsOptions, http: Client) {
    super(http, {
      endpoint: ExpenseAccounts.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = ExpenseAccounts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: ExpenseAccountsQuery | undefined): Promise<ExpenseAccountsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ExpenseAccountsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ExpenseAccountsFetchFailed(undefined, { error })
    }
  }

  async get (expenseAccountId: string): Promise<ExpenseAccountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${expenseAccountId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ExpenseAccountFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as ExpenseAccount,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ExpenseAccountFetchFailed(undefined, { error })
    }
  }

  async put (expenseAccountId: string, expenseAccount: ExpenseAccount): Promise<ExpenseAccountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${expenseAccountId}`)
    try {
      const response = await this.http.getClient().put(uri, expenseAccount)

      return {
        data: response.data.results[0] as ExpenseAccount,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ExpenseAccountPutFailed(undefined, { error })
    }
  }

  async create (expenseAccount: ExpenseAccount): Promise<ExpenseAccountResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, expenseAccount)

      return {
        data: response.data.results[0] as ExpenseAccount,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.ExpenseAccountCreationFailed(undefined, { error })
    }
  }

  async delete (expenseAccountId: string): Promise<ExpenseAccountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${expenseAccountId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.ExpenseAccountDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (err: any) {
      throw new errors.ExpenseAccountDeleteFailed()
    }
  }
}
