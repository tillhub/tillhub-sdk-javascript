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

export const defaultOptions: TillhubSDKOptions = {
  base: 'https://api.tillhub.com'
}

export interface TillhubSDKOptions {
  credentials?: UsernameAuth | TokenAuth | undefined
  base?: string
}

export class TillhubClient extends EventEmitter {
  user?: string
  auth?: Auth
  http?: Client

  public options: TillhubSDKOptions | undefined

  constructor(options?: TillhubSDKOptions) {
    super()

    if (!options) return

    this.handleOptions(options)
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  public init(options: TillhubSDKOptions = defaultOptions): void {
    this.handleOptions(options)
    const clientOptions: ClientOptions = {
      headers: {}
    }

    this.auth = new v1.Auth({ base: options ? options.base : defaultOptions.base })
    this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
  }

  private handleOptions(options: TillhubSDKOptions): void {
    this.options = options
    this.options.base = this.options.base || 'https://api.tillhub.com'

    if (options.credentials) {
      const authOptions: AuthOptions = {
        type: AuthTypes.username,
        credentials: options.credentials,
        base: this.options.base
      }

      this.auth = new v1.Auth(authOptions)
    }
  }

  /**
   * Create an authenticated transactions instance
   *
   */
  transactions(): Transactions {
    if (!this.options || !this.options.base || !this.http || !this.auth)
      throw new errors.UninstantiatedClient()
    return new Transactions({ user: this.auth.user, base: this.options.base }, this.http)
  }
}

export class Tillhub extends TillhubClient {
  private static instance: Tillhub
  constructor(options: TillhubSDKOptions) {
    super(options)
  }

  static getInstance(options: TillhubSDKOptions): Tillhub {
    if (!Tillhub.instance) {
      Tillhub.instance = new Tillhub(options)
    }

    return Tillhub.instance
  }
}

export default Tillhub.getInstance({ base: defaultOptions.base })
