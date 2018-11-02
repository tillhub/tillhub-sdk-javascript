// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
import { AuthOptions, AuthTypes, UsernameAuth, KeyAuth, TokenAuth } from './v0/auth'
import { Auth } from './v1/auth'
import * as v0 from './v0'
import * as v1 from './v1'
import { Client, ClientOptions } from './client'
import * as errors from './errors'

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
  transactions(): v0.Transactions {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Transactions({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated taxes instance
   *
   */
  taxes(): v0.Taxes {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Taxes({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated products instance
   *
   */
  products(): v1.Products {
    if (!this.options || !this.options.base || !this.http || !this.auth) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.Products({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated product groups instance
   *
   */
  productGroups(): v0.ProductGroups {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.ProductGroups({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated deliveries instance
   *
   */
  deliveries(): v0.Deliveries {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Deliveries({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated accounts instance
   *
   */
  accounts(): v0.Accounts {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Accounts({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated templates instance
   *
   */
  templates(): v1.Templates {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.Templates({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  configurations(): v0.Configurations {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Configurations({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated branches instance
   *
   */
  branches(): v0.Branches {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Branches({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated customers instance
   *
   */
  customers(): v0.Customers {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Customers({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated vouchers instance
   *
   */
  vouchers(): v0.Vouchers {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Vouchers({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated invoices instance
   *
   */
  invoices(): v0.Invoices {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Invoices({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Stocks instance
   *
   */
  stocks(): v0.Stocks {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Stocks({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Orders instance
   *
   */
  orders(): v0.Orders {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Orders({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Analytics instance
   *
   */
  analytics(): v0.Analytics {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Analytics({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Transactions instance
   *
   */
  transactions_v1(): v1.Transactions {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.Transactions({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Staff instance
   *
   */
  staff(): v0.Staff {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Staff({ user: this.auth.user, base: this.options.base }, this.http)
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
