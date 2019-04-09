import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper, HandlerQuery } from '../uri-helper'

export interface StaffOptions {
  user?: string
  base?: string
}

export interface StaffQueryOrOptions {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
  }
}

export interface StaffResponse {
  data: StaffMember[]
  metadata: object
  errors?: ErrorObject[]
}

export interface StaffMemberResponse {
  data: StaffMember
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface StaffAddress {
  street?: string
  street_number?: number
  locality?: string
  region?: string
  postal_code?: number
  country?: string
  type?: string
}

export interface StaffPhoneNumbers {
  any?: number
  home?: number
  mobile?: number
  work?: number
}

export interface PinRequest {
  provided_pin?: string
  staff_id?: string
}

export interface PinResponse {
  pin?: string
}

export interface StaffNumberRequest {
  provided_staff_number?: string
  staff_id?: string
}

export interface StaffNumberResponse {
  number?: string
}

export interface StaffQuery {
  staff_id_template?: string
  generate_staff_id?: boolean
}

export interface HandleStaffQuery extends HandlerQuery {
  query?: StaffQuery
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: object
}

export interface StaffMember {
  firstname?: string
  lastname?: string
  displayname?: string
  phonenumbers?: StaffPhoneNumbers
  email?: string
  addresses?: StaffAddress
  pin?: number
  metadata?: object
  scopes?: string[]
  staff_number?: number
  discounts?: object
  date_of_birth?: string | null
  short_code?: number
  default?: boolean
}

export class Staff {
  endpoint: string
  http: Client
  public options: StaffOptions
  public uriHelper: UriHelper

  constructor(options: StaffOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/staff'
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  getAll(queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse> {
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
          return reject(new errors.StaffFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count },
          next
        } as StaffResponse)
      } catch (error) {
        return reject(new errors.StaffFetchFailed(undefined, { error }))
      }
    })
  }

  create(staffMember: StaffMember, query?: HandleStaffQuery): Promise<StaffResponse> {
    return new Promise(async (resolve, reject) => {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, query)

      try {
        const response = await this.http.getClient().post(uri, staffMember)
        response.status !== 200 && reject(new errors.StaffMemberCreateFailed())

        return resolve({
          data: response.data.results[0] as StaffMember,
          metadata: { count: response.data.count },
          errors: response.data.errors || []
        } as StaffResponse)
      } catch (error) {
        return reject(new errors.StaffMemberCreateFailed(undefined, { error }))
      }
    })
  }

  getOne(staffId: string): Promise<StaffMemberResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${staffId}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new errors.StaffFetchOneFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as StaffMember,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as StaffMemberResponse)
      } catch (error) {
        return reject(new errors.StaffFetchOneFailed(undefined, { error }))
      }
    })
  }

  put(staffId: string, staff: StaffMember): Promise<StaffMemberResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${staffId}`
      try {
        const response = await this.http.getClient().put(uri, staff)
        response.status !== 200 &&
          reject(new errors.StaffPutFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as StaffMember,
          metadata: { count: response.data.count }
        } as StaffMemberResponse)
      } catch (error) {
        return reject(new errors.StaffPutFailed(undefined, { error }))
      }
    })
  }

  delete(staffId: string): Promise<StaffMemberResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${staffId}`
      try {
        const response = await this.http.getClient().delete(uri)
        response.status !== 200 &&
          reject(new errors.StaffDeleteFailed(undefined, { status: response.status }))

        return resolve({ msg: response.data.msg } as StaffMemberResponse)
      } catch (error) {
        return reject(new errors.StaffDeleteFailed(undefined, { error }))
      }
    })
  }

  getPin(providedPin?: PinRequest): Promise<StaffMemberResponse> {
    const queryString = qs.stringify(providedPin, { addQueryPrefix: true })

    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/pin${queryString}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new errors.StaffPinGetFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results as PinResponse,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as StaffMemberResponse)
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return reject(
            new errors.StaffPinGetFailed(undefined, {
              status: error.response.status,
              name: error.response.data.name
            })
          )
        }
        return reject(new errors.StaffPinGetFailed(undefined, { error }))
      }
    })
  }

  getStaffNumber(providedStaffNumber?: StaffNumberRequest): Promise<StaffMemberResponse> {
    const queryString = qs.stringify(providedStaffNumber, { addQueryPrefix: true })

    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${
        this.options.user
      }/staff_number${queryString}`
      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(
            new errors.StaffNumberGetFailed(undefined, {
              status: response.status
            })
          )

        return resolve({
          data: response.data.results as StaffNumberResponse,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as StaffMemberResponse)
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return reject(
            new errors.StaffNumberGetFailed(undefined, {
              status: error.response.status,
              name: error.response.data.name
            })
          )
        }
        return reject(new errors.StaffNumberGetFailed(undefined, { error }))
      }
    })
  }
}
