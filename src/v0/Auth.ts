import axios from 'axios'
import * as errors from '../Errors'
import { Client, ClientOptions } from '../Client'

export enum AuthTypes {
  username = 1,
  token
}

export interface AuthOptions {
  type?: AuthTypes | undefined
  credentials?: UsernameAuth | TokenAuth
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
  return 'password' in object
}

export function isTokenAuth(object: any): object is TokenAuth {
  return 'apiKey' in object
}

export interface AuthResponse {
  token: string
  user: string
}

/**
 * @class "v0.Auth"
 */
export class Auth {
  authenticated: boolean = false
  public options: AuthOptions
  public token?: string
  public user?: string

  constructor(options: AuthOptions) {
    this.options = options

    this.options.base = this.options.base || 'https://api.tillhub.com'

    if (!this.options.credentials) return

    this.determineAuthType()
  }

  protected determineAuthType() {
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
    authData: UsernameAuth = {} as UsernameAuth
  ): Promise<[errors.AuthenticationFailed | null, AuthResponse | null]> {
    let username: string
    let password: string
    if (
      this.options.credentials &&
      (this.options.credentials as UsernameAuth).username &&
      (this.options.credentials as UsernameAuth).password
    ) {
      username = (this.options.credentials as UsernameAuth).username
      password = (this.options.credentials as UsernameAuth).password
    } else if (authData && authData.username && authData.password) {
      username = authData.username
      password = authData.password
    } else {
      throw new errors.UninstantiatedClient()
    }

    try {
      const response = await axios.post(`${this.options.base}/api/v0/users/login`, {
        email: username,
        password: password
      })

      this.setDefaultHeader(
        response.data.user.legacy_id || response.data.user.id,
        response.data.token
      )

      return [
        null,
        {
          token: response.data.token,
          user: response.data.user.legacy_id || response.data.user.id
        } as AuthResponse
      ]
    } catch (err) {
      return [
        new errors.AuthenticationFailed(),
        err.ressponse && err.response.data ? err.response.data : null
      ]
    }
  }

  protected setDefaultHeader(user: string, token: string): void {
    const clientOptions: ClientOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Client-ID': user
      }
    }

    this.token = token
    this.user = user

    Client.getInstance(clientOptions).setDefaults(clientOptions)
  }
}
