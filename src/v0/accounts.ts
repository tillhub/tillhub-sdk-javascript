import { Client } from '../client'
import * as errors from '../errors'
import { ThBaseHandler } from '../base'
import { UriHelper } from '../uri-helper'

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
  metadata: Record<string, unknown>
  next?: () => Promise<AccountsResponse>
}

export interface AccountResponse {
  data?: Account
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

interface AccountsRefType {
  id?: string
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
  public uriHelper: UriHelper

  constructor (options: AccountsOptions, http: Client) {
    super(http, {
      endpoint: Accounts.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Accounts.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: AccountsQueryOrOptions | undefined): Promise<AccountsResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.AccountsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new errors.AccountsFetchFailed(error.message, { error })
    }
  }

  async get (accountId: string): Promise<AccountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${accountId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new errors.AccountFetchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as Account,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.AccountFetchFailed(error.message, { error })
    }
  }

  async put (accountId: string, account: Account): Promise<AccountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${accountId}`)
    try {
      const response = await this.http.getClient().put(uri, account)

      return {
        data: response.data.results[0] as Account,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.AccountPutFailed(error.message, { error })
    }
  }

  async create (account: Account): Promise<AccountResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, account)

      return {
        data: response.data.results[0] as Account,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.AccountCreationFailed(error.message, { error })
    }
  }

  async delete (accountId: string): Promise<AccountResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${accountId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) throw new errors.AccountDeleteFailed()

      return {
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.AccountDeleteFailed(error.message, { error })
    }
  }
}
