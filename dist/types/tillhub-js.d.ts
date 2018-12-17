import { UsernameAuth, KeyAuth, TokenAuth } from './v0/auth';
import { Auth } from './v1/auth';
import * as v0 from './v0';
import * as v1 from './v1';
import { Client } from './client';
export { v0, v1 };
export declare const defaultOptions: TillhubSDKOptions;
export interface TillhubSDKOptions {
    credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined;
    base?: string;
    user?: string;
}
export declare class TillhubClient {
    user?: string;
    auth?: Auth;
    http?: Client;
    options: TillhubSDKOptions | undefined;
    constructor(options?: TillhubSDKOptions);
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    init(options?: TillhubSDKOptions): void;
    private handleOptions;
    /**
     * Create an authenticated taxes instance
     *
     */
    taxes(): v0.Taxes;
    /**
     * Create an authenticated products instance
     *
     */
    products(): v1.Products;
    /**
     * Create an authenticated product groups instance
     *
     */
    productGroups(): v0.ProductGroups;
    /**
     * Create an authenticated deliveries instance
     *
     */
    deliveries(): v0.Deliveries;
    /**
     * Create an authenticated accounts instance
     *
     */
    accounts(): v0.Accounts;
    /**
     * Create an authenticated templates instance
     *
     */
    templates(): v1.Templates;
    /**
     * Create an authenticated configurations instance
     *
     */
    configurations(): v0.Configurations;
    /**
     * Create an authenticated branches instance
     *
     */
    branches(): v0.Branches;
    /**
     * Create an authenticated customers instance
     *
     */
    customers(): v0.Customers;
    /**
     * Create an authenticated vouchers instance
     *
     */
    vouchers(): v0.Vouchers;
    /**
     * Create an authenticated vouchers logs instance
     *
     */
    voucherLogs(): v0.VoucherLogs;
    /**
     * Create an authenticated invoices instance
     *
     */
    invoices(): v0.Invoices;
    /**
     * Create an authenticated Stocks instance
     *
     */
    stocks(): v0.Stocks;
    /**
     * Create an authenticated Orders instance
     *
     */
    orders(): v0.Orders;
    /**
     * Create an authenticated Analytics instance
     *
     */
    analytics(): v0.Analytics;
    /**
     * Create an authenticated Transactions instance
     *
     */
    transactions(): v1.Transactions;
    /**
     * Create an authenticated Staff instance
     *
     */
    staff(): v0.Staff;
    /**
     * Create an authenticated Staff instance
     *
     */
    audits(): v0.Audits;
    /**
     * Create an authenticated Registers instance
     *
     */
    registers(): v1.Registers;
}
export declare class Tillhub extends TillhubClient {
    private static instance;
    constructor(options: TillhubSDKOptions);
    static getInstance(options: TillhubSDKOptions): Tillhub;
}
declare const _default: Tillhub;
export default _default;
