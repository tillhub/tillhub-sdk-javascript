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
  responseInterceptors?: Function[]
  requestInterceptors?: Function[]
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

    if (options.responseInterceptors) {
      clientOptions.responseInterceptors = options.responseInterceptors
    }

    if (options.requestInterceptors) {
      clientOptions.requestInterceptors = options.requestInterceptors
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
        headers: {},
        responseInterceptors: options.responseInterceptors
      }

      if ((options.credentials as TokenAuth).token && clientOptions.headers) {
        clientOptions.headers['Authorization'] = `Bearer ${
          (options.credentials as TokenAuth).token
          }`
      }

      this.auth = new v1.Auth(authOptions)
      this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
      return true
    }

    return false
  }

  private generateAuthenticatedInstance<T>(
    type: { new(options: object, http: Client): T },
    maybeOptions?: MaybeOptions
  ): T {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new type(
      {
        user: this.auth.user,
        base: this.options.base,
        ...maybeOptions
      },
      this.http
    )
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
   * Create an authenticated product templates instance
   *
   */
  productTemplates(): v0.ProductTemplates {
    return this.generateAuthenticatedInstance(v0.ProductTemplates)
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
   * Create an authenticated branch groups instance
   *
   */
  branchGroups(): v0.BranchGroups {
    return this.generateAuthenticatedInstance(v0.BranchGroups)
  }

  /**
   * Create an authenticated devices instance
   *
   */
  devices(): v0.Devices {
    return this.generateAuthenticatedInstance(v0.Devices)
  }

  /**
   * Create an authenticated contents instance
   *
   */
  contents(): v0.Contents {
    return this.generateAuthenticatedInstance(v0.Contents)
  }

  /**
   * Create an authenticated contents templates instance
   *
   */
  contentTemplates(): v0.ContentTemplates {
    return this.generateAuthenticatedInstance(v0.ContentTemplates)
  }

  /**
   * Create an authenticated discounts instance
   *
   */
  discounts(): v0.Discounts {
    return this.generateAuthenticatedInstance(v0.Discounts)
  }

  /**
   * Create an authenticated customers instance
   *
   */
  customers(): v0.Customers {
    return this.generateAuthenticatedInstance(v0.Customers)
  }

  /**
   * Create an authenticated vouchers instance
   *
   */
  vouchers(): v1.Vouchers {
    return this.generateAuthenticatedInstance(v1.Vouchers)
  }

  /**
   * Create an authenticated vouchers logs instance
   *
   */
  voucherLogs(): v0.VoucherLogs {
    return this.generateAuthenticatedInstance(v0.VoucherLogs)
  }

  /**
   * Create an authenticated vouchers systems instance
   *
   */
  voucherSystems(): v0.VoucherSystems {
    return this.generateAuthenticatedInstance(v0.VoucherSystems)
  }

  /**
   * Create an authenticated me instance
   */
  me(): v0.Me {
    return this.generateAuthenticatedInstance(v0.Me)
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
   * Create an authenticated StocksBook instance
   *
   */
  stocksBook(): v0.StocksBook {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.StocksBook({ user: this.auth.user, base: this.options.base }, this.http)
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
    return this.generateAuthenticatedInstance(v0.Staff)
  }

  /**
   * Create an authenticated AuditActions instance
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
   * Create an authenticated AuditLogs instance
   *
   */
  auditLogs(): v0.AuditLogs {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.AuditLogs({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Registers instance
   *
   */
  registers(): v1.Registers {
    return this.generateAuthenticatedInstance(v1.Registers)
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
   * Create an authenticated Videos instance
   *
   */
  videos(): v0.Videos {
    return this.generateAuthenticatedInstance(v0.Videos)
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

  /**
   * Create an authenticated Messages instance
   *
   */
  messages(): v0.Messages {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Messages({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Print instance
   *
   */
  print(): v0.Print {
    return this.generateAuthenticatedInstance(v0.Print)
  }

  /**
   * Create an authenticated Favourites instance
   *
   */
  favourites(): v0.Favourites {
    return this.generateAuthenticatedInstance(v0.Favourites)
  }

  /**
   * Create an authenticated Balances instance
   *
   */
  balances(): v1.Balances {
    return this.generateAuthenticatedInstance(v1.Balances)
  }

  /**
   * Create an authenticated LegacySettings instance
   *
   */
  settings_old(): v0.LegacySettings {
    return this.generateAuthenticatedInstance(v0.LegacySettings)
  }

  /**
   * Create an authenticated Tags instance
   *
   */
  tags(): v0.Tags {
    return this.generateAuthenticatedInstance(v0.Tags)
  }

  /**
   * Create an authenticated Tags instance
   *
   */
  safes(): v0.Safes {
    return this.generateAuthenticatedInstance(v0.Safes)
  }

  /**
   * Create an authenticated SafesLogBook instance
   *
   */
  safesLogBook(): v0.SafesLogBook {
    return this.generateAuthenticatedInstance(v0.SafesLogBook)
  }

  /**
   * Create an authenticated Warehouses instance
   *
   */
  warehouses(): v0.Warehouses {
    return this.generateAuthenticatedInstance(v0.Warehouses)
  }

  /**
   * Create an authenticated StaffGroups instance
   *
   */
  staffGroups(): v0.StaffGroups {
    return this.generateAuthenticatedInstance(v0.StaffGroups)
  }

  /**
   * Create an authenticated Exports instance
   *
   */
  exports(): v0.Exports {
    return this.generateAuthenticatedInstance(v0.Exports)
  }

  /**
   * Create an authenticated Promotions instance
   *
   */
  promotions(): v0.Promotions {
    return this.generateAuthenticatedInstance(v0.Promotions)
  }

  /**
   * Create an authenticated ProductServiceQuestionGroups instance
   *
   */
  productServiceQuestionGroups(): v0.ProductServiceQuestionGroups {
    return this.generateAuthenticatedInstance(v0.ProductServiceQuestionGroups)
  }

  /**
   * Create an authenticated ProductServiceQuestionGroups instance
   *
   */
  productServiceQuestions(): v0.ProductServiceQuestions {
    return this.generateAuthenticatedInstance(v0.ProductServiceQuestions)
  }

  /**
   * Create an authenticated Data instance
   *
   */
  data(): v0.Data {
    return this.generateAuthenticatedInstance(v0.Data)
  }

  /**
   * Create an authenticated Reasons instance
   *
   */
  reasons(): v0.Reasons {
    return this.generateAuthenticatedInstance(v0.Reasons)
  }

  /**
   * Create an authenticated Processes instance
   *
   */
  processes(): v0.Processes {
    return this.generateAuthenticatedInstance(v0.Processes)
  }

  /**
   * Create an authenticated Functions instance
   *
   */
  functions(): v0.Functions {
    return this.generateAuthenticatedInstance(v0.Functions)
  }

  /**
   * Create an authenticated Device Groups instance
   *
   */
  deviceGroups(): v0.DeviceGroups {
    return this.generateAuthenticatedInstance(v0.DeviceGroups)
  }

  /**
   * Create an authenticated Carts instance
   *
   */
  carts(): v1.Carts {
    return this.generateAuthenticatedInstance(v1.Carts)
  }

  /**
   * Create an authenticated StaffPermissionsTemplates instance
   *
   */
  staffPermissionsTemplates(): v0.StaffPermissionsTemplates {
    return this.generateAuthenticatedInstance(v0.StaffPermissionsTemplates)
  }

  /**
   * Create an authenticated Correspondences instance
   *
   */
  correspondences(): v0.Correspondences {
    return this.generateAuthenticatedInstance(v0.Correspondences)
  }

  /**
   * Create an authenticated Storefronts instance
   *
   */
  storefronts(): v0.Storefronts {
    return this.generateAuthenticatedInstance(v0.Storefronts)
  }

  /**
   * Create an authenticated CategoryTrees instance
   *
   */
  categoryTrees(): v0.CategoryTrees {
    return this.generateAuthenticatedInstance(v0.CategoryTrees)
  }

  /**
   * Create an authenticated Categories instance
   *
   */
  categories(): v0.Categories {
    return this.generateAuthenticatedInstance(v0.Categories)
  }

  /**
   * Create an authenticated Dependencies instance
   *
   */
  dependencies(): v0.Dependencies {
    return this.generateAuthenticatedInstance(v0.Dependencies)
  }

  /**
   * Create an authenticated Trash instance
   *
   */
  trash(): v0.Trash {
    return this.generateAuthenticatedInstance(v0.Trash)
  }

  /**
   * Create an authenticated TimetrackingReport instance
   *
   */
  timetracking(): v0.Timetracking {
    return this.generateAuthenticatedInstance(v0.Timetracking)
  }

  /**
   * Create an authenticated CashingOuts instance
   *
   */
  cashingOuts(): v0.CashingOuts {
    return this.generateAuthenticatedInstance(v0.CashingOuts)
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
