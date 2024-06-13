import { Auth } from './auth';
import { Pricebooks } from './pricebooks';
import { Products } from './products';
import { Templates } from './templates';
import { Transactions, TransactionsLegacy } from './transactions';
import { Registers } from './registers';
import { Balances } from './balances';
import { Vouchers } from './vouchers';
import { Customers } from './customers';
import { Carts } from './carts';
import { SafesLogBook } from './safes';
import { ExportsV1 } from './exports';
import { StocksBook } from './stocks';
import { Branches } from './branches';
import { Tags } from './tags';
import analytics from './analytics';
import { AuditLogs } from './audit_logs';
import { Configurations } from './configurations';
import { Notifications } from './notifications';
import { Promotions } from './promotions';
export { Auth, Pricebooks, Products, Templates, Transactions, TransactionsLegacy, Registers, Balances, Vouchers, Customers, Carts, Tags, SafesLogBook, ExportsV1, StocksBook, analytics, AuditLogs, Branches, Configurations, Notifications, Promotions };
export interface AnalyticsHandlersV1Types {
    analytics: {
        reports: {
            AnalyticsReportsCustomers: any;
            AnalyticsReportsPayments: any;
            AnalyticsReportsVouchers: any;
            AnalyticsReportsDiscounts: any;
            AnalyticsReportsVat: any;
            AnalyticsReportsProductGroups: any;
            AnalyticsReportsPaymentOptions: any;
            AnalyticsReportsStockTakings: any;
            AnalyticsReportsProcesses: any;
        };
    };
}
