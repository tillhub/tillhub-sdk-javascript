import { Client } from '../client';
import { Users } from './users';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface InventoryConfigurationOptions {
    user?: string;
    base?: string;
}
export interface InventoryConfigurationsQueryOptions {
    limit?: number;
    uri?: string;
    owner?: string;
    query?: Record<string, unknown>;
}
export interface InventoryConfigurationsResponse {
    data: InventoryConfiguration[];
    metadata: Record<string, unknown>;
}
export interface InventoryConfigurationResponse {
    data: InventoryConfiguration;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface InventoryConfiguration {
    id?: string;
    template?: string | null;
    autoGenerate?: boolean | null;
    active?: boolean | null;
    owner?: string | null;
}
declare class InventoryConfigurationReference {
    data: InventoryConfiguration;
    id?: string;
    metadata?: {
        count?: number;
        patch?: any;
    };
    response: InventoryConfigurationResponse;
    private readonly options;
    private readonly http;
    constructor(response: InventoryConfigurationResponse, http: Client, options: InventoryConfigurationOptions);
    users(): Users;
}
export declare class InventoryConfiguration extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: InventoryConfigurationOptions;
    uriHelper: UriHelper;
    constructor(options: InventoryConfigurationOptions, http: Client);
    getAll(optionsOrQuery?: InventoryConfigurationsQueryOptions | undefined): Promise<InventoryConfigurationsResponse>;
    get(configurationId: string): Promise<InventoryConfigurationReference>;
    put(configurationId: string, configuration: InventoryConfiguration): Promise<InventoryConfigurationResponse>;
}
export {};
