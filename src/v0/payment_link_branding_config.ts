import {Client} from '../client'
import * as errors from '../errors'
import {UriHelper} from '../uri-helper'
import {ThBaseHandler} from '../base'

export interface PaymentLinkBrandingConfigurationOptions {
  user?: string
  base?: string
}

export interface PaymentLinkBrandingConfigurationQueryOptions {
  limit?: number
  uri?: string
  owner?: string
  query?: Record<string, unknown>
}

export interface PaymentLinkBrandingConfigurationsResponse {
  data: PaymentLinkBrandingConfiguration[]
  metadata: Record<string, unknown>
}

export interface PaymentLinkBrandingConfigurationResponse {
  data: PaymentLinkBrandingConfiguration
  metadata?: {
    count?: number
    patch?: any
  }
  msg?: string
}

export interface PaymentLinkBrandingConfiguration {
  id?: string
  userId?: string
  shopName?: string
  shopLogo?: string
  brandColor?: string
  backgroundColor?: string
  backgroundImage?: string
  fontStyle?: string
  formStyle?: string
  faviconUrl?: string
  textColor?: string
  linkColor?: string
  paymentFormBackgroundColor?: string
  basketBackgroundColor?: string
  termsAndConditionsUrl?: string
  privacyPolicyUrl?: string
  imprintUrl?: string
  helpUrl?: string
  contactUrl?: string
  successPageUrl?: string
  failurePageUrl?: string
  pendingPageUrl?: string
  cancelPageUrl?: string
  shadows?: boolean
  unzerLogoInFooter?: boolean
}

class PaymentLinkBrandingConfigurationReference {
  data: PaymentLinkBrandingConfiguration
  id?: string
  metadata?: {
    count?: number
    patch?: any
  }

  response: PaymentLinkBrandingConfigurationResponse
  private readonly options: PaymentLinkBrandingConfigurationOptions
  private readonly http: Client

  constructor(response: PaymentLinkBrandingConfigurationResponse, http: Client, options: PaymentLinkBrandingConfigurationOptions) {
    this.data = response.data
    this.id = response.data.id
    this.metadata = response.metadata
    this.response = response
    this.options = options
    this.http = http
  }
}

export class PaymentLinkBrandingConfigs extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/payment-link-branding-configs'
  endpoint: string
  http: Client
  public options: PaymentLinkBrandingConfigurationOptions
  public uriHelper: UriHelper

  constructor(options: PaymentLinkBrandingConfigurationOptions, http: Client) {
    super(http, {
      endpoint: PaymentLinkBrandingConfigs.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = PaymentLinkBrandingConfigs.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getAll (optionsOrQuery?: PaymentLinkBrandingConfigurationQueryOptions | undefined): Promise<PaymentLinkBrandingConfigurationsResponse> {
    try {
      const base = this.uriHelper.generateBaseUri()
      const uri = this.uriHelper.generateUriWithQuery(base, optionsOrQuery)

      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) throw new errors.PaymentLinkBrandingConfigFetchFailed()

      return {
        data: response.data.results,
        metadata: { count: response.data.count }
      }
    } catch (error: any) {
      throw new errors.PaymentLinkBrandingConfigFetchFailed(error.message, { error })
    }
  }

  async get(configurationId: string): Promise<PaymentLinkBrandingConfigurationReference> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)

    try {
      const response = await this.http.getClient().get(uri)
      if (response.status !== 200) {
        throw new errors.ConfigurationFetchFailed(undefined, {status: response.status})
      }

      // we are wrapping the response into a class to reference sub APIs more easily
      return new PaymentLinkBrandingConfigurationReference(
        {
          data: response.data.results[0] as PaymentLinkBrandingConfiguration,
          msg: response.data.msg,
          metadata: {count: response.data.count}
        },
        this.http,
        this.options
      )
    } catch (error: any) {
      throw new errors.ConfigurationFetchFailed(error.message, {error})
    }
  }

  async put(configurationId: string, configuration: PaymentLinkBrandingConfiguration): Promise<PaymentLinkBrandingConfigurationResponse> {

    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
    try {
      const response = await this.http.getClient().put(uri, configuration)

      return {
        data: response.data.results[0] as PaymentLinkBrandingConfiguration,
        metadata: {count: response.data.count}
      }
    } catch (error: any) {
      throw new errors.ConfigurationPutFailed(error.message, {error})
    }
  }

  async patch(configurationId: string, configuration: PaymentLinkBrandingConfiguration): Promise<PaymentLinkBrandingConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
    try {
      const response = await this.http.getClient().patch(uri, configuration)

      return {
        data: response.data.results[0] as PaymentLinkBrandingConfiguration,
        metadata: {count: response.data.count}
      }
    } catch (error: any) {
      throw new errors.ConfigurationPatchFailed(error.message, {error})
    }
  }

  async create(configuration: PaymentLinkBrandingConfiguration): Promise<PaymentLinkBrandingConfigurationResponse> {
    const uri = this.uriHelper.generateBaseUri()
    try {
      const response = await this.http.getClient().post(uri, configuration)

      return {
        data: response.data.results[0] as PaymentLinkBrandingConfiguration,
        metadata: {count: response.data.count}
      }
    } catch (error: any) {
      throw new errors.ConfigurationCreationFailed(error.message, {error})
    }
  }

  async delete(configurationId: string): Promise<PaymentLinkBrandingConfigurationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri(`/${configurationId}`)
      const response = await this.http.getClient().delete(uri)

      return {
        data: {},
        msg: response.data.msg
      }
    } catch (error: any) {
      throw new errors.ConfigurationDeleteFailed(error.message, {error})
    }
  }
}
