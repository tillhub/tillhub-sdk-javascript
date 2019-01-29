// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
import events from 'events'
// import { AxiosError } from 'axios'
import { AuthOptions, AuthTypes, UsernameAuth, KeyAuth, TokenAuth } from './v0/auth'
import { Auth } from './v1/auth'
import * as v0 from './v0'
import * as v1 from './v1'
import { Client, ClientOptions } from './client'
import * as errors from './errors'
import { environment } from './environment'

export { v0, v1 }

export const defaultOptions: TillhubSDKOptions = {
  base: 'https://api.tillhub.com'
}

export interface TillhubSDKOptions {
  credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined
  base?: string
  user?: string
}

type MaybeOptions = object

export declare interface TillhubClient {
  on(event: 'raw-error' | 'error', listener: (error: Error) => void): this
  on(event: string, listener: Function): this
}

export class TillhubClient extends events.EventEmitter {
  user?: string
  auth: Auth
  http?: Client

  public options: TillhubSDKOptions | undefined
  public static environment = environment
  public initialized = false

  constructor(options?: TillhubSDKOptions) {
    super()

    this.auth = new v1.Auth({ base: defaultOptions.base })

    if (!options) return

    if (this.handleOptions(options)) {
      this.initialized = true
    }
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

    if (options.base) {
      this.auth = new v1.Auth({ base: options.base })
    }

    this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
  }

  /**
   * De-Initialise the SDK instance and all its state
   *
   */
  public destroy(): void {
    Client.clearInstance()

    if (this.auth) {
      this.auth.clearInstance()
    }

    this.http = undefined
    this.options = undefined
    this.user = undefined
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

  private generateAuthenticatedInstance<T>(type: { new(options: object, http: Client): T }, maybeOptions?: MaybeOptions): T {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new type({
      user: this.auth.user,
      base: this.options.base,
      ...maybeOptions
    }, this.http)
  }

  /**
   * Create an authenticated taxes instance
   *
   */
  taxes(): v0.Taxes {
    return this.generateAuthenticatedInstance(v0.Taxes)
  }

  /**
   * Create an authenticated products instance
   *
   */
  products(): v1.Products {
    return this.generateAuthenticatedInstance(v1.Products)
  }

  /**
   * Create an authenticated product groups instance
   *
   */
  productGroups(): v0.ProductGroups {
    return this.generateAuthenticatedInstance(v0.ProductGroups)
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
    return this.generateAuthenticatedInstance(v0.Accounts)
  }

  /**
   * Create an authenticated expense accounts instance
   *
   */
  expenseAccounts(): v0.ExpenseAccounts {
    return this.generateAuthenticatedInstance(v0.ExpenseAccounts)
  }

  /**
   * Create an authenticated expense accounts instance
   *
   */
  paymentOptions(): v0.PaymentOptions {
    return this.generateAuthenticatedInstance(v0.PaymentOptions)
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
    return this.generateAuthenticatedInstance(v0.Configurations)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  users(configurationId: string): v0.Users {
    return this.generateAuthenticatedInstance(v0.Users, { configurationId })
  }

  /**
   * Create an authenticated branches instance
   *
   */
  branches(): v0.Branches {
    return this.generateAuthenticatedInstance(v0.Branches)
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
    return this.generateAuthenticatedInstance(v0.Vouchers)
  }

  /**
   * Create an authenticated vouchers logs instance
   *
   */
  voucherLogs(): v0.VoucherLogs {
    return this.generateAuthenticatedInstance(v0.VoucherLogs)
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
   * Create an authenticated TransactionsLegacy instance
   *
   */
  transactionsLegacy(): v1.TransactionsLegacy {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.TransactionsLegacy({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Transactions instance
   *
   */
  transactions(): v1.Transactions {
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

  /**
   * Create an authenticated Staff instance
   *
   */
  auditActions(): v0.AuditActions {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.AuditActions({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Registers instance
   *
   */
  registers(): v1.Registers {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.Registers({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Images instance
   *
   */
  images(): v0.Images {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Images({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Notifications instance
   *
   */
  notifications(): v0.Notifications {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Notifications({ user: this.auth.user, base: this.options.base }, this.http)
  }
}

export class Tillhub extends TillhubClient {
  private static instance: Tillhub
  constructor(options: TillhubSDKOptions) {
    super(options)

    // only emit errors, when we have listeners to prevent unhandled rejects etc.
    this.on('raw-error', (err: Error) => {
      if (this.listeners('error').length > 0) this.emit('error', err)
    })
  }

  static getInstance(options: TillhubSDKOptions): Tillhub {
    if (!Tillhub.instance) {
      Tillhub.instance = new Tillhub(options)
    }

    return Tillhub.instance
  }
}

export default Tillhub.getInstance({ base: defaultOptions.base })
