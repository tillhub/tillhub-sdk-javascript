import axios from 'axios'
import * as errors from '../Errors'
import v0 from '../v0'
import { AuthOptions, UsernameAuth, AuthTypes, AuthResponse, KeyAuth } from '../v0/Auth'

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
  }

  async authenticate(): Promise<AuthResponse> {
    if (this.options.type === AuthTypes.username) {
      return this.loginUsername(this.options.credentials as UsernameAuth)
    }

    if (this.options.type === AuthTypes.token) {
      return this.loginServiceAccount(this.options.credentials as KeyAuth)
    }

    throw new errors.AuthenticationFailed('No auth data was provided')
  }

  async loginServiceAccount(authData: KeyAuth): Promise<AuthResponse> {
    try {
      const response = await axios.post(`${this.options.base}/api/v1/users/auth/key`, {
        id: authData.id,
        apiKey: authData.apiKey
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
      err.body = err.ressponse && err.response.data ? err.response.data : null

      throw error
    }
  }
}
