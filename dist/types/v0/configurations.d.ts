import { Client } from '../client';
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
    data: object[];
    metadata: object;
}
export declare class Configurations {
    endpoint: string;
    http: Client;
    options: ConfigurationsOptions;
    constructor(options: ConfigurationsOptions, http: Client);
    getAll(optionsOrQuery?: ConfigurationsQueryOptions | undefined): Promise<ConfigurationsResponse>;
}
