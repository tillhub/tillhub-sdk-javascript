import axios from 'axios'
import * as errors from '../errors'
import { Client, ClientOptions } from '../client'

export enum AuthTypes {
  username = 1,
  key,
  token,
  org,
  support
}

export interface AuthOptions {
  type?: AuthTypes | undefined
  credentials?: UsernameAuth | KeyAuth | TokenAuth
  base?: string | undefined
  user?: string
  token?: string
}

export interface UsernameAuth {
  username: string
  password: string
  recaptcha_token?: string
}

export interface KeyAuth {
  id: string
  apiKey: string
}

export interface OrgAuth {
  organisation: string
  username: string
  password: string
  recaptcha_token?: string
}

export interface SupportAuth {
  token: string
  client_account: string
  recaptcha_token?: string
}

export interface PasswordResetRequest {
  email: string
}

export interface PasswordResetNonce {
  password: string
  password_reset_id: string
}

export interface PasswordResetRequestResponse {
  msg: string
}
export interface LogoutResponse {
  msg: string
}

export interface TokenAuth {
  token: string
}

export function isUsernameAuth(obj: any): obj is UsernameAuth {
  return 'password' in obj
}

export function isKeyAuth(obj: any): obj is KeyAuth {
  return 'apiKey' in obj
}

export function isTokenAuth(obj: any): obj is KeyAuth {
  return 'token' in obj
}

export function isOrgAuth(obj: any): obj is KeyAuth {
  return 'organisation' in obj
}

export interface AuthResponse {
  token: string
  user: string
  name?: string
  features?: any
  is_support?: boolean
  scopes?: string[]
  role?: string
  subUser?: Record<string, unknown>
  orgName?: string
  expiresAt?: string
}

/**
 * @class "v0.Auth"
 */
export class Auth {
  authenticated = false
  public options: AuthOptions
  public token?: string
  public user?: string

  constructor(options: AuthOptions) {
    this.options = options

    this.options.base = this.options.base || 'https://api.tillhub.com'

    if (!this.options.credentials) return

    this.determineAuthType()

    if (this.options.user && this.options.type === AuthTypes.token) {
      this.setDefaultHeader(this.options.user, (this.options.credentials as TokenAuth).token)
    }
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  public clearInstance(): void {
    this.authenticated = false
    this.options.credentials = undefined
    this.options.token = undefined
    this.options.user = undefined
    this.options.type = undefined
  }

  protected determineAuthType(): void {
    if (isUsernameAuth(this.options.credentials)) this.options.type = AuthTypes.username
    if (isKeyAuth(this.options.credentials)) this.options.type = AuthTypes.key
    if (isTokenAuth(this.options.credentials)) this.options.type = AuthTypes.token
    if (isOrgAuth(this.options.credentials)) this.options.type = AuthTypes.org
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
        password: password,
        recaptcha_token: authData.recaptcha_token
      })

      this.setDefaultHeader(
        response.data.user.legacy_id || response.data.user.id,
        response.data.token
      )

      return {
        token: response.data.token,
        user: response.data.user.legacy_id || response.data.user.id,
        name: response.data.user.name,
        features: response.data.features || {},
        scopes: response.data.user.scopes,
        role: response.data.user.role,
        orgName: response.data.user.display_name,
        expiresAt: response.data.expires_at
      } as AuthResponse
    } catch (err) {
      const error = new errors.AuthenticationFailed()
      err.error = err
      err.body = err.response && err.response.data ? err.response.data : null

      throw error
    }
  }

  async requestPasswordReset(target: PasswordResetRequest): Promise<PasswordResetRequestResponse> {
    try {
      const { data } = await axios.post(`${this.options.base}/api/v0/users/login/reset`, {
        email: target.email
      })

      return {
        msg: data.msg
      } as PasswordResetRequestResponse
    } catch (err) {
      throw new errors.PasswordResetRequestFailed(undefined, { error: err })
    }
  }

  async setNewPassword(nonce: PasswordResetNonce): Promise<PasswordResetRequestResponse> {
    try {
      const { data } = await axios.post(`${this.options.base}/api/v0/users/login/reset`, {
        password: nonce.password,
        password_reset_id: nonce.password_reset_id
      })

      return {
        msg: data.msg
      } as PasswordResetRequestResponse
    } catch (err) {
      throw new errors.PasswordSetRequestFailed(undefined, { error: err })
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
    this.authenticated = true

    Client.getInstance(clientOptions).setDefaults(clientOptions)
  }

  public async logout(token?: string): Promise<LogoutResponse> {
    if (!token && !this.token) {
      throw new LogoutMissingToken()
    }

    try {
      const { data } = await axios.get(`${this.options.base}/api/v0/users/logout`, {
        headers: {
          Authorization: `Bearer ${token || this.token}`
        }
      })

      return {
        msg: data.msg
      } as LogoutResponse
    } catch (err) {
      throw new LogoutFailed(undefined, { error: err })
    }
  }
}

export class LogoutMissingToken extends errors.BaseError {
  public name = 'LogoutMissingToken'
  constructor(
    public message: string = 'Could not log out due to missing token.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, LogoutMissingToken.prototype)
  }
}

export class LogoutFailed extends errors.BaseError {
  public name = 'LogoutFailed'
  constructor(public message: string = 'Could not log out.', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, LogoutFailed.prototype)
  }
}
