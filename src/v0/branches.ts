import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'

export interface BranchesOptions {
  user?: string
  base?: string
}

export interface BranchesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
  }
}

export interface BranchesResponse {
  data: object[]
  metadata: object
  next?: () => Promise<BranchesResponse>
}

export interface BranchResponse {
  data: Branch
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}
export interface Branch {
  id?: string
}

export interface ExternalCustomIdQuery {
  provided_id: string
}

export interface ExternalCustomIdResponse {
  external_custom_id: string
}

export interface Branch {
  branch_number?: number
  name: string
  email?: string
  custom_id?: string
  external_custom_id?: string | null
  receipt_header?: string
  receipt_footer?: string
  active?: boolean
  deleted?: boolean
  configuration?: string
  timezone_default?: string | null
  currency_default?: string | null
}

export class Branches {
  endpoint: string
  http: Client
  public options: BranchesOptions
  public uriHelper: UriHelper

  constructor(options: BranchesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/branches'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: BranchesQuery | undefined): Promise<BranchesResponse> {
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

          uri = `${this.options.base}${this.endpoint}/${this.options.user}${
            queryString ? `?${queryString}` : ''
          }`
        }

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.BranchesFetchFailed(undefined, { status: response.status }))
        }

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<BranchesResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor },
          next
        } as BranchesResponse)
      } catch (error) {
        return reject(new errors.BranchesFetchFailed(undefined, { error }))
      }
    })
  }

  get(branchId: string): Promise<BranchResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${branchId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.BranchFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as Branch,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as BranchResponse)
      } catch (error) {
        return reject(new errors.BranchFetchFailed(undefined, { error }))
      }
    })
  }

  put(branchId: string, branch: Branch): Promise<BranchResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${branchId}`
      try {
        const response = await this.http.getClient().put(uri, branch)

        return resolve({
          data: response.data.results[0] as Branch,
          metadata: { count: response.data.count }
        } as BranchResponse)
      } catch (error) {
        return reject(new errors.BranchPutFailed(undefined, { error }))
      }
    })
  }

  create(branch: Branch): Promise<BranchResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, branch)

        return resolve({
          data: response.data.results[0] as Branch,
          metadata: { count: response.data.count }
        } as BranchResponse)
      } catch (error) {
        return reject(new errors.BranchCreationFailed(undefined, { error }))
      }
    })
  }

  count(): Promise<BranchesResponse> {
    return new Promise(async (resolve, reject) => {
      let uri = `${this.options.base}${this.endpoint}/${this.options.user}/meta`

      try {
        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new errors.BranchesCountFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as BranchesResponse)
      } catch (error) {
        return reject(new errors.BranchesCountFailed(undefined, { error }))
      }
    })
  }

  delete(branchId: string): Promise<BranchResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${branchId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 && reject(new errors.CustomerDeleteFailed())

        return resolve({
          msg: response.data.msg
        } as BranchResponse)
      } catch (err) {
        return reject(new errors.BranchDeleteFailed())
      }
    })
  }

  externalId(query: ExternalCustomIdQuery): Promise<BranchResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri(`/external_id`)
      const uri = this.uriHelper.generateUriWithQuery(base, query)
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new errors.ExternalCustomIdGetUniqueFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results as ExternalCustomIdResponse,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as BranchResponse)
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return reject(
            new errors.ExternalCustomIdGetUniqueFailed(undefined, {
              status: error.response.status,
              name: error.response.data.name
            })
          )
        }
        return reject(new errors.ExternalCustomIdGetUniqueFailed(undefined, { error }))
      }
    })
  }
}
