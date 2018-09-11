import axios from 'axios'
import * as errors from '../Errors'
import { Client, ClientOptions } from '../Client'

export enum AuthTypes {
  username = 1,
  key,
  token
}

export interface AuthOptions {
  type?: AuthTypes | undefined
  credentials?: UsernameAuth | KeyAuth | TokenAuth
  base?: string | undefined
}

export interface UsernameAuth {
  username: string
  password: string
}

export interface KeyAuth {
  id: string
  apiKey: string
}

export interface TokenAuth {
  token: string
}

export function isUsernameAuth(object: any): object is UsernameAuth {
  return 'password' in object
}

export function isKeyAuth(object: any): object is KeyAuth {
  return 'apiKey' in object
}

export function isTokenAuth(object: any): object is KeyAuth {
  return 'token' in object
}

export interface AuthResponse {
  token: string
  user: string
  name?: string
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
    if (isKeyAuth(this.options.credentials)) this.options.type = AuthTypes.key
    if (isTokenAuth(this.options.credentials)) this.options.type = AuthTypes.token
  }

  async authenticate(): Promise<AuthResponse> {
    if (this.options.type === AuthTypes.username) {
      return this.loginUsername(this.options.credentials as UsernameAuth)
    }

    throw new errors.AuthenticationFailed('No auth data was provided')
  }

  async loginUsername(authData: UsernameAuth = {} as UsernameAuth): Promise<AuthResponse> {
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
