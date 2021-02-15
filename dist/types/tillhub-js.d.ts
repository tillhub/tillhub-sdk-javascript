/// <reference types="node" />
import events from 'events';
import { UsernameAuth, KeyAuth, TokenAuth } from './v0/auth';
import { Auth } from './v1/auth';
import * as v0 from './v0';
import * as v1 from './v1';
import v2, { AnalyticsHandlerTypes } from './v2';
import { Client } from './client';
export { v0, v1, v2 };
export declare const defaultOptions: TillhubSDKOptions;
declare type Fn = () => any;
export interface TillhubSDKOptions {
    credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined;
    base?: string;
    user?: string;
    responseInterceptors?: Fn[];
    requestInterceptors?: Fn[];
}
export declare interface TillhubClient {
    on: ((event: 'raw-error' | 'error', listener: (error: Error) => void) => this) & ((event: string, listener: Fn) => this);
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
    init(options?: TillhubSDKOptions): void;
    destroy(): void;
    private handleOptions;
    private generateAuthenticatedInstance;
    taxes(): v0.Taxes;
    products(): v1.Products;
    productGroups(): v0.ProductGroups;
    productTemplates(): v0.ProductTemplates;
    deliveries(): v0.Deliveries;
    accounts(): v0.Accounts;
    expenseAccounts(): v0.ExpenseAccounts;
    paymentOptions(): v0.PaymentOptions;
    templates(): v1.Templates;
    configurations(): v0.Configurations;
    users(configurationId: string): v0.Users;
    branches(): v0.Branches;
    branchGroups(): v0.BranchGroups;
    devices(): v0.Devices;
    contents(): v0.Contents;
    contentTemplates(): v0.ContentTemplates;
    discounts(): v0.Discounts;
    customers(): v0.Customers;
    customersV1(): v1.Customers;
    vouchers(): v1.Vouchers;
    voucherLogs(): v0.VoucherLogs;
    voucherSystems(): v0.VoucherSystems;
    me(): v0.Me;
    invoices(): v0.Invoices;
    stocks(): v0.Stocks;
    stocksBook(): v0.StocksBook;
    orders(): v0.Orders;
    analytics(): v0.Analytics;
    analyticsHandlers(): AnalyticsHandlerTypes;
    transactionsLegacy(): v1.TransactionsLegacy;
    transactions(): v1.Transactions;
    staff(): v0.Staff;
    auditActions(): v0.AuditActions;
    auditLogs(): v0.AuditLogs;
    registers(): v1.Registers;
    images(): v0.Images;
    videos(): v0.Videos;
    notifications(): v0.Notifications;
    messages(): v0.Messages;
    print(): v0.Print;
    favourites(): v0.Favourites;
    balances(): v1.Balances;
    settings_old(): v0.LegacySettings;
    tags(): v0.Tags;
    safes(): v0.Safes;
    safesLogBook(): v0.SafesLogBook;
    safesLogBookV1(): v1.SafesLogBook;
    warehouses(): v0.Warehouses;
    staffGroups(): v0.StaffGroups;
    exports(): v0.Exports;
    promotions(): v0.Promotions;
    productServiceQuestionGroups(): v0.ProductServiceQuestionGroups;
    productServiceQuestions(): v0.ProductServiceQuestions;
    data(): v0.Data;
    reasons(): v0.Reasons;
    processes(): v0.Processes;
    functions(): v0.Functions;
    deviceGroups(): v0.DeviceGroups;
    carts(): v1.Carts;
    staffPermissionsTemplates(): v0.StaffPermissionsTemplates;
    correspondences(): v0.Correspondences;
    storefronts(): v0.Storefronts;
    categoryTrees(): v0.CategoryTrees;
    categories(): v0.Categories;
    dependencies(): v0.Dependencies;
    trash(): v0.Trash;
    timetracking(): v0.Timetracking;
    countingProtocols(): v0.CountingProtocols;
    stockTakings(): v0.StockTakings;
    userPermissionsTemplates(): v0.UserPermissionsTemplates;
    dbBackups(): v0.DbBackups;
}
export declare class Tillhub extends TillhubClient {
    private static instance;
    constructor(options: TillhubSDKOptions);
    static getInstance(options: TillhubSDKOptions): Tillhub;
}
declare const _default: Tillhub;
export default _default;
