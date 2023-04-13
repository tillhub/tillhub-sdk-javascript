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
  whitelabel?: string
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

export function isUsernameAuth (obj: any): obj is UsernameAuth {
  return 'password' in obj
}

export function isKeyAuth (obj: any): obj is KeyAuth {
  return 'apiKey' in obj
}

export function isTokenAuth (obj: any): obj is KeyAuth {
  return 'token' in obj
}

export function isOrgAuth (obj: any): obj is KeyAuth {
  return 'organisation' in obj
}

export interface ErrorObject {
  id: string
  label: string
  errorDetails: Record<string, unknown>
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
  whitelabel?: string
  errors?: ErrorObject[]
}

/**
 * @class "v0.Auth"
 */
export class Auth {
  authenticated = false
  public options: AuthOptions
  public token?: string
  public user?: string
  public whitelabel?: string | undefined

  constructor (options: AuthOptions) {
    this.options = options

    this.options.base = this.options.base ?? 'https://api.tillhub.com'

    if (!this.options.credentials) return

    this.determineAuthType()

    if (this.options.user && this.options.type === AuthTypes.token) {
      this.setDefaultHeader(this.options.user, (this.options.credentials as TokenAuth).token, this.options.whitelabel)
    }
  }

  getEndpoint (path?: string): string {
    const base = this.options.base ?? 'https://api.tillhub.com'
    const _path = path ?? ''
    return `${base}${_path}`
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  public clearInstance (): void {
    this.authenticated = false
    this.options.credentials = undefined
    this.options.token = undefined
    this.options.user = undefined
    this.options.type = undefined
  }

  protected determineAuthType (): void {
    if (isUsernameAuth(this.options.credentials)) this.options.type = AuthTypes.username
    if (isKeyAuth(this.options.credentials)) this.options.type = AuthTypes.key
    if (isTokenAuth(this.options.credentials)) this.options.type = AuthTypes.token
    if (isOrgAuth(this.options.credentials)) this.options.type = AuthTypes.org
  }

  async authenticate (): Promise<AuthResponse> {
    if (this.options.type === AuthTypes.username) {
      return await this.loginUsername(this.options.credentials as UsernameAuth)
    }

    throw new errors.AuthenticationFailed('No auth data was provided')
  }

  async loginUsername (authData: UsernameAuth): Promise<AuthResponse> {
    let username: string
    let password: string
    if (
      this.options.credentials &&
      (this.options.credentials as UsernameAuth).username &&
      (this.options.credentials as UsernameAuth).password
    ) {
      username = (this.options.credentials as UsernameAuth).username
      password = (this.options.credentials as UsernameAuth).password
    } else if (authData?.username && authData.password) {
      username = authData.username
      password = authData.password
    } else {
      throw new errors.UninstantiatedClient()
    }

    try {
      const response = await axios.post(this.getEndpoint('/api/v0/users/login'), {
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
        whitelabel: response.data.user.whitelabel,
        expiresAt: response.data.expires_at
      }
    } catch (err: any) {
      const error = new errors.AuthenticationFailed()
      err.error = err
      err.body = err.response?.data ?? null

      throw error
    }
  }

  async requestPasswordReset (target: PasswordResetRequest): Promise<PasswordResetRequestResponse> {
    try {
      const { data } = await axios.post(this.getEndpoint('/api/v0/users/login/reset'), {
        email: target.email
      })

      return {
        msg: data.msg
      }
    } catch (error: any) {
      throw new errors.PasswordResetRequestFailed(error.message, { error })
    }
  }

  async setNewPassword (nonce: PasswordResetNonce): Promise<PasswordResetRequestResponse> {
    try {
      const { data } = await axios.post(this.getEndpoint('/api/v0/users/login/reset'), {
        password: nonce.password,
        password_reset_id: nonce.password_reset_id
      })

      return {
        msg: data.msg
      }
    } catch (error: any) {
      throw new errors.PasswordSetRequestFailed(error.message, { error })
    }
  }

  protected setDefaultHeader (user: string, token: string, whitelabel?: string): void {
    const clientOptions: ClientOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
        'X-Client-ID': user,
        'x-whitelabel': whitelabel
      }
    }

    this.token = token
    this.user = user
    this.whitelabel = whitelabel
    this.authenticated = true

    Client.getInstance(clientOptions).setDefaults(clientOptions)
  }

  public async logout (token?: string, whitelabel?: string): Promise<LogoutResponse> {
    const _token = token ?? this.token ?? ''
    const _whitelabel = whitelabel ?? this.whitelabel ?? ''
    if (!_token) {
      throw new LogoutMissingToken()
    }

    try {
      const { data } = await axios.get(this.getEndpoint('/api/v0/users/logout'), {
        headers: {
          Authorization: `Bearer ${_token}`,
          'x-whitelabel': _whitelabel
        }
      })

      return {
        msg: data.msg
      }
    } catch (error: any) {
      throw new LogoutFailed(error.message, { error })
    }
  }
}

export class LogoutMissingToken extends errors.BaseError {
  public name = 'LogoutMissingToken'
  constructor (
    public message: string = 'Could not log out due to missing token.',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, LogoutMissingToken.prototype)
  }
}

export class LogoutFailed extends errors.BaseError {
  public name = 'LogoutFailed'
  constructor (public message: string = 'Could not log out.', properties?: Record<string, unknown>) {
    super(message, properties)
    Object.setPrototypeOf(this, LogoutFailed.prototype)
  }
}
