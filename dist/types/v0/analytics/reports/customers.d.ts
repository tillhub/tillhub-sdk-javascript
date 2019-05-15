import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsResponse {
    data: object[];
    metadata: object;
    msg?: string;
}
export interface CustomersQuery {
    customer_number?: string;
    firstname?: string;
    lastname?: string;
    company?: string;
    uri?: string;
    format?: string;
    legacy?: boolean;
    cursor_field?: string;
}
export interface CustomersItem {
    customer_number?: string;
    firstname?: string;
    lastname?: string;
    company?: string;
}
export interface CustomersOneQuery {
    customer_id: string | null;
    currency?: string;
}
export declare class Customers {
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: CustomersQuery | undefined): Promise<AnalyticsResponse>;
    getFilters(): Promise<AnalyticsResponse>;
    getTransaction(query: CustomersOneQuery): Promise<AnalyticsResponse>;
    getOverview(query: CustomersOneQuery): Promise<AnalyticsResponse>;
    meta(query?: CustomersQuery | undefined): Promise<AnalyticsResponse>;
}
