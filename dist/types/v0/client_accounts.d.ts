import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ClientAccountsOptions {
    user?: string;
    base?: string;
}
export interface ConnectedDashboardDetails {
    name: string | null;
    clientAccountId?: string | null;
}
export interface ClientAccountConnections {
    connectedDashboards: Record<string, string[]>;
    connectedDashboardsList: string[];
    connectedDashboardsDetails: Record<string, ConnectedDashboardDetails>;
}
export interface ClientAccountConnectionsResponse {
    data: ClientAccountConnections;
    metadata: Record<string, unknown>;
    msg?: string;
}
export declare class ClientAccounts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ClientAccountsOptions;
    uriHelper: UriHelper;
    constructor(options: ClientAccountsOptions, http: Client);
    getConnections(clientAccountId: string): Promise<ClientAccountConnectionsResponse>;
}
export declare class ClientAccountConnectionsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
