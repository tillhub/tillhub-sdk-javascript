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
  date_of_birth?: Date
  short_code?: number
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

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as StaffResponse)
      } catch (err) {
        return reject(new errors.StaffsFetchFailed())
      }
    })
  }

  create(staffMember: StaffMember): Promise<StaffResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}`
      try {
        const response = await this.http.getClient().post(uri, staffMember)

        return resolve({
          data: response.data.results[0] as StaffMember,
          metadata: { count: response.data.count }
        } as StaffResponse)
      } catch (error) {
        return reject(new errors.StaffMemberCreateFailed(undefined, { error }))
      }
    })
  }
}
