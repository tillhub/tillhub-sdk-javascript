import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export declare type StaffID = string | null;
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsResponse {
    data: object[];
    metadata: object;
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
export interface ProductGoupsOptions {
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
}
export interface ProductGoupsFilters {
    column: string;
    type?: string;
}
export declare class Analytics {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    getRevenuesForDayOfWeek(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getRevenuesSumForTimeRange(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getRevenues(query: RevenuesOptions): Promise<AnalyticsResponse>;
    getRevenuesForHourOfDay(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getReportsProducts(query?: ProductsOptions | undefined): Promise<AnalyticsResponse>;
    getProductsChildren(productNumber: String, query?: ProductsOptions | undefined): Promise<AnalyticsResponse>;
    getStaffOverviewReport(): Promise<AnalyticsResponse>;
    getProductGroupsReport(staff?: StaffID): Promise<AnalyticsResponse>;
    getRefundsReport(staff?: StaffID): Promise<AnalyticsResponse>;
    getVouchersReports(query?: VoucherOptions | undefined): Promise<AnalyticsResponse>;
    getProductsReport(staff?: StaffID): Promise<AnalyticsResponse>;
    getPaymentsReport(): Promise<AnalyticsResponse>;
    getSimpleSalesCartItems(query?: SimpleSalesCartItemsOptions | undefined): Promise<AnalyticsResponse>;
    getVatReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse>;
    getCustomersReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse>;
    getCustomersTransaction(query: CustomersTransactionOptions): Promise<AnalyticsResponse>;
    getCustomersOverview(query: CustomersTransactionOptions): Promise<AnalyticsResponse>;
    getStocksReport(query?: ExportFormatOptions | undefined): Promise<AnalyticsResponse>;
    getProductGroups(query?: ProductGoupsOptions | undefined): Promise<AnalyticsResponse>;
    getProductGroupsFilters(query: ProductGoupsFilters): Promise<AnalyticsResponse>;
}
