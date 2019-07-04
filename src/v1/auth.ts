import axios from 'axios'
import * as errors from '../errors'
import * as v0 from '../v0'
import {
  AuthOptions,
  UsernameAuth,
  AuthTypes,
  AuthResponse,
  KeyAuth,
  OrgAuth,
  TokenAuth,
  SupportAuth
} from '../v0/auth'

/**
 * @extends "v0.Auth"
 */
export class Auth extends v0.Auth {
  authenticated: boolean = false
  public options: AuthOptions

  constructor(options: AuthOptions) {
    super(options)
    this.options = options

    this.options.base = this.options.base || 'https://api.tillhub.com'

    if (!this.options.credentials) return

    this.determineAuthType()

    if (this.options.user && this.options.type === AuthTypes.token) {
      this.setDefaultHeader(this.options.user, (this.options.credentials as TokenAuth).token)
    }
  }

  async authenticate(): Promise<AuthResponse> {
    if (this.options.type === AuthTypes.username) {
      return this.loginUsername(this.options.credentials as UsernameAuth)
    }

    if (this.options.type === AuthTypes.token) {
      return this.loginServiceAccount(this.options.credentials as KeyAuth)
    }

    if (this.options.type === AuthTypes.org) {
      return this.loginWithOrganisation(this.options.credentials as OrgAuth)
    }

    if (this.options.type === AuthTypes.support) {
      return this.loginAsSupport(this.options.credentials as SupportAuth)
    }

    throw new errors.AuthenticationFailed('No auth data was provided')
  }

  async loginServiceAccount(authData: KeyAuth): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.options.base}/api/v1/users/auth/key`, {
        id: authData.id,
        api_key: authData.apiKey
      })

      this.setDefaultHeader(
        response.data.user.legacy_id || response.data.user.id,
        response.data.token
      )

      return {
        token: response.data.token,
        user: response.data.user.legacy_id || response.data.user.id,
        name: response.data.user.name
      } as AuthResponse
    } catch (err) {
      const error = new errors.AuthenticationFailed()
      err.error = err
      err.body = err.response && err.response.data ? err.response.data : null

      throw error
    }
  }

  async loginWithOrganisation(authData: OrgAuth): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${this.options.base}/api/v1/users/auth/organisation/login`,
        {
          organisation: authData.organisation,
          username: authData.username,
          password: authData.password
        }
      )

      this.setDefaultHeader(
        response.data.user.legacy_id || response.data.user.id,
        response.data.token
      )

      const { sub_user: { role = null, scopes = [] } = {} } = response.data

      return {
        token: response.data.token,
        user: response.data.user.legacy_id || response.data.user.id,
        name: response.data.user.name,
        role,
        scopes
      } as AuthResponse
    } catch (err) {
      const error = new errors.AuthenticationFailed()
      err.error = err
      err.body = err.response && err.response.data ? err.response.data : null

      throw error
    }
  }

  async loginAsSupport(authData: SupportAuth): Promise<AuthResponse> {
    try {
      const response = await axios.post(
        `${this.options.base}/api/v1/users/auth/support/login`,
        {
          token: authData.token,
          client_account: authData.client_account
        }
      )

      this.setDefaultHeader(
        response.data.user.legacy_id || response.data.user.id,
        response.data.token
      )

      return {
        token: response.data.token,
        user: response.data.user.legacy_id || response.data.user.id,
        name: response.data.user.name,
        scopes: response.data.user.scopes,
        role: response.data.user.role,
        is_support: true
      } as AuthResponse
    } catch (err) {
      const error = new errors.AuthenticationFailed()
      err.error = err
      err.body = err.response && err.response.data ? err.response.data : null

      throw error
    }
  }
}
