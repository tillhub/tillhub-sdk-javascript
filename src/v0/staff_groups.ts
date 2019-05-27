import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'

export interface StaffGroupsOptions {
  user?: string
  base?: string
}

export interface StaffGroupsQuery {
  limit?: number
  uri?: string
  name?: string
  deleted?: boolean
  count?: number
  q?: string
}

export interface StaffGroupsResponse {
  data: object[]
  metadata: object
}

export class StaffGroups {
  endpoint: string
  http: Client
  public options: StaffGroupsOptions
  public uriHelper: UriHelper

  constructor(options: StaffGroupsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/staff_groups'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: StaffGroupsQuery | undefined): Promise<StaffGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      let next

      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)

        if (response.data.cursor && response.data.cursor.next) {
          next = (): Promise<StaffGroupsResponse> => this.getAll({ uri: response.data.cursor.next })
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count, cursor: response.data.cursor },
          next
        } as StaffGroupsResponse)
      } catch (error) {
        return reject(new StaffGroupsFetchAllFailed(undefined, { error }))
      }
    })
  }

  meta(): Promise<StaffGroupsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = this.uriHelper.generateBaseUri(`/meta`)
        const response = await this.http.getClient().get(uri)

        if (response.status !== 200) reject(new StaffGroupsMetaFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffGroupsResponse)
      } catch (error) {
        return reject(new StaffGroupsMetaFailed(undefined, { error }))
      }
    })
  }
}

class StaffGroupsFetchAllFailed extends BaseError {
  public name = 'StaffGroupsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all staff groups', properties?: any) {
    super(message, properties)
  }
}

class StaffGroupsMetaFailed extends BaseError {
  public name = 'StaffGroupsMetaFailed'
  constructor(public message: string = 'Could not fetch staff groups meta call', properties?: any) {
    super(message, properties)
  }
}
