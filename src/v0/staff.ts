import qs from 'qs'
import { Client } from '../client'
import * as errors from '../errors'

export interface StaffOptions {
  user?: string
  base?: string
}

export interface StaffResponse {
  data: StaffMember[]
  metadata: object
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
}

export interface PinResponse {
  pin?: string
}

export interface StaffMember {
  firstname?: string
  lastname?: string
  displayname?: string
  phonenumbers?: StaffPhoneNumbers
  email?: string
  addresses?: StaffAddress
  pin?: string
  metadata?: object
  scopes?: string[]
  staff_number?: number
  discounts?: object
  date_of_birth?: string | null
  short_code?: string
  default?: boolean
}

export class Staff {
  endpoint: string
  http: Client
  public options: StaffOptions

  constructor(options: StaffOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/staff'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(): Promise<StaffResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}`

        const response = await this.http.getClient().get(uri)
        response.status !== 200 && reject(new errors.StaffFetchFailed())

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffResponse)
      } catch (err) {
        return reject(new errors.StaffFetchFailed())
      }
    })
  }

  create(staffMember: StaffMember): Promise<StaffResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, staffMember)
        response.status !== 200 && reject(new errors.StaffMemberCreateFailed())

        return resolve({
          data: response.data.results[0] as StaffMember,
          metadata: { count: response.data.count }
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
}
