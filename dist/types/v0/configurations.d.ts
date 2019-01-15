import { Client } from '../client';
import { Users } from './users';
export interface ConfigurationsOptions {
    user?: string;
    base?: string;
}
export interface ConfigurationsQueryOptions {
    limit?: number;
    uri?: string;
    owner?: string;
    query?: any;
}
export interface ConfigurationsResponse {
    data: Configuration[];
    metadata: object;
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
}
export interface Configuration {
    vouchers?: object;
    scan_prefixes?: object[];
    voucher_actions?: object[];
    settings?: object;
    hooks?: object[];
    themes?: object;
    name?: string;
    client_id?: string;
    metadata?: object;
    registers?: object;
    branches?: object;
    owner?: string;
    franchise?: object;
    staff?: object;
    financials?: object | null;
    features?: object | null;
    stock?: object | null;
    transactions?: object | null;
    products?: object;
    customers?: object;
    crm?: object | null;
    datev?: object | null;
    label_printer?: object | null;
    delivery_note?: object | null;
    togo?: object | null;
    receipts?: object | null;
    orders?: object | null;
    carts?: object | null;
    tips?: object | null;
    emails?: object | null;
    level?: 'client_account' | 'registers' | 'branches';
    taxes?: object | null;
    analytics?: object;
    custom_dashboards?: object;
}
declare class ConfigurationReference {
    data: Configuration;
    id?: string;
    metadata?: {
        count?: number;
        patch?: any;
    };
    response: ConfigurationResponse;
    private options;
    private http;
    constructor(response: ConfigurationResponse, http: Client, options: ConfigurationsOptions);
    users(): Users;
}
export declare class Configurations {
    endpoint: string;
    http: Client;
    options: ConfigurationsOptions;
    constructor(options: ConfigurationsOptions, http: Client);
    getAll(optionsOrQuery?: ConfigurationsQueryOptions | undefined): Promise<ConfigurationsResponse>;
    get(configurationId: string): Promise<ConfigurationReference>;
    put(configurationId: string, configuration: Configuration): Promise<ConfigurationResponse>;
    create(configuration: Configuration): Promise<ConfigurationResponse>;
}
export {};
