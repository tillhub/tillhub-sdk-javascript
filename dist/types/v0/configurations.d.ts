import { Client } from '../client';
export interface ConfigurationsOptions {
    user?: string;
    base?: string;
}
export interface ConfigurationsQuery {
    limit?: number;
    uri?: string;
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
    getAll(query?: ConfigurationsQuery | undefined): Promise<ConfigurationsResponse>;
}
