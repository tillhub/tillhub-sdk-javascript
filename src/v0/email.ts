import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface EmailOptions {
  user?: string
  base?: string
}

export interface MailjetCredentials {
  apiKey: string
  apiSecret: string
  defaultSenderMail?: string
}

export interface MailjetEmail {
  name: string
  email: string
  isDefault: boolean
}

export interface MailjetConfiguration {
  credentials: {
    apiKey: string
    apiSecret: string
  }
  settings: {
    emails: MailjetEmail[]
  }
  isActive: boolean
}

export interface MailjetConfigurationResponse {
  data?: MailjetConfiguration | null
  msg?: string
  status?: number
}

export interface TestCustomMailjetRequest {
  email: string
}

export interface TestCustomMailjetResponse {
  data?: {
    success: boolean
    message: string
  }
  msg?: string
  status?: number
}


export interface CustomMailjetCredentialStatusResponse {
  data?: {
    hasCredentials: boolean
    isValid: boolean
    lastValidated: string | null
    error?: string
  }
  msg?: string
  status?: number
}

export class Email extends ThBaseHandler {
  public static baseEndpoint = '/api/v0/email'
  endpoint: string
  http: Client
  public options: EmailOptions
  public uriHelper: UriHelper

  constructor (options: EmailOptions, http: Client) {
    super(http, {
      endpoint: Email.baseEndpoint,
      base: options.base ?? 'https://api.tillhub.com'
    })
    this.options = options
    this.http = http

    this.endpoint = Email.baseEndpoint
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
    this.uriHelper = new UriHelper(this.endpoint, this.options)
  }

  async getMailjetConfiguration (): Promise<MailjetConfigurationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/mailjet-configuration')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new errors.EmailCredentialsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results || null,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCredentialsFetchFailed(error.message, { error })
    }
  }

  async setMailjetConfiguration (credentials: MailjetCredentials): Promise<MailjetConfigurationResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/mailjet-configuration')
      const response = await this.http.getClient().post(uri, credentials)

      if (response.status !== 200) {
        throw new errors.EmailCredentialsSetFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCredentialsSetFailed(error.message, { error })
    }
  }

  async testCustomMailjet (request: TestCustomMailjetRequest): Promise<TestCustomMailjetResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/test-custom-mailjet')
      const response = await this.http.getClient().post(uri, request)

      if (response.status !== 200) {
        throw new errors.EmailTestCustomMailjetFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailTestCustomMailjetFailed(error.message, { error })
    }
  }


  async getCustomMailjetCredentialStatus (): Promise<CustomMailjetCredentialStatusResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/custom-mailjet-credential-status')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new errors.EmailCustomMailjetCredentialStatusGetFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCustomMailjetCredentialStatusGetFailed(error.message, { error })
    }
  }
}
