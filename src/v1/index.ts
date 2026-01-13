import { Auth } from './auth'
import { Pricebooks } from './pricebooks'
import { Products } from './products'
import { Templates } from './templates'
import { Transactions, TransactionsLegacy } from './transactions'
import { Registers } from './registers'
import { Balances } from './balances'
import { Vouchers } from './vouchers'
import { Customers } from './customers'
import { Carts } from './carts'
import { SafesLogBook } from './safes'
import { ExportsV1 } from './exports'
import { StocksBook } from './stocks'
import { Branches } from './branches'
import { Tags } from './tags'
import analytics from './analytics'
import { AuditLogs } from './audit_logs'
import { Configurations } from './configurations'
import { NotificationsMsu } from './notifications-msu'
import { NotificationsUnsubscribe } from './notifications-unsubscribe'
import { Promotions } from './promotions'
import { AppointmentReminders } from './appointment_reminders'
import { AppointmentReminderTemplates } from './appointment-reminder-templates'
import { TableLayouts } from './table-layouts'
import { Devices } from './devices'
import { Contents } from './contents'
import { ContentTemplates } from './content-templates'
import { Import } from './import'
import { SuppliersProductsRelation } from './suppliers_products_relation'

export {
  Auth,
  Pricebooks,
  Products,
  Templates,
  Transactions,
  TransactionsLegacy,
  Registers,
  Balances,
  Vouchers,
  Customers,
  Carts,
  Tags,
  SafesLogBook,
  ExportsV1,
  StocksBook,
  analytics,
  AuditLogs,
  Branches,
  Configurations,
  NotificationsMsu,
  NotificationsUnsubscribe,
  Promotions,
  AppointmentReminders,
  AppointmentReminderTemplates,
  TableLayouts,
  Devices,
  Contents,
  ContentTemplates,
  Import,
  SuppliersProductsRelation
}

export interface AnalyticsHandlersV1Types {
  analytics: {
    reports: {
      AnalyticsReportsInventory: any
      AnalyticsReportsCustomers: any
      AnalyticsReportsPayments: any
      AnalyticsReportsVouchers: any
      AnalyticsReportsDiscounts: any
      AnalyticsReportsVat: any
      AnalyticsReportsProductGroups: any
      AnalyticsReportsPaymentOptions: any
      AnalyticsReportsStockTakings: any
      AnalyticsReportsProcesses: any
    }
  }
}
