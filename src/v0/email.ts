import { Client } from '../client'
import * as errors from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'

export interface EmailOptions {
  user?: string
  base?: string
}

export interface EmailCredentials {
  apiKey: string
  apiSecret: string
}

export interface EmailCredentialsResponse {
  data?: EmailCredentialsResult
  msg?: string
  status?: number
}

export interface EmailCredentialsResult {
  apiKey: string
  apiSecret: string
  email: string
  name: string
}

export interface EmailCredentialsListResponse {
  data: EmailCredentialsResult[]
  msg?: string
  status?: number
}

export interface CustomMailjetActiveRequest {
  enabled: boolean
}

export interface CustomMailjetActiveResponse {
  data?: CustomMailjetActiveResult[]
  msg?: string
  status?: number
}

export interface CustomMailjetActiveResult {
  isCustomMailjetActive: boolean
}

export interface TestCustomMailjetRequest {
  email: string
}

export interface TestCustomMailjetResponse {
  data?: TestCustomMailjetResult[]
  msg?: string
  status?: number
}

export interface TestCustomMailjetResult {
  success: boolean
  message: string
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

  async getCredentials (): Promise<EmailCredentialsListResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/credentials')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new errors.EmailCredentialsFetchFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCredentialsFetchFailed(error.message, { error })
    }
  }

  async setCredentials (credentials: EmailCredentials): Promise<EmailCredentialsResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/credentials')
      const response = await this.http.getClient().post(uri, credentials)

      if (response.status !== 200) {
        throw new errors.EmailCredentialsSetFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results[0] as EmailCredentialsResult,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCredentialsSetFailed(error.message, { error })
    }
  }

  async getCustomMailjetActive (): Promise<CustomMailjetActiveResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/custom-mailjet-active')
      const response = await this.http.getClient().get(uri)

      if (response.status !== 200) {
        throw new errors.EmailCustomMailjetActiveGetFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCustomMailjetActiveGetFailed(error.message, { error })
    }
  }

  async setCustomMailjetActive (request: CustomMailjetActiveRequest): Promise<CustomMailjetActiveResponse> {
    try {
      const uri = this.uriHelper.generateBaseUri('/custom-mailjet-active')
      const response = await this.http.getClient().post(uri, request)

      if (response.status !== 200) {
        throw new errors.EmailCustomMailjetActiveSetFailed(undefined, { status: response.status })
      }

      return {
        data: response.data.results,
        msg: response.data.msg,
        status: response.data.status
      }
    } catch (error: any) {
      throw new errors.EmailCustomMailjetActiveSetFailed(error.message, { error })
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
}
