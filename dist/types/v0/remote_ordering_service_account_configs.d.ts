import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface RemoteOrderingServiceAccountConfigsOptions {
    user?: string;
    base?: string;
}
export interface RemoteOrderingServiceAccountConfig {
    id: string;
    serviceAccountId: string;
    locationId: string;
    registerId: string;
}
export interface RemoteOrderingServiceAccountConfigBody {
    locationId: string;
    registerId: string;
}
export interface RemoteOrderingServiceAccountConfigsListResponse {
    data: RemoteOrderingServiceAccountConfig[];
    metadata: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<RemoteOrderingServiceAccountConfigsListResponse>;
}
export interface RemoteOrderingServiceAccountConfigMutationResponse {
    data: RemoteOrderingServiceAccountConfig | {
        success: boolean;
    } | null;
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class RemoteOrderingServiceAccountConfigs extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: RemoteOrderingServiceAccountConfigsOptions;
    uriHelper: UriHelper;
    constructor(options: RemoteOrderingServiceAccountConfigsOptions, http: Client);
    private basePath;
    list(serviceAccountId: string, query?: {
        limit?: number;
        uri?: string;
    }): Promise<RemoteOrderingServiceAccountConfigsListResponse>;
    listAll(serviceAccountId: string): Promise<RemoteOrderingServiceAccountConfig[]>;
    create(serviceAccountId: string, body: RemoteOrderingServiceAccountConfigBody): Promise<RemoteOrderingServiceAccountConfigMutationResponse>;
    update(serviceAccountId: string, configurationId: string, body: RemoteOrderingServiceAccountConfigBody): Promise<RemoteOrderingServiceAccountConfigMutationResponse>;
    delete(serviceAccountId: string, configurationId: string): Promise<RemoteOrderingServiceAccountConfigMutationResponse>;
}
export declare class RemoteOrderingServiceAccountConfigsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
