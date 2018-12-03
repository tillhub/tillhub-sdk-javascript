import { Client } from '../client';
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
export interface RevenuesOptions {
    branch_number?: string | null;
    precision?: 'hour' | 'day';
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
}
export interface VoucherOptions {
    [key: string]: any;
    voucher_number?: string;
    redeemed_id?: string;
    redeemed_branch?: string;
    redeemed_email?: string;
    redeemed_external_custom_id?: string;
    redeemed_at?: string;
    issuer?: string;
    issued_at?: string;
    valid_until?: string;
    comment?: string;
    search?: string;
}
export declare class Analytics {
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    constructor(options: AnalyticsOptions, http: Client);
    getRevenuesForDayOfWeek(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getRevenues(query: RevenuesOptions): Promise<AnalyticsResponse>;
    getRevenuesForHourOfDay(query: RevenuBasicOptions): Promise<AnalyticsResponse>;
    getReportsProducts(query: ProductsOptions): Promise<AnalyticsResponse>;
    getStaffOverviewReport(): Promise<AnalyticsResponse>;
    getProductGroupsReport(staff?: StaffID): Promise<AnalyticsResponse>;
    getRefundsReport(staff?: StaffID): Promise<AnalyticsResponse>;
    getVouchersReports(query?: VoucherOptions | undefined): Promise<AnalyticsResponse>;
}
