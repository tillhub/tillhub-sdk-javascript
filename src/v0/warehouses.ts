import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
import { BaseError } from '../errors/baseError'

export interface WarehousesOptions {
  user?: string
  base?: string
}

export interface WarehousesQuery {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
  }
}

export interface WarehousesResponse {
  data: object[]
  metadata: object
}

export interface WarehouseResponse {
  data: Warehouse
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface Warehouse {
  id?: string
}

export class Warehouses {
  endpoint: string
  http: Client
  public options: WarehousesOptions
  public uriHelper: UriHelper

  constructor(options: WarehousesOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/warehouses'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(query?: WarehousesQuery | undefined): Promise<WarehousesResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new WarehousesFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { cursor: response.data.cursor }
        } as WarehousesResponse)
      } catch (error) {
        return reject(new WarehousesFetchFailed(undefined, { error }))
      }
    })
  }
}

class WarehousesFetchFailed extends BaseError {
  public name = 'WarehousesFetchFailed'
  constructor(public message: string = 'Could not fetch warehouses', properties?: any) {
    super(message, properties)
  }
}
