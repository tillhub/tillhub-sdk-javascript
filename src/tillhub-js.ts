// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
import { AuthOptions, AuthTypes, UsernameAuth, KeyAuth, TokenAuth } from './v0/auth'
import { Auth } from './v1/auth'
import { Transactions } from './v0/transactions'
import { Taxes } from './v0/taxes'
import { Product } from './v1/product'
import { Client, ClientOptions } from './client'
import * as errors from './errors'

import v0 from './v0'
import v1 from './v1'

export { v0, v1 }

export const defaultOptions: TillhubSDKOptions = {
  base: 'https://api.tillhub.com'
}

export interface TillhubSDKOptions {
  credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined
  base?: string
  user?: string
}

export class TillhubClient {
  user?: string
  auth?: Auth
  http?: Client

  public options: TillhubSDKOptions | undefined

  constructor(options?: TillhubSDKOptions) {
    // super()

    if (!options) return

    this.handleOptions(options)
  }

  /**
   * Initialise the SDK instance by authenticating the client
   *
   */
  public init(options: TillhubSDKOptions = defaultOptions): void {
    // in cases where credentials and / or tokens and / or users are already
    // we will short circuit the client initialisations
    if (this.handleOptions(options)) return
    // in all other cases we will instantiate clients, that need to be authenticated
    // by the caller before any API will be available

    const clientOptions: ClientOptions = {
      headers: {}
    }

    this.auth = new v1.Auth({ base: options ? options.base : defaultOptions.base })
    this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
  }

  private handleOptions(options: TillhubSDKOptions): boolean {
    this.options = options
    this.options.base = this.options.base || 'https://api.tillhub.com'
    this.user = this.options.user

    if (options.credentials) {
      const authOptions: AuthOptions = {
        credentials: options.credentials,
        base: this.options.base,
        user: this.user
      }

      const clientOptions: ClientOptions = {
        headers: {}
      }

      this.auth = new v1.Auth(authOptions)
      this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
      return true
    }

    return false
  }

  /**
   * Create an authenticated transactions instance
   *
   */
  transactions(): Transactions {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new Transactions({ user: this.auth.user, base: this.options.base }, this.http)
  }

  taxes(): Taxes {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new Taxes({ user: this.auth.user, base: this.options.base }, this.http)
  }

  product(): Product {
    if (!this.options || !this.options.base || !this.http || !this.auth) {
      throw new errors.UninstantiatedClient()
    }

    return new Product({ user: this.auth.user, base: this.options.base }, this.http)
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
