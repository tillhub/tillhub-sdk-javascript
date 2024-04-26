import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ConfigurationsOptions {
    user?: string;
    base?: string;
}
export interface ConfigurationsQueryOptions {
    limit?: number;
    uri?: string;
    owner?: string;
    query?: Record<string, unknown>;
}
export interface ConfigurationsResponse {
    data: Configuration[];
    metadata: Record<string, unknown>;
}
export interface ConfigurationResponse {
    data: Configuration;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Configuration {
    id?: string;
    vouchers?: Record<string, unknown>;
    scan_prefixes?: Array<Record<string, unknown>>;
    voucher_actions?: Array<Record<string, unknown>>;
    settings?: Record<string, unknown>;
    hooks?: Array<Record<string, unknown>>;
    themes?: Record<string, unknown>;
    name?: string;
    client_id?: string;
    metadata?: Record<string, unknown>;
    registers?: Record<string, unknown>;
    branches?: Record<string, unknown>;
    owner?: string;
    franchise?: Record<string, unknown>;
    staff?: Record<string, unknown>;
    financials?: Record<string, unknown> | null;
    features?: Record<string, unknown> | null;
    stock?: Record<string, unknown> | null;
    transactions?: Record<string, unknown> | null;
    products?: Record<string, unknown>;
    customers?: Record<string, unknown>;
    crm?: Record<string, unknown> | null;
    datev?: Record<string, unknown> | null;
    label_printer?: Record<string, unknown> | null;
    delivery_note?: Record<string, unknown> | null;
    togo?: Record<string, unknown> | null;
    receipts?: Record<string, unknown> | null;
    orders?: Record<string, unknown> | null;
    carts?: Record<string, unknown> | null;
    tips?: Record<string, unknown> | null;
    emails?: Record<string, unknown> | null;
    level?: 'client_account' | 'registers' | 'branches';
    taxes?: Record<string, unknown> | null;
    analytics?: Record<string, unknown>;
    reservations?: Record<string, unknown>;
    custom_dashboards?: Record<string, unknown>;
}
export declare class Configurations extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ConfigurationsOptions;
    uriHelper: UriHelper;
    constructor(options: ConfigurationsOptions, http: Client);
    patch(configurationId: string, configuration: Configuration): Promise<ConfigurationResponse>;
}
