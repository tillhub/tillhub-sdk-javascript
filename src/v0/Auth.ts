import axios from 'axios'
import * as errors from '../Errors'

export enum AuthTypes {
  username = 1,
  token
}

export interface AuthOptions {
  type?: AuthTypes | undefined
  credentials: UsernameAuth | TokenAuth,
  base?: string | undefined
}

export interface UsernameAuth {
  username: string
  password: string
}

export interface TokenAuth {
  id: string
  apiKey: string
}

export function isUsernameAuth(object: any): object is UsernameAuth {
  return 'password' in object;
}

export function isTokenAuth(object: any): object is TokenAuth {
  return 'apiKey' in object;
}

export interface AuthResponse {
  token: string,
  user: string
}

/**
 * @class "v0.Auth"
 */
export class Auth {
  authenticated: boolean = false
  public options: AuthOptions

  constructor(options: AuthOptions) {
    this.options = options

    this.options.base = this.options.base || 'https://api.tillhub.com'

    if (isUsernameAuth(this.options.credentials)) this.options.type = AuthTypes.username
    if (isTokenAuth(this.options.credentials)) this.options.type = AuthTypes.username
  }

  async authenticate(): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]> {
    if (this.options.type === AuthTypes.username) {
      return this.loginUsername(this.options.credentials as UsernameAuth)
    }

    return [new errors.AuthenticationFailed('No auth data was provided'), null]
  }

  async loginUsername(
    authData: UsernameAuth
  ): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]> {
    try {
      const response = await axios.post(`${this.options.base}/api/v0/users/login`, {
        email: authData.username,
        password: authData.password
      })

      return [null, { token: response.data.token, user: response.data.user.legacy_id || response.data.user.id } as AuthResponse]
    } catch (err) {
      return [
        new errors.AuthenticationFailed(),
        err.ressponse && err.response.data ? err.response.data : null
      ]
    }
  }
}
