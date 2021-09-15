import { Client, Timeout } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { Balances } from './analytics/reports/balances';
import { PaymentOptions } from './analytics/reports/payment_options';
import { Payments } from './analytics/reports/payments';
import { Vat } from './analytics/reports/vat';
import { CashBook } from './analytics/reports/cash_book';
import { Customers } from './analytics/reports/customers';
export declare type StaffID = string | null;
export interface AnalyticsOptions {
    user?: string;
    base?: string;
    timeout?: Timeout;
}
export interface AnalyticsResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    msg?: string;
}
export interface RevenuBasicOptions {
    branch_number?: string | null;
    start: string;
    end: string;
}
export declare type RevenuePeriods = 'hour' | 'day';
export interface RevenuesOptions {
    branch_number?: string | null;
    precision?: RevenuePeriods;
    start: string;
    end: string;
}
export interface ProductsOptions {
    [key: string]: any;
    branch_id?: string;
    register_id?: string;
    staff_id?: string;
    limit?: number;
    offset?: number;
    start?: string;
    end?: string;
    q?: string;
    format?: string;
}
export interface VoucherOptions {
    [key: string]: any;
    voucher_number?: string;
    redeemed_id?: string;
    redeemed_branch?: string;
    redeemed_email?: string;
    redeemed_external_custom_id?: string;
    redeemed_at_start?: string;
    redeemed_at_end?: string;
    issuer?: string;
    issued_at_start?: string;
    issued_at_end?: string;
    valid_until_start?: string;
    valid_until_end?: string;
    comment?: string;
    q?: string;
    amount_old?: string;
    amount_new?: string;
    currency?: string;
    delta?: string;
    type?: 'update:update' | 'update:decrement' | 'update:increment' | 'create';
}
export interface ExportFormatOptions {
    format?: string;
    branch_number?: number;
}
export interface CustomersTransactionOptions {
    customer_id: string | null;
    currency?: string;
}
export interface SimpleSalesCartItemsOptions {
    [key: string]: any;
    start?: string;
    end?: string;
    embed?: string | string[];
    include?: string | string[];
}
export interface PaymentsReportOptions {
    [key: string]: any;
}
export interface TopPaymentsReportOptions {
    start?: string;
    end?: string;
    branch_number?: number;
}
export interface ProductGroupsOptions {
    description?: string;
    product_group_id?: string;
    qty?: {
        from: number;
        to: number;
    };
    revenue?: {
        from: number;
        to: number;
    };
    net_revenue?: {
        from: number;
        to: number;
    };
    discount?: {
        from: number;
        to: number;
    };
    column?: string;
    direction?: string;
    q?: string;
    format?: string;
    branch_number?: number;
}
export interface ProductGroupsFilters {
    column: string;
    type?: string;
}
export interface StaffQuery {
    branch_number?: string;
    start?: string;
    end?: string;
}
export interface ReportOptions extends StaffQuery {
    staff?: StaffID;
}
export declare class Analytics {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    timeout: Timeout;
    constructor(options: AnalyticsOptions, http: Client);
    getRevenuesForDayOfWeek(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getRevenuesSumForTimeRange(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getRevenues(query: RevenuesOptions): Promise<AnalyticsResponse>;
    getRevenuesForHourOfDay(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getReportsProducts(query?: ProductsOptions | undefined): Promise<AnalyticsResponse>;
    getProductsChildren(productNumber: string, query?: ProductsOptions | undefined): Promise<AnalyticsResponse>;
    getStaffOverviewReport(query?: StaffQuery | undefined): Promise<AnalyticsResponse>;
    getProductGroupsStaffReport(options?: ReportOptions | undefined): Promise<AnalyticsResponse>;
    getProductGroupsReport(query?: RevenuBasicOptions | undefined): Promise<AnalyticsResponse>;
    getRefundsReport(options?: ReportOptions | undefined): Promise<AnalyticsResponse>;
    getVouchersReports(query?: VoucherOptions | undefined): Promise<AnalyticsResponse>;
    getProductsReport(options?: ReportOptions | undefined): Promise<AnalyticsResponse>;
    getPaymentsReport(query?: PaymentsReportOptions): Promise<AnalyticsResponse>;
    getTopPaymentsReport(query?: TopPaymentsReportOptions): Promise<AnalyticsResponse>;
    getSimpleSalesCartItems(query?: SimpleSalesCartItemsOptions | undefined): Promise<AnalyticsResponse>;
    getCustomersReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse>;
    getCustomersTransaction(query: CustomersTransactionOptions): Promise<AnalyticsResponse>;
    getCustomersOverview(query: CustomersTransactionOptions): Promise<AnalyticsResponse>;
    getStocksReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse>;
    getProductGroups(query?: ProductGroupsOptions | undefined): Promise<AnalyticsResponse>;
    getProductGroupsFilters(query: ProductGroupsFilters): Promise<AnalyticsResponse>;
    balances(): Balances;
    paymentOptions(): PaymentOptions;
    payments(): Payments;
    vat(): Vat;
    cashBook(): CashBook;
    customers(): Customers;
}
export declare class ReportsStocksFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class RefundsReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class VouchersReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductsReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PaymentsReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class TopPaymentsReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class RevenuesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReportsProductGroupsFiltersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReportsProductGroupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReportsCustomerOverviewFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReportsCustomerTransactionsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ReportsCustomerCustomersFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SimpleSalesCartItemsReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductGroupsStaffReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ProductGroupsReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StatisticsProductChildrenFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StaffOverviewFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class StatisticsProductFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
