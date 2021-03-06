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
import analytics from './analytics';
export { Auth, Pricebooks, Products, Templates, Transactions, TransactionsLegacy, Registers, Balances, Vouchers, Customers, Carts, SafesLogBook, ExportsV1, analytics };
export interface AnalyticsHandlersV1Types {
    analytics: {
        reports: {
            AnalyticsReportsCustomers: any;
            AnalyticsReportsPayments: any;
        };
    };
}
