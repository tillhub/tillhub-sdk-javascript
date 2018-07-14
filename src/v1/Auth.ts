import axios from 'axios'
import * as errors from '../Errors'
import v0 from '../v0'
import { AuthOptions, UsernameAuth, AuthTypes, AuthResponse, TokenAuth, isUsernameAuth, isTokenAuth } from '../v0/auth'

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

    if (isUsernameAuth(this.options.credentials)) this.options.type = AuthTypes.username
    if (isTokenAuth(this.options.credentials)) this.options.type = AuthTypes.username
  }

  async authenticate(): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]> {
    if (this.options.type === AuthTypes.username) {
      return this.loginUsername(this.options.credentials as UsernameAuth)
    }

    if (this.options.type === AuthTypes.token) {
      return this.loginServiceAccount(this.options.credentials as TokenAuth)
    }

    return [new errors.AuthenticationFailed('No auth data was provided'), null]
  }

  async loginServiceAccount(
    authData: TokenAuth
  ): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]> {
    try {
      const response = await axios.post(`${this.options.base}/api/v1/users/auth/key`, {
        id: authData.id,
        apiKey: authData.apiKey
      })
      return [null, response.data]
    } catch (err) {
      return [
        new errors.AuthenticationFailed(),
        err.ressponse && err.response.data ? err.response.data : null
      ]
    }
  }
}
