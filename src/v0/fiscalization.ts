import { Client } from '../client'
import { BaseError } from '../errors/baseError'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface FiscalizationOptions {
  user?: string
  base?: string
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

export class Fiscalization extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/fiscalization'
  endpoint: string
  http: Client
  public options: FiscalizationOptions
  public uriHelper: UriHelper

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
  }

  async init (options: FiscalizationItem): Promise<FiscalizationResponse> {
    const uri = this.uriHelper.generateBaseUri('/initialize')

    try {
      const response = await this.http.getClient().put(uri, options)
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
        data: response.data.results[0] as fiscalizationLicenseKey,
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new FiscalizationSetLicenseFailed(error.message, { error })
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
