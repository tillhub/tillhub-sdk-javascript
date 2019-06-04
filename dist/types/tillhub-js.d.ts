/// <reference types="node" />
import events from 'events';
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
    responseInterceptors?: Function[];
}
export declare interface TillhubClient {
    on(event: 'raw-error' | 'error', listener: (error: Error) => void): this;
    on(event: string, listener: Function): this;
}
export declare class TillhubClient extends events.EventEmitter {
    user?: string;
    auth: Auth;
    http?: Client;
    options: TillhubSDKOptions | undefined;
    static environment: {
        VERSION: any;
    };
    initialized: boolean;
    constructor(options?: TillhubSDKOptions);
    /**
     * Initialise the SDK instance by authenticating the client
     *
     */
    init(options?: TillhubSDKOptions): void;
    /**
     * De-Initialise the SDK instance and all its state
     *
     */
    destroy(): void;
    private handleOptions;
    private generateAuthenticatedInstance;
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
     * Create an authenticated product templates instance
     *
     */
    productTemplates(): v0.ProductTemplates;
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
     * Create an authenticated expense accounts instance
     *
     */
    expenseAccounts(): v0.ExpenseAccounts;
    /**
     * Create an authenticated expense accounts instance
     *
     */
    paymentOptions(): v0.PaymentOptions;
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
     * Create an authenticated configurations instance
     *
     */
    users(configurationId: string): v0.Users;
    /**
     * Create an authenticated branches instance
     *
     */
    branches(): v0.Branches;
    /**
     * Create an authenticated devices instance
     *
     */
    devices(): v0.Devices;
    /**
     * Create an authenticated contents instance
     *
     */
    contents(): v0.Contents;
    /**
     * Create an authenticated discounts instance
     *
     */
    discounts(): v0.Discounts;
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
     * Create an authenticated StocksBook instance
     *
     */
    stocksBook(): v0.StocksBook;
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
     * Create an authenticated TransactionsLegacy instance
     *
     */
    transactionsLegacy(): v1.TransactionsLegacy;
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
     * Create an authenticated AuditActions instance
     *
     */
    auditActions(): v0.AuditActions;
    /**
     * Create an authenticated AuditLogs instance
     *
     */
    auditLogs(): v0.AuditLogs;
    /**
     * Create an authenticated Registers instance
     *
     */
    registers(): v1.Registers;
    /**
     * Create an authenticated Images instance
     *
     */
    images(): v0.Images;
    /**
     * Create an authenticated Videos instance
     *
     */
    videos(): v0.Videos;
    /**
     * Create an authenticated Notifications instance
     *
     */
    notifications(): v0.Notifications;
    /**
     * Create an authenticated Messages instance
     *
     */
    messages(): v0.Messages;
    /**
     * Create an authenticated Print instance
     *
     */
    print(): v0.Print;
    /**
     * Create an authenticated Favourites instance
     *
     */
    favourites(): v0.Favourites;
    /**
     * Create an authenticated Balances instance
     *
     */
    balances(): v1.Balances;
    /**
     * Create an authenticated LegacySettings instance
     *
     */
    settings_old(): v0.LegacySettings;
    /**
     * Create an authenticated Tags instance
     *
     */
    tags(): v0.Tags;
    /**
     * Create an authenticated Tags instance
     *
     */
    safes(): v0.Safes;
    /**
     * Create an authenticated Warehouses instance
     *
     */
    warehouses(): v0.Warehouses;
    /**
     * Create an authenticated StaffGroups instance
     *
     */
    staffGroups(): v0.StaffGroups;
    /**
     * Create an authenticated Exports instance
     *
     */
    exports(): v0.Exports;
}
export declare class Tillhub extends TillhubClient {
    private static instance;
    constructor(options: TillhubSDKOptions);
    static getInstance(options: TillhubSDKOptions): Tillhub;
}
declare const _default: Tillhub;
export default _default;
