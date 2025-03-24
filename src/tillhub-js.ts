// Import here Polyfills if needed. Recommended core-js (npm i -D core-js)
// import 'core-js/fn/array.find'
// import * as EventEmitter from 'events'
import events from 'events'
// import { AxiosError } from 'axios'
import { AuthOptions, UsernameAuth, KeyAuth, TokenAuth } from './v0/auth'
import { Auth } from './v1/auth'
import * as v0 from './v0'
import * as v1 from './v1'
import * as v2 from './v2'
import * as v3 from './v3'
import * as v4 from './v4'
import { AnalyticsHandlersV1Types } from './v1'
import { AnalyticsHandlerTypes } from './v2'
import { AnalyticsHandlerTypesV3 } from './v3'
import { Client, ClientOptions, Timeout } from './client'
import * as errors from './errors'
import { environment } from './environment'

export { v0, v1, v2, v3, v4 }

export const defaultOptions: TillhubSDKOptions = {
  base: 'https://api.tillhub.com'
}

type Fn = () => any

export interface TillhubSDKOptions {
  credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined
  base?: string
  user?: string
  whitelabel?: string
  responseInterceptors?: Fn[]
  requestInterceptors?: Fn[]
}

interface AxiosOptions {
  timeout?: Timeout
}

type MaybeOptions = Record<string, unknown>

export declare interface TillhubClient {
  on: ((event: 'raw-error' | 'error', listener: (error: Error) => void) => this) &
  ((event: string, listener: Fn) => this)
}

export class TillhubClient extends events.EventEmitter {
  user?: string
  auth: Auth
  http?: Client

  public options: TillhubSDKOptions | undefined
  public static environment = environment
  public initialized = false

  constructor (options?: TillhubSDKOptions) {
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
  public init (options: TillhubSDKOptions = defaultOptions): void {
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
  public destroy (): void {
    Client.clearInstance()

    if (this.auth) {
      this.auth.clearInstance()
    }

    this.http = undefined
    this.options = undefined
    this.user = undefined
  }

  private handleOptions (options: TillhubSDKOptions): boolean {
    this.options = options
    this.options.base = this.options.base ?? 'https://api.tillhub.com'
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
        clientOptions.headers.Authorization = `Bearer ${(options.credentials as TokenAuth).token}`
      }

      if (options.whitelabel && clientOptions.headers) {
        clientOptions.headers['x-whitelabel'] = options.whitelabel
      }

      this.auth = new v1.Auth(authOptions)
      this.http = Client.getInstance(clientOptions).setDefaults(clientOptions)
      return true
    }

    return false
  }

  private generateAuthenticatedInstance<T>(
    Type: new (options: Record<string, unknown>, http: Client) => T,
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

    return new Type(
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
  taxes (): v0.Taxes {
    return this.generateAuthenticatedInstance(v0.Taxes)
  }

  /**
   * Create an authenticated products instance
   *
   */
  products (): v1.Products {
    return this.generateAuthenticatedInstance(v1.Products)
  }

  /**
   * Create an authenticated products instance
   *
   */
  productsV2 (): v2.Products {
    return this.generateAuthenticatedInstance(v2.Products)
  }

  /**
   * Create an authenticated products instance
   *
   */
  productsV4 (): v4.Products {
    return this.generateAuthenticatedInstance(v4.Products)
  }

  /**
   * Create an authenticated product groups instance
   *
   */
  productGroups (): v0.ProductGroups {
    return this.generateAuthenticatedInstance(v0.ProductGroups)
  }

  /**
   * Create an authenticated product templates instance
   *
   */
  productTemplates (): v0.ProductTemplates {
    return this.generateAuthenticatedInstance(v0.ProductTemplates)
  }

  /**
   * Create an authenticated product template defaults instance
   *
   */
  productTemplateDefaults (): v0.ProductTemplateDefaults {
    return this.generateAuthenticatedInstance(v0.ProductTemplateDefaults)
  }

  /**
   * Create an authenticated product addon groups instance
   *
   */
  productAddonGroups (): v0.ProductAddonGroups {
    return this.generateAuthenticatedInstance(v0.ProductAddonGroups)
  }

  /**
   * Create an authenticated product addons instance
   *
   */
  productAddons (): v0.ProductAddons {
    return this.generateAuthenticatedInstance(v0.ProductAddons)
  }

  /**
   * Create an authenticated product addons instance
   *
   */
  productBranchCustomizations (): v0.ProductBranchCustomizations {
    return this.generateAuthenticatedInstance(v0.ProductBranchCustomizations)
  }

  /**
   * Create an authenticated deliveries instance
   *
   */
  deliveries (): v0.Deliveries {
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
  accounts (): v0.Accounts {
    return this.generateAuthenticatedInstance(v0.Accounts)
  }

  /**
   * Create an authenticated expense accounts instance
   *
   */
  expenseAccounts (): v0.ExpenseAccounts {
    return this.generateAuthenticatedInstance(v0.ExpenseAccounts)
  }

  /**
   * Create an authenticated expense accounts instance
   *
   */
  paymentOptions (): v0.PaymentOptions {
    return this.generateAuthenticatedInstance(v0.PaymentOptions)
  }

  /**
   * Create an authenticated templates instance
   *
   */
  templates (): v1.Templates {
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
  configurations (): v0.Configurations {
    return this.generateAuthenticatedInstance(v0.Configurations)
  }

  /**
 * Create an authenticated configurations instance V1
 *
 */
  configurationsV1 (): v1.Configurations {
    return this.generateAuthenticatedInstance(v1.Configurations)
  }

  /**
   * Create an authenticated inventory configurations instance
   *
   */
  inventoryConfiguration (): v0.InventoryConfiguration {
    return this.generateAuthenticatedInstance(v0.InventoryConfiguration)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  users (configurationId: string): v0.Users {
    return this.generateAuthenticatedInstance(v0.Users, { configurationId })
  }

  /**
     * Create an authenticated configurations instance
     *
     */
  iamUsers (): v0.IamUsers {
    return this.generateAuthenticatedInstance(v0.IamUsers)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  iamUserGroups (): v0.IamUserGroups {
    return this.generateAuthenticatedInstance(v0.IamUserGroups)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  iamRoles (): v0.IamRoles {
    return this.generateAuthenticatedInstance(v0.IamRoles)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  iamPermissions (): v0.IamPermissions {
    return this.generateAuthenticatedInstance(v0.IamPermissions)
  }

  /**
   * Create an authenticated configurations instance
   *
   */
  iamMeClass (): v0.IamMeClass {
    return this.generateAuthenticatedInstance(v0.IamMeClass)
  }

  /**
   * Create an authenticated branches instance
   *
   */
  branches (): v0.Branches {
    return this.generateAuthenticatedInstance(v0.Branches)
  }

  /**
   * Branches v1
   *
   */
  branchesV1 (): v1.Branches {
    return this.generateAuthenticatedInstance(v1.Branches)
  }

  /**
   * Create an authenticated branch groups instance
   *
   */
  branchGroups (): v0.BranchGroups {
    return this.generateAuthenticatedInstance(v0.BranchGroups)
  }

  /**
   * Create an authenticated devices instance
   *
   */
  devices (): v0.Devices {
    return this.generateAuthenticatedInstance(v0.Devices)
  }

  /**
   * Create an authenticated contents instance
   *
   */
  contents (): v0.Contents {
    return this.generateAuthenticatedInstance(v0.Contents)
  }

  /**
   * Create an authenticated contents templates instance
   *
   */
  contentTemplates (): v0.ContentTemplates {
    return this.generateAuthenticatedInstance(v0.ContentTemplates)
  }

  /**
   * Create an authenticated discounts instance
   *
   */
  discounts (): v0.Discounts {
    return this.generateAuthenticatedInstance(v0.Discounts)
  }

  /**
   * Create an authenticated customers instance
   *
   */
  customers (): v0.Customers {
    return this.generateAuthenticatedInstance(v0.Customers)
  }

  /**
   * Create an authenticated customers v1 instance
   *
   */
  customersV1 (): v1.Customers {
    return this.generateAuthenticatedInstance(v1.Customers)
  }

  /**
     * Create an authenticated business unit instance
     *
     */
  businessUnits (): v0.BusinessUnits {
    return this.generateAuthenticatedInstance(v0.BusinessUnits)
  }

  /**
    * Create an authenticated UODInvoices instance v0
    *
    */
  uodInvoices (): v0.UodInvoices {
    return this.generateAuthenticatedInstance(v0.UodInvoices)
  }

  /**
  * Create an authenticated UODInvoicesDownload instance v0
  *
  */
  uodInvoicesDownload (): v0.UodInvoices {
    return this.generateAuthenticatedInstance(v0.UodInvoices)
  }

  /**
   * Create an authenticated suppliers instance
   *
   */
  suppliers (): v0.Suppliers {
    return this.generateAuthenticatedInstance(v0.Suppliers)
  }

  /**
   * Create an authenticated links between suppliers and products
   *
   */
  suppliersProductsRelation (): v0.SuppliersProductsRelation {
    return this.generateAuthenticatedInstance(v0.SuppliersProductsRelation)
  }

  /**
   * Create an authenticated vouchers instance
   *
   */
  vouchers (): v1.Vouchers {
    return this.generateAuthenticatedInstance(v1.Vouchers)
  }

  /**
   * Create an authenticated vouchers logs instance
   *
   */
  voucherLogs (): v0.VoucherLogs {
    return this.generateAuthenticatedInstance(v0.VoucherLogs)
  }

  /**
   * Create an authenticated vouchers systems instance
   *
   */
  voucherSystems (): v0.VoucherSystems {
    return this.generateAuthenticatedInstance(v0.VoucherSystems)
  }

  /**
   * Create an authenticated abocard systems instance
   *
   */
  abocardSystems (): v0.AbocardSystems {
    return this.generateAuthenticatedInstance(v0.AbocardSystems)
  }

  /**
   * Create an authenticated me instance
   */
  me (): v0.Me {
    return this.generateAuthenticatedInstance(v0.Me)
  }

  /**
   * Create an authenticated invoices instance
   *
   */
  invoices (): v0.Invoices {
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
  stocks (): v0.Stocks {
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
   * Create an authenticated Stocks Book V1 instance
   *
   */
  stocksBookV1 (): v1.StocksBook {
    return this.generateAuthenticatedInstance(v1.StocksBook)
  }

  /**
   * Create an authenticated StocksBook instance
   *
   */
  stocksBook (): v0.StocksBook {
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
  orders (): v0.Orders {
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
  analytics (axiosOptions?: AxiosOptions): v0.Analytics {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v0.Analytics(
      { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
      this.http
    )
  }

  /**
   * Create an authenticated Analytics instance
   *
   */
  analyticsHandlersV1 (axiosOptions?: AxiosOptions): AnalyticsHandlersV1Types {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return {
      analytics: {
        reports: {
          AnalyticsReportsInventory: v1.analytics.reports.AnalyticsReportsInventory.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsCustomers: new v1.analytics.reports.AnalyticsReportsCustomers(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsPayments: new v1.analytics.reports.AnalyticsReportsPayments(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsVouchers: new v1.analytics.reports.AnalyticsReportsVouchers(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsDiscounts: new v1.analytics.reports.AnalyticsReportsDiscounts(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsVat: new v1.analytics.reports.AnalyticsReportsVat(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsProductGroups: new v1.analytics.reports.AnalyticsReportsProductGroups(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsPaymentOptions: new v1.analytics.reports.AnalyticsReportsPaymentOptions(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsStockTakings: new v1.analytics.reports.AnalyticsReportsStockTakings(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsProcesses: new v1.analytics.reports.AnalyticsReportsProcesses(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          )
        }
      }
    }
  }

  /**
   * Create an authenticated Analytics instance
   *
   */
  analyticsHandlers (axiosOptions?: AxiosOptions): AnalyticsHandlerTypes {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return {
      analytics: {
        reports: {
          AnalyticsReportsRevenuesGrouped: v2.analytics.reports.AnalyticsReportsRevenuesGrouped.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsTransactionsOverview: v2.analytics.reports.AnalyticsReportsTransactionsOverview.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsTransactionsDetail: v2.analytics.reports.AnalyticsReportsTransactionsDetail.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsTransactionsItems: v2.analytics.reports.AnalyticsReportsTransactionsItems.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsBalancesOverview: v2.analytics.reports.AnalyticsReportsBalancesOverview.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsBalancesDetail: v2.analytics.reports.AnalyticsReportsBalancesDetail.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsCountingProtocols: v2.analytics.reports.AnalyticsReportsCountingProtocols.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsDatev: v2.analytics.reports.AnalyticsReportsDatev.create(
            { user: this.auth.user, base: this.options.base },
            this.http
          ),
          AnalyticsReportsProducts: new v2.analytics.reports.AnalyticsReportsProducts(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsStocks: v2.analytics.reports.AnalyticsReportsStocks.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          )
        }
      }
    }
  }

  /**
   * Create an authenticated Transactions V3 instance
   *
   */
  transactionsV3 (): v3.Transactions {
    return this.generateAuthenticatedInstance(v3.Transactions)
  }

  /**
   * Create an authenticated Payment Methods V3 instance
   *
   */
  paymentMethodsV3 (): v3.PaymentMethods {
    return this.generateAuthenticatedInstance(v3.PaymentMethods)
  }

  /**
   * Create an authenticated Analytics v3 instance
   *
   */
  analyticsHandlersV3 (axiosOptions?: AxiosOptions): AnalyticsHandlerTypesV3 {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return {
      analytics: {
        reports: {
          AnalyticsReportsDatev: v3.analytics.reports.AnalyticsReportsDatev.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsTransactions: v3.analytics.reports.AnalyticsReportsTransactions.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsBalances: v3.analytics.reports.AnalyticsReportsBalances.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsCountingProtocols: v3.analytics.reports.AnalyticsReportsCountingProtocols.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          ),
          AnalyticsReportsRevenues: v3.analytics.reports.AnalyticsReportsRevenues.create(
            { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
            this.http
          )
        }
      }
    }
  }

  /**
   * Create an authenticated TransactionsLegacy instance
   *
   */
  transactionsLegacy (): v1.TransactionsLegacy {
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
  transactions (axiosOptions?: AxiosOptions): v1.Transactions {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.Transactions(
      { user: this.auth.user, base: this.options.base, timeout: axiosOptions?.timeout },
      this.http
    )
  }

  /**
   * Create an authenticated Transactions V2 instance
   *
   */
  transactionsV2 (): v2.Transactions {
    return this.generateAuthenticatedInstance(v2.Transactions)
  }

  /**
   * Create an authenticated Orders V2 instance
   *
   */
  ordersV2 (): v2.Orders {
    return this.generateAuthenticatedInstance(v2.Orders)
  }

  /**
   * Create an authenticated Exports V1 instance
   *
   */
  exportsV1 (): v1.ExportsV1 {
    return this.generateAuthenticatedInstance(v1.ExportsV1)
  }

  /**
   * Create an authenticated Staff instance
   *
   */
  staff (): v0.Staff {
    return this.generateAuthenticatedInstance(v0.Staff)
  }

  /**
   * Create an authenticated AuditActions instance
   *
   */
  auditActions (): v0.AuditActions {
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
  auditLogs (): v0.AuditLogs {
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
   * Create an authenticated AuditLogsV1 instance
   *
   */
  auditLogsV1 (): v1.AuditLogs {
    if (
      !this.options ||
      !this.options.base ||
      !this.http ||
      !this.auth ||
      !this.auth.authenticated
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.AuditLogs({ user: this.auth.user, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Registers instance
   *
   */
  registers (): v1.Registers {
    return this.generateAuthenticatedInstance(v1.Registers)
  }

  /**
   * Create an authenticated Images instance
   *
   */
  images (): v0.Images {
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
  videos (): v0.Videos {
    return this.generateAuthenticatedInstance(v0.Videos)
  }

  /**
   * Create an authenticated Notifications instance
   *
   */
  notifications (): v0.Notifications {
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
   * Notifications Minimum Stock Unit
   *
   */
  notificationsMsu (): v1.NotificationsMsu {
    return this.generateAuthenticatedInstance(v1.NotificationsMsu)
  }

  /**
   * Notifications Unsubscribe
   *
   */
  notificationsUnsubscribe (): v1.NotificationsUnsubscribe {
    if (
      !this.options ||
      !this.options.base ||
      !this.http
    ) {
      throw new errors.UninstantiatedClient()
    }

    return new v1.NotificationsUnsubscribe({ user: undefined, base: this.options.base }, this.http)
  }

  /**
   * Create an authenticated Messages instance
   *
   */
  messages (): v0.Messages {
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
  print (): v0.Print {
    return this.generateAuthenticatedInstance(v0.Print)
  }

  /**
   * Create an authenticated Favourites instance
   *
   */
  favourites (): v0.Favourites {
    return this.generateAuthenticatedInstance(v0.Favourites)
  }

  /**
   * Create an authenticated Fiscalization instance
   *
   */
  fiscalization (): v0.Fiscalization {
    return this.generateAuthenticatedInstance(v0.Fiscalization)
  }

  /**
   * Create an authenticated Balances instance
   *
   */
  balances (): v1.Balances {
    return this.generateAuthenticatedInstance(v1.Balances)
  }

  /**
   * Create an authenticated LegacySettings instance
   *
   */
  settings_old (): v0.LegacySettings {
    return this.generateAuthenticatedInstance(v0.LegacySettings)
  }

  /**
   * Create an authenticated Tags instance
   *
   */
  tags (): v0.Tags {
    return this.generateAuthenticatedInstance(v0.Tags)
  }

  /**
   * Create an authenticated Tags instance
   *
   */
  tagsV1 (): v1.Tags {
    return this.generateAuthenticatedInstance(v1.Tags)
  }

  /**
   * Create an authenticated Tags instance
   *
   */
  safes (): v0.Safes {
    return this.generateAuthenticatedInstance(v0.Safes)
  }

  /**
   * Create an authenticated SafesLogBook instance
   *
   */
  safesLogBook (): v0.SafesLogBook {
    return this.generateAuthenticatedInstance(v0.SafesLogBook)
  }

  /**
   * Create an authenticated SafesLogBookV1 instance
   *
   */
  safesLogBookV1 (): v1.SafesLogBook {
    return this.generateAuthenticatedInstance(v1.SafesLogBook)
  }

  /**
   * Create an authenticated Warehouses instance
   *
   */
  warehouses (): v0.Warehouses {
    return this.generateAuthenticatedInstance(v0.Warehouses)
  }

  /**
   * Create an authenticated Webhooks instance
   *
   */
  webhooks (): v0.Webhooks {
    return this.generateAuthenticatedInstance(v0.Webhooks)
  }

  /**
   * Create an authenticated WebhookEvents instance
   *
   */
  webhookEvents (): v0.WebhookEvents {
    return this.generateAuthenticatedInstance(v0.WebhookEvents)
  }

  /**
   * Create an authenticated SupportedEvents instance
   *
   */
  supportedEvents (): v0.SupportedEvents {
    return this.generateAuthenticatedInstance(v0.SupportedEvents)
  }

  /**
   * Create an authenticated StaffGroups instance
   *
   */
  staffGroups (): v0.StaffGroups {
    return this.generateAuthenticatedInstance(v0.StaffGroups)
  }

  /**
   * Create an authenticated ServiceCategory instance
   *
   */
  serviceCategory (): v0.ServiceCategory {
    return this.generateAuthenticatedInstance(v0.ServiceCategory)
  }

  /**
   * Create an authenticated Services instance
   *
   */
  services (): v0.Services {
    return this.generateAuthenticatedInstance(v0.Services)
  }

  /**
   * Create an authenticated Exports instance
   *
   */
  exports (): v0.Exports {
    return this.generateAuthenticatedInstance(v0.Exports)
  }

  /**
   * Create an authenticated Promotions instance
   *
   */
  promotions (): v0.Promotions {
    return this.generateAuthenticatedInstance(v0.Promotions)
  }

  /**
   * Create an authenticated Promotions V1 instance
   *
   */
  promotionsV1 (): v1.Promotions {
    return this.generateAuthenticatedInstance(v1.Promotions)
  }

  /**
   * Create an authenticated ProductServiceQuestionGroups instance
   *
   */
  productServiceQuestionGroups (): v0.ProductServiceQuestionGroups {
    return this.generateAuthenticatedInstance(v0.ProductServiceQuestionGroups)
  }

  /**
   * Create an authenticated ProductServiceQuestionGroups instance
   *
   */
  productServiceQuestions (): v0.ProductServiceQuestions {
    return this.generateAuthenticatedInstance(v0.ProductServiceQuestions)
  }

  /**
   * Create an authenticated Data instance
   *
   */
  data (): v0.Data {
    return this.generateAuthenticatedInstance(v0.Data)
  }

  /**
   * Create an authenticated Reasons instance
   *
   */
  reasons (): v0.Reasons {
    return this.generateAuthenticatedInstance(v0.Reasons)
  }

  /**
   * Create an authenticated Processes instance
   *
   */
  processes (): v0.Processes {
    return this.generateAuthenticatedInstance(v0.Processes)
  }

  /**
   * Create an authenticated Functions instance
   *
   */
  functions (): v0.Functions {
    return this.generateAuthenticatedInstance(v0.Functions)
  }

  /**
   * Create an authenticated Device Groups instance
   *
   */
  deviceGroups (): v0.DeviceGroups {
    return this.generateAuthenticatedInstance(v0.DeviceGroups)
  }

  /**
   * Create an authenticated Carts instance
   *
   */
  carts (): v1.Carts {
    return this.generateAuthenticatedInstance(v1.Carts)
  }

  /**
   * Create an authenticated StaffPermissionsTemplates instance
   *
   */
  staffPermissionsTemplates (): v0.StaffPermissionsTemplates {
    return this.generateAuthenticatedInstance(v0.StaffPermissionsTemplates)
  }

  /**
   * Create an authenticated Correspondences instance
   *
   */
  correspondences (): v0.Correspondences {
    return this.generateAuthenticatedInstance(v0.Correspondences)
  }

  /**
   * Create an authenticated Storefronts instance
   *
   */
  storefronts (): v0.Storefronts {
    return this.generateAuthenticatedInstance(v0.Storefronts)
  }

  /**
   * Create an authenticated CategoryTrees instance
   *
   */
  categoryTrees (): v0.CategoryTrees {
    return this.generateAuthenticatedInstance(v0.CategoryTrees)
  }

  /**
   * Create an authenticated Categories instance
   *
   */
  categories (): v0.Categories {
    return this.generateAuthenticatedInstance(v0.Categories)
  }

  /**
   * Create an authenticated Dependencies instance
   *
   */
  dependencies (): v0.Dependencies {
    return this.generateAuthenticatedInstance(v0.Dependencies)
  }

  /**
   * Create an authenticated Trash instance
   *
   */
  trash (): v0.Trash {
    return this.generateAuthenticatedInstance(v0.Trash)
  }

  /**
   * Create an authenticated TimetrackingReport instance
   *
   */
  timetracking (): v0.Timetracking {
    return this.generateAuthenticatedInstance(v0.Timetracking)
  }

  /**
   * Create an authenticated CountingProtocols instance
   *
   */
  countingProtocols (): v0.CountingProtocols {
    return this.generateAuthenticatedInstance(v0.CountingProtocols)
  }

  /**
   * Create an authenticated StockTakings instance
   *
   */
  stockTakings (): v0.StockTakings {
    return this.generateAuthenticatedInstance(v0.StockTakings)
  }

  /**
   * Create an authenticated UserPermissionsTemplates instance
   *
   */
  userPermissionsTemplates (): v0.UserPermissionsTemplates {
    return this.generateAuthenticatedInstance(v0.UserPermissionsTemplates)
  }

  /**
   * Create an authenticated DbBackups instance
   *
   */
  dbBackups (): v0.DbBackups {
    return this.generateAuthenticatedInstance(v0.DbBackups)
  }

  /**
   * Create an authenticated WebhookEvents instance
   *
   */
  purchaseOrders (): v0.PurchaseOrders {
    return this.generateAuthenticatedInstance(v0.PurchaseOrders)
  }

  /**
   * Create an authenticated ConsignmentNotes instance
   *
   */
  consignmentNotes (): v0.ConsignmentNotes {
    return this.generateAuthenticatedInstance(v0.ConsignmentNotes)
  }

  /**
   * Create an authenticated Documents instance
   *
   */
  documents (): v0.Documents {
    return this.generateAuthenticatedInstance(v0.Documents)
  }

  /**
   * Create an authenticated Holidays instance
   *
   */
  holidays (): v0.Holidays {
    return this.generateAuthenticatedInstance(v0.Holidays)
  }

  /**
   * Create an authenticated Shift plan instance
   *
   */
  shiftPlan (): v0.ShiftPlan {
    return this.generateAuthenticatedInstance(v0.ShiftPlan)
  }

  /**
   * Create an authenticated AnalyticsV4 instance
   *
   */
  analyticsV4 (): v4.Analytics {
    return this.generateAuthenticatedInstance(v4.Analytics)
  }

  /**
   * Create an authenticated ScheduledExports instance
   *
   */
  scheduledExports (): v0.ScheduledExports {
    return this.generateAuthenticatedInstance(v0.ScheduledExports)
  }

  /**
   * Create an authenticated Customer appointments instance
   *
   */
  customerAppointments (): v0.CustomerAppointments {
    return this.generateAuthenticatedInstance(v0.CustomerAppointments)
  }

  /**
   * Create an authenticated DocumentExports instance
   *
   */
  documentExports (): v0.DocumentExports {
    return this.generateAuthenticatedInstance(v0.DocumentExports)
  }

  /**
   * Create an authenticated AppointmentReminder instance
   *
   */
  appointmentReminders (): v1.AppointmentReminders {
    return this.generateAuthenticatedInstance(v1.AppointmentReminders)
  }

  /**
   * TableLayouts v1
   *
   */
  tableLayouts (): v1.TableLayouts {
    return this.generateAuthenticatedInstance(v1.TableLayouts)
  }

  /**
   * Devices v1
   *
   */
  devicesV1 (): v1.Devices {
    return this.generateAuthenticatedInstance(v1.Devices)
  }

  /**
   * Contents v1
   *
   */
  contentsV1 (): v1.Contents {
    return this.generateAuthenticatedInstance(v1.Contents)
  }

  /*
   * ContentTemplates v1
   *
   */
  contentTemplatesV1 (): v1.ContentTemplates {
    return this.generateAuthenticatedInstance(v1.ContentTemplates)
  }

  /*
   * Import v1
   *
   */
  import (): v1.Import {
    return this.generateAuthenticatedInstance(v1.Import)
  }
}

export class Tillhub extends TillhubClient {
  private static instance: Tillhub
  constructor (options: TillhubSDKOptions) {
    super(options)

    // only emit errors, when we have listeners to prevent unhandled rejects etc.
    this.on('raw-error', (err: Error) => {
      if (this.listeners('error').length > 0) this.emit('error', err)
    })
  }

  static getInstance (options: TillhubSDKOptions): Tillhub {
    if (!Tillhub.instance) {
      Tillhub.instance = new Tillhub(options)
    }

    return Tillhub.instance
  }
}

export default Tillhub.getInstance({ base: defaultOptions.base })
