import axios from 'axios'
import * as errors from './Errors'
import { Client } from './Client'

export enum AuthTypes {
  password = 1,
  token
}

export interface AuthOptions {
  type: AuthTypes
  data: PasswordAuth | TokenAuth
}

export interface PasswordAuth {
  email: string
  password: string
}

export interface TokenAuth {
  token: string
  serviceaccount: string
}

export class Auth {
  authenticated: boolean = false
  public options: AuthOptions
  client: Client

  constructor(options: AuthOptions, client: Client) {
    this.options = options
    this.client = client
  }

  async loginWithPassword(
    authData: PasswordAuth
  ): Promise<[errors.AuthenticationFailed | null, object | null]> {
    try {
      const response = await this.client.getClient().post('api/v0/users/login', {
        email: authData.email,
        password: authData.password
      })
      return [null, response.data]
    } catch (err) {
      return [
        new errors.AuthenticationFailed(),
        err.ressponse && err.response.data ? err.response.data : null
      ]
    }
  }

  async loginWithToken(
    authData: TokenAuth
  ): Promise<[errors.AuthenticationFailed | null, object | null]> {
    try {
      const response = await this.client.getClient().post('api/v0/users/login', {
        user: authData.serviceaccount,
        token: authData.token
      })
      return [null, response.data]
    } catch (err) {
      return [
        new errors.AuthenticationFailed(),
        err.ressponse && err.response.data ? err.response.data : null
      ]
    }
  }

  async login(): Promise<[errors.AuthenticationFailed | null, object | null]> {
    if (this.options.type === AuthTypes.password) {
      return this.loginWithPassword(this.options.data as PasswordAuth)
    }

    if (this.options.type === AuthTypes.token) {
      return this.loginWithToken(this.options.data as TokenAuth)
    }

    return [new errors.AuthenticationFailed('No auth data was provided'), null]
  }
}
