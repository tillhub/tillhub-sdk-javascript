import { Client, Timeout } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface FiscalizationOptions {
  user?: string
  base?: string
  timeout?: Timeout
}

export interface OrganizationAddress {
  name: string | null
  address_line1: string | null
  town: string | null
  zip: string | null
  country_code: string | null
}

export interface fiscalizationConfiguration {
  fon_participant_id: string | null
  fon_user_id: string | null
  fon_user_pin: string | null
}

export declare type provider = 'at_fiskaly' | null

export interface FiscalizationItem {
  provider: provider
  payload: {
    branchId: string | null
    organization: OrganizationAddress
    fon: fiscalizationConfiguration
  }
}

export interface fiscalizationLicenseKey {
  licenseKey: string | null
}

export interface FiscalizationResponse {
  data?: FiscalizationItem
  msg?: string
}

export interface FiskalyDeCompany {
  name: string
  street: string
  streetNumber?: string | null
  postalCode: string
  locality: string
  country: string
  vatId?: string | null
  taxNumber?: string | null
}

export interface FiskalyDeOrganizationCreateRequest {
  branchId?: string
  company: FiskalyDeCompany
}

export interface FiskalyDeOrganization {
  organizationId: string
  organizationType: string
  managedBy: string
}

export interface FiskalyDeTss {
  tssId: string
  clientId: string
  clientSerialNumber: string
}

export interface FiskalyDeOrganizationResponse {
  data?: FiskalyDeOrganization
  msg?: string
}

export interface FiskalyDeTssResponse {
  data?: FiskalyDeTss
  msg?: string
}

export class Fiscalization extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/fiscalization'
  endpoint: string
  http: Client
  public options: FiscalizationOptions
  public uriHelper: UriHelper
  public timeout: Timeout

  constructor (options: FiscalizationOptions, http: Client) {
    super(http, {
      endpoint: Fiscalization.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Fiscalization.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
    this.timeout = options.timeout ?? this.http.getClient().defaults.timeout
  }

  async init (options: FiscalizationItem): Promise<FiscalizationResponse> {
    const uri = this.uriHelper.generateBaseUri('/initialize')

    try {
      const response = await this.http.getClient().post(uri, options)
      if (response.status !== 200) { throw new FiscalizationInitFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as FiscalizationItem,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FiscalizationInitFailed(error.message, { error })
    }
  }

  async setLicense (branchId: string, options: fiscalizationLicenseKey): Promise<FiscalizationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/branches/${branchId}/set-license`)

    try {
      const response = await this.http.getClient().put(uri, options)
      if (response.status !== 200) { throw new FiscalizationSetLicenseFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as FiscalizationItem,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FiscalizationSetLicenseFailed(error.message, { error })
    }
  }

  async createFiskalyDeOrganization (options: FiskalyDeOrganizationCreateRequest): Promise<FiskalyDeOrganizationResponse> {
    const uri = this.uriHelper.generateBaseUri('/fiskaly/organizations')

    try {
      const response = await this.http.getClient().post(uri, options, { timeout: this.timeout })
      if (response.status !== 200) { throw new FiscalizationFiskalyDeOrganizationCreateFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as FiskalyDeOrganization,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FiscalizationFiskalyDeOrganizationCreateFailed(error.message, { error })
    }
  }

  async createFiskalyDeTss (registerId: string): Promise<FiskalyDeTssResponse> {
    const uri = this.uriHelper.generateBaseUri(`/registers/${registerId}/tss`)

    try {
      const response = await this.http.getClient().post(uri, undefined, { timeout: this.timeout })
      if (response.status !== 200) { throw new FiscalizationFiskalyDeTssCreateFailed(undefined, { status: response.status }) }

      return {
        data: response.data.results[0] as FiskalyDeTss,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FiscalizationFiskalyDeTssCreateFailed(error.message, { error })
    }
  }
}

export class FiscalizationInitFailed extends BaseError {
  public name = 'FiscalizationInitFailed'
  constructor (
    public message: string = 'Could not init fiscalization',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FiscalizationInitFailed.prototype)
  }
}
export class FiscalizationSetLicenseFailed extends BaseError {
  public name = 'FiscalizationSetLicenseFailed'
  constructor (
    public message: string = 'Could not set license fiscalization',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FiscalizationSetLicenseFailed.prototype)
  }
}

export class FiscalizationFiskalyDeOrganizationCreateFailed extends BaseError {
  public name = 'FiscalizationFiskalyDeOrganizationCreateFailed'
  constructor (
    public message: string = 'Could not create the Fiskaly DE organization',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FiscalizationFiskalyDeOrganizationCreateFailed.prototype)
  }
}

export class FiscalizationFiskalyDeTssCreateFailed extends BaseError {
  public name = 'FiscalizationFiskalyDeTssCreateFailed'
  constructor (
    public message: string = 'Could not create the Fiskaly DE TSS',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, FiscalizationFiskalyDeTssCreateFailed.prototype)
  }
}
