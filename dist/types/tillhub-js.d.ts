/// <reference types="node" />
import events from 'events';
import { UsernameAuth, KeyAuth, TokenAuth } from './v0/auth';
import { Auth } from './v1/auth';
import * as v0 from './v0';
import * as v1 from './v1';
import * as v2 from './v2';
import * as v3 from './v3';
import * as v4 from './v4';
import { AnalyticsHandlersV1Types } from './v1';
import { AnalyticsHandlerTypes } from './v2';
import { AnalyticsHandlerTypesV3 } from './v3';
import { Client, Timeout } from './client';
export { v0, v1, v2, v3, v4 };
export declare const defaultOptions: TillhubSDKOptions;
declare type Fn = () => any;
export interface TillhubSDKOptions {
    credentials?: UsernameAuth | KeyAuth | TokenAuth | undefined;
    base?: string;
    user?: string;
    whitelabel?: string;
    responseInterceptors?: Fn[];
    requestInterceptors?: Fn[];
}
interface AxiosOptions {
    timeout?: Timeout;
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
    productsV2(): v2.Products;
    productsV4(): v4.Products;
    productGroups(): v0.ProductGroups;
    productTemplates(): v0.ProductTemplates;
    productTemplateDefaults(): v0.ProductTemplateDefaults;
    productAddonGroups(): v0.ProductAddonGroups;
    productAddons(): v0.ProductAddons;
    productBranchCustomizations(): v0.ProductBranchCustomizations;
    deliveries(): v0.Deliveries;
    accounts(): v0.Accounts;
    expenseAccounts(): v0.ExpenseAccounts;
    paymentOptions(): v0.PaymentOptions;
    templates(): v1.Templates;
    configurations(): v0.Configurations;
    configurationsV1(): v1.Configurations;
    inventoryConfiguration(): v0.InventoryConfiguration;
    users(configurationId: string): v0.Users;
    iamUsers(): v0.IamUsers;
    iamApiKeys(): v0.IamApiKeys;
    iamUserGroups(): v0.IamUserGroups;
    iamRoles(): v0.IamRoles;
    iamPermissions(): v0.IamPermissions;
    iamMeClass(): v0.IamMeClass;
    branches(): v0.Branches;
    branchesV1(): v1.Branches;
    branchGroups(): v0.BranchGroups;
    devices(): v0.Devices;
    contents(): v0.Contents;
    contentTemplates(): v0.ContentTemplates;
    discounts(): v0.Discounts;
    customers(): v0.Customers;
    customersV1(): v1.Customers;
    businessUnits(): v0.BusinessUnits;
    uodInvoices(): v0.UodInvoices;
    uodInvoicesDownload(): v0.UodInvoices;
    suppliers(): v0.Suppliers;
    suppliersProductsRelation(): v0.SuppliersProductsRelation;
    vouchers(): v1.Vouchers;
    voucherLogs(): v0.VoucherLogs;
    voucherSystems(): v0.VoucherSystems;
    abocardSystems(): v0.AbocardSystems;
    me(): v0.Me;
    invoices(): v0.Invoices;
    stocks(): v0.Stocks;
    stocksBookV1(): v1.StocksBook;
    stocksBook(): v0.StocksBook;
    orders(): v0.Orders;
    analytics(axiosOptions?: AxiosOptions): v0.Analytics;
    analyticsHandlersV1(axiosOptions?: AxiosOptions): AnalyticsHandlersV1Types;
    analyticsHandlers(axiosOptions?: AxiosOptions): AnalyticsHandlerTypes;
    transactionsV3(): v3.Transactions;
    paymentMethodsV3(): v3.PaymentMethods;
    analyticsHandlersV3(axiosOptions?: AxiosOptions): AnalyticsHandlerTypesV3;
    transactionsLegacy(): v1.TransactionsLegacy;
    transactions(axiosOptions?: AxiosOptions): v1.Transactions;
    transactionsV2(): v2.Transactions;
    ordersV2(): v2.Orders;
    exportsV1(): v1.ExportsV1;
    staff(): v0.Staff;
    auditActions(): v0.AuditActions;
    auditLogs(): v0.AuditLogs;
    auditLogsV1(): v1.AuditLogs;
    registers(): v1.Registers;
    images(): v0.Images;
    videos(): v0.Videos;
    notifications(): v0.Notifications;
    notificationsMsu(): v1.NotificationsMsu;
    notificationsUnsubscribe(): v1.NotificationsUnsubscribe;
    messages(): v0.Messages;
    print(): v0.Print;
    favourites(): v0.Favourites;
    fiscalization(): v0.Fiscalization;
    balances(): v1.Balances;
    settings_old(): v0.LegacySettings;
    tags(): v0.Tags;
    tagsV1(): v1.Tags;
    safes(): v0.Safes;
    safesLogBook(): v0.SafesLogBook;
    safesLogBookV1(): v1.SafesLogBook;
    warehouses(): v0.Warehouses;
    webhooks(): v0.Webhooks;
    webhookEvents(): v0.WebhookEvents;
    supportedEvents(): v0.SupportedEvents;
    staffGroups(): v0.StaffGroups;
    serviceCategory(): v0.ServiceCategory;
    services(): v0.Services;
    exports(): v0.Exports;
    promotions(): v0.Promotions;
    promotionsV1(): v1.Promotions;
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
    purchaseOrders(): v0.PurchaseOrders;
    consignmentNotes(): v0.ConsignmentNotes;
    documents(): v0.Documents;
    holidays(): v0.Holidays;
    shiftPlan(): v0.ShiftPlan;
    analyticsV4(): v4.Analytics;
    analyticsUodV4(): v4.AnalyticsUod;
    scheduledExports(): v0.ScheduledExports;
    customerAppointments(): v0.CustomerAppointments;
    documentExports(): v0.DocumentExports;
    appointmentReminders(): v1.AppointmentReminders;
    tableLayouts(): v1.TableLayouts;
    devicesV1(): v1.Devices;
    contentsV1(): v1.Contents;
    contentTemplatesV1(): v1.ContentTemplates;
    import(): v1.Import;
    submissions(): v0.Submissions;
}
export declare class Tillhub extends TillhubClient {
    private static instance;
    constructor(options: TillhubSDKOptions);
    static getInstance(options: TillhubSDKOptions): Tillhub;
}
declare const _default: Tillhub;
export default _default;
