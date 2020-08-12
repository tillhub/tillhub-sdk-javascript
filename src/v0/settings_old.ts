import { Client } from '../client'
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
}

export class LegacySettings {
  endpoint: string
  http: Client
  public options: LegacySettingsOptions

  constructor(options: LegacySettingsOptions, http: Client) {
    this.options = options
    this.http = http

    this.endpoint = '/api/v0/settings_old'
    this.options.base = this.options.base || 'https://api.tillhub.com'
  }

  getAll(): Promise<LegacySettingsResponse> {
    return new Promise(async (resolve, reject) => {
      try {
        const uri = `${this.options.base}${this.endpoint}/${this.options.user}`

        const response = await this.http.getClient().get(uri)
        if (response.status !== 200) {
          return reject(new LegacySettingsFetchFailed(undefined, { status: response.status }))
        }

        return resolve({
          data: response.data.results,
          metadata: { count: response.data.count }
        } as LegacySettingsResponse)
      } catch (error) {
        return reject(new LegacySettingsFetchFailed(undefined, { error }))
      }
    })
  }

  get(LegacySettingId: string): Promise<LegacySettingResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${LegacySettingId}`

      try {
        const response = await this.http.getClient().get(uri)
        response.status !== 200 &&
          reject(new LegacySettingFetchFailed(undefined, { status: response.status }))

        return resolve({
          data: response.data.results[0] as LegacySetting,
          msg: response.data.msg,
          metadata: { count: response.data.count }
        } as LegacySettingResponse)
      } catch (error) {
        return reject(new LegacySettingFetchFailed(undefined, { error }))
      }
    })
  }

  update(LegacySettingId: string, LegacySetting: LegacySetting): Promise<LegacySettingResponse> {
    return new Promise(async (resolve, reject) => {
      const uri = `${this.options.base}${this.endpoint}/${this.options.user}/${LegacySettingId}`
      try {
        const response = await this.http.getClient().patch(uri, LegacySetting)

        return resolve({
          data: response.data.results[0] as LegacySetting,
          metadata: { count: response.data.count }
        } as LegacySettingResponse)
      } catch (error) {
        return reject(new LegacySettingUpdateFailed(undefined, { error }))
      }
    })
  }
}
