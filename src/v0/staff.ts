import typeOf from 'just-typeof'
import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper, HandlerQuery } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface StaffOptions {
  user?: string
  base?: string
}

export interface StaffQueryOrOptions {
  limit?: number
  uri?: string
  query?: {
    deleted?: boolean
    active?: boolean
    start?: string
    staff_number?: string
    lastname?: string
    firstname?: string
    email?: string
    q?: string
    staff_groups?: string
    cursor_field?: string
  }
}

export interface StaffResponse {
  data: StaffMember[]
  metadata: Record<string, unknown>
  errors?: ErrorObject[]
  next?: () => Promise<StaffResponse>
}

export interface StaffMemberResponse {
  data?: StaffMember
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
  errors?: Record<string, unknown>
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
  pin_length?: number
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
  errorDetails: Record<string, unknown>
}

export interface StaffMember {
  firstname?: string
  lastname?: string
  displayname?: string
  phonenumbers?: StaffPhoneNumbers
  email?: string
  addresses?: StaffAddress
  pin?: number
  metadata?: Record<string, unknown>
  scopes?: string[]
  staff_number?: number
  discounts?: Record<string, unknown>
  date_of_birth?: string | null
  short_code?: number
  locations?: string[]
  default?: boolean
}

export interface StaffItem {
  staff_number?: string
  firstname?: string
  lastname?: string
  email?: string
  phone?: Record<string, unknown>
}

export interface MakeUserRequest {
  user: string
}

export interface SearchQuery {
  q: string
  fields?: string[]
}

export class Staff extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/staff'
  endpoint: string
  http: Client
  public options: StaffOptions
  public uriHelper: UriHelper

  constructor (options: StaffOptions, http: Client) {
    super(http, { endpoint: Staff.baseEndpoint, base: options.base ?? 'https://api.tillhub.com' })
    this.options = options
    this.http = http

    this.endpoint = Staff.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse> {
    let next

    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffFetchFailed(undefined, { status: response.status })
      }

      if (response.data.cursor?.next) {
        next = (): Promise<StaffResponse> => this.getAll({ uri: response.data.cursor.next })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count },
        next
      }
    } catch (error: any) {
      throw new StaffFetchFailed(error.message, { error })
    }
  }

  async create (staffMember: StaffMember, query?: HandleStaffQuery): Promise<StaffMemberResponse> {
    const base = this.uriHelper.generateBaseUri()
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().post(uri, staffMember)
      if (response.status !== 200) throw new StaffMemberCreateFailed()

      return {
        data: response.data.results[0] as StaffMember,
        metadata: { count: response.data.count },
        errors: response.data.errors || []
      }
    } catch (error: any) {
      throw new StaffMemberCreateFailed(error.message, { error })
    }
  }

  async getOne (staffId: string): Promise<StaffMemberResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new StaffFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as StaffMember,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffFetchOneFailed(error.message, { error })
    }
  }

  // the following is a ducplicate of getOne, in order to stay consistent with the method names in other handlers;
  // "get" is a method name expected by frontend components, e.g. remote-search-select
  async get (staffId: string): Promise<StaffMemberResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new StaffFetchOneFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as StaffMember,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffFetchOneFailed(error.message, { error })
    }
  }

  async put (staffId: string, staff: StaffMember): Promise<StaffMemberResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffId}`)
    try {
      const response = await this.http.getClient().put(uri, staff)
      if (response.status !== 200) { throw new StaffPutFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as StaffMember,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffPutFailed(error.message, { error })
    }
  }

  async delete (staffId: string): Promise<StaffMemberResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${staffId}`)
    try {
      const response = await this.http.getClient().delete(uri)
      if (response.status !== 200) { throw new StaffDeleteFailed(undefined, { status: response.status }) }

      return { msg: response.data.msg }
    } catch (error: any) {
      throw new StaffDeleteFailed(error.message, { error })
    }
  }

  async getPin (providedPin?: PinRequest): Promise<StaffMemberResponse> {
    const base = this.uriHelper.generateBaseUri('/pin')
    const uri = this.uriHelper.generateUriWithQuery(base, providedPin)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffPinGetFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new StaffPinGetFailed(undefined, {
          status: error.response.status,
          name: error.response.data.name
        })
      }
      throw new StaffPinGetFailed(error.message, { error })
    }
  }

  async getStaffNumber (providedStaffNumber?: StaffNumberRequest): Promise<StaffMemberResponse> {
    const base = this.uriHelper.generateBaseUri('/staff_number')
    const uri = this.uriHelper.generateUriWithQuery(base, providedStaffNumber)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffNumberGetFailed(undefined, {
          status: response.status
        })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        throw new StaffNumberGetFailed(undefined, {
          status: error.response.status,
          name: error.response.data.name
        })
      }
      throw new StaffNumberGetFailed(error.message, { error })
    }
  }

  async getFilters (queryOrOptions?: StaffQueryOrOptions): Promise<StaffResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, queryOrOptions)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffFetchFailed(undefined, { status: response.status })
      }

      const resp = response.data.results || []
      const resources = ['staff_number', 'lastname', 'firstname', 'email', 'phonenumbers']

      const list = resp.reduce((acc: any, curr: any) => {
        const obj: { [key: string]: string[] } = {}

        resources.forEach((key: string) => {
          obj[key] = acc[key] || []
          let currValue = curr[key]
          if (key === 'phonenumbers' && currValue) {
            currValue =
                currValue.mobile ||
                currValue.main ||
                currValue.home ||
                currValue.work ||
                currValue.any ||
                null
          }
          if (currValue && !obj[key].includes(currValue)) {
            obj[key].push(currValue)
          }
        })
        return obj
      }, {})

      return {
        data: list,
        metadata: { resources: resources }
      }
    } catch (error: any) {
      throw new StaffFetchFailed(error.message, { error })
    }
  }

  async makeUser (staffID: string, makeUserObj: MakeUserRequest): Promise<StaffMemberResponse> {
    const base = this.uriHelper.generateBaseUri(`/${staffID}/make_user`)

    try {
      const response = await this.http.getClient().post(base, makeUserObj)
      if (response.status !== 200) throw new MakeUserStaffFailed()

      return {
        data: response.data.results[0] as StaffMember,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new MakeUserStaffFailed(error.message, { error })
    }
  }

  async meta (query?: StaffQueryOrOptions | undefined): Promise<StaffMemberResponse> {
    const base = this.uriHelper.generateBaseUri('/meta')
    const uri = this.uriHelper.generateUriWithQuery(base, query)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new StaffMetaFailed(undefined, { status: response.status })
      }
      if (!response.data.results[0]) {
        throw new StaffMetaFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0],
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffMetaFailed(error.message, { error })
    }
  }

  async search (query: string | SearchQuery): Promise<StaffMemberResponse> {
    let uri
    if (typeof query === 'string') {
      uri = this.uriHelper.generateBaseUri(`/search?q=${query}`)
    } else if (typeOf(query) === 'object') {
      const base = this.uriHelper.generateBaseUri('/search')
      uri = this.uriHelper.generateUriWithQuery(base, query)
    } else {
      throw new StaffSearchFailed('Could not search for staff - query type is invalid')
    }

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) { throw new StaffSearchFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new StaffSearchFailed(error.message, { error })
    }
  }
}

export class StaffFetchFailed extends BaseError {
  public name = 'StaffFetchFailed'
  constructor (
    public message: string = 'Could not fetch all the Staff members',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffFetchFailed.prototype)
  }
}

export class StaffFetchOneFailed extends BaseError {
  public name = 'StaffFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch the Staff member',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffFetchOneFailed.prototype)
  }
}

export class StaffPutFailed extends BaseError {
  public name = 'StaffPutFailed'
  constructor (
    public message: string = 'Could not alter the Staff member',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPutFailed.prototype)
  }
}

export class StaffDeleteFailed extends BaseError {
  public name = 'StaffDeleteFailed'
  constructor (
    public message: string = 'Could not delete the Staff member',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffDeleteFailed.prototype)
  }
}

export class StaffMemberCreateFailed extends BaseError {
  public name = 'StaffMemberCreateFailed'
  constructor (
    public message: string = 'Could not create the Staff member',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffMemberCreateFailed.prototype)
  }
}

export class StaffPinGetFailed extends BaseError {
  public name = 'StaffPinGetFailed'
  constructor (
    public message: string = 'Could not get a unique Staff pin number',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffPinGetFailed.prototype)
  }
}

export class StaffNumberGetFailed extends BaseError {
  public name = 'StaffNumberGetFailed'
  constructor (
    public message: string = 'Could not get a unique Staff number',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffNumberGetFailed.prototype)
  }
}

export class MakeUserStaffFailed extends BaseError {
  public name = 'MakeUserStaffFailed'
  constructor (
    public message: string = 'Could not make the staff member a user',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, MakeUserStaffFailed.prototype)
  }
}
export class StaffMetaFailed extends BaseError {
  public name = 'StaffMetaFailed'
  constructor (
    public message: string = 'Could not get meta of staff',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffMetaFailed.prototype)
  }
}
export class StaffSearchFailed extends BaseError {
  public name = 'StaffSearchFailed'
  constructor (
    public message: string = 'Could not search for staff',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, StaffSearchFailed.prototype)
  }
}
