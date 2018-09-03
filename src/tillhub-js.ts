// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
import * as EventEmitter from 'events'
import { AuthResponse, AuthOptions, AuthTypes, UsernameAuth, TokenAuth } from './v0/Auth'
import { Auth } from './v1/Auth'
import { Transactions } from './v0/Transactions'
import { Client, ClientOptions } from './Client'
import * as errors from './Errors'

import v0 from './v0'
import v1 from './v1'

export { v0, v1 }

export interface TillhubSDKOptions {
  credentials?: UsernameAuth | TokenAuth | undefined
  base?: string
}

export class TillhubClient extends EventEmitter {
  user?: string
  auth: Auth
  http?: Client

  public options: TillhubSDKOptions

  constructor(options: TillhubSDKOptions) {
    super()

    this.options = options
    this.options.base = this.options.base || 'https://api.tillhub.com'

    const authOptions: AuthOptions = {
      type: AuthTypes.username,
      credentials: options.credentials,
      base: this.options.base
    }

    this.auth = new v1.Auth(authOptions)
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  async init(): Promise<errors.AuthenticationFailed | Auth | undefined> {
    // if we didn't provide auth credentials, we will just set the http client
    // and set defaults on the client later.
    if (!this.auth) {
      const clientOptions: ClientOptions = {
        headers: {
          'X-Client-Type': 'sdk'
        }
      }

      this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
      return undefined
    }

    try {
      const [authErr, authResponse] = await this.auth.authenticate()
      if (authErr) throw authErr

      if (authResponse) {
        this.user = authResponse.user
        const clientOptions: ClientOptions = {
          headers: {
            Authorization: `Bearer ${authResponse.token}`,
            'X-Client-ID': authResponse.user,
            'X-Client-Type': 'sdk'
          }
        }

        this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
        return this.auth
      }

      throw new errors.AuthenticationFailed()
    } catch (err) {
      throw err
    }
  }

  /**
   * Create an authenticated transactions instance
   *
   */
  transactions(): Transactions {
    if (!this.http) throw new errors.UninstantiatedClient()
    return new Transactions({ user: this.user, base: this.options.base }, this.http)
  }
}

export default class Tillhub extends TillhubClient {
  private static instance: Tillhub
  private constructor(options: TillhubSDKOptions) {
    super(options)

    if (!Tillhub.instance) {
      Tillhub.instance = new Tillhub(options)
    }

    return Tillhub.instance
  }
}
