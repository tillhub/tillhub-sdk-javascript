import { Client } from '../client'
import { UriHelper } from '../uri-helper'
import {
  LegacySettingFetchFailed,
  LegacySettingsFetchFailed,
  LegacySettingUpdateFailed
} from '../errors'

export interface LegacySettingsOptions {
  user?: string
  base?: string
}

export interface LegacySetting {
  id?: number
  product_number_length?: number
  require_cashier_pin?: number
  barcode_length?: number
  product_group_number_length?: number
  customer_number_length?: number
  show_product_number?: number
  show_product_group_number?: number
  cash_payment_type?: number
  login?: number
  auto_product_number_enabled?: number
  auto_product_group_number_enabled?: number
  auto_customer_number_enabled?: number
  auto_staff_number_enabled?: number
  staff_number_length?: number
  require_salesman_pin?: number
  zedas_url?: string
  templater_url?: string
  invoice_id?: number
  fleurop_voucher?: number
  print_without_tax_enabled?: number
  fa_transit_account?: string
  shop_url?: string
  franchise_id?: string
  updated_at?: string
  update_id?: number
  customer_number_type?: string
  supported_languages?: string
  skr_transit?: string
}

export interface LegacySettingsResponse {
  data: LegacySetting[]
  metadata: {
    count: number
  }
}

export interface LegacySettingResponse {
  data: LegacySetting
  metadata: {
    count: number
  }
  msg?: string
}

export class LegacySettings {
  endpoint: string
  http: Client
  public options: LegacySettingsOptions
  public uriHelper: UriHelper

  constructor (options: LegacySettingsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/settings_old'
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (): Promise<LegacySettingsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri()

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new LegacySettingsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new LegacySettingsFetchFailed(error.message, { error })
    }
  }

  async get (legacySettingId: string): Promise<LegacySettingResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${legacySettingId}`)
    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new LegacySettingFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as LegacySetting,
        msg: response.data.msg,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new LegacySettingFetchFailed(error.message, { error })
    }
  }

  async update (legacySettingId: string, LegacySetting: LegacySetting): Promise<LegacySettingResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${legacySettingId}`)
    try {
      const response = await this.http.getClient().patch(uri, LegacySetting)

      return {
        data: response.data.results[0] as LegacySetting,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new LegacySettingUpdateFailed(error.message, { error })
    }
  }
}
