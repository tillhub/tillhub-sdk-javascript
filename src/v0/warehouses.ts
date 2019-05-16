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
  embed?: string[]
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

export interface StaffPhoneNumbers {
  line_main?: number
  line_1?: number
  line_2?: number
}

export type WarehouseAddressType = 'local' | 'delivery' | 'billing'

export interface WarehouseAddress {
  lines?: string[] | null
  street?: string | null
  street_number?: string | null
  locality?: string | null
  region?: string | null
  postal_code?: string | null
  country?: string | null
  type: WarehouseAddressType
}

export interface WarehouseImage {
  '1x': string
  avatar: string
}

export interface Warehouse {
  id?: string
  name: string
  short_name?: string | null
  custom_id?: string | null
  phonenumbers?: StaffPhoneNumbers
  addresses?: WarehouseAddress[] | null
  images?: WarehouseImage | null
  capacity?: number | null
  barcode?: string | null
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

  create(warehouse: Warehouse): Promise<WarehousesResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = this.uriHelper.generateBaseUri()

      try {
        const response = await this.http.getClient().post(uri, warehouse)
        response.status !== 200 && reject(new WarehouseCreateFailed())

        return resolve({
          data: response.data.results[0],
          metadata: { count: response.data.count },
          errors: response.data.errors || []
        } as WarehousesResponse)
      } catch (error) {
        return reject(new WarehouseCreateFailed(undefined, { error }))
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

class WarehouseCreateFailed extends BaseError {
  public name = 'WarehouseCreateFailed'
  constructor(public message: string = 'Could not create the warehouse', properties?: any) {
    super(message, properties)
  }
}
