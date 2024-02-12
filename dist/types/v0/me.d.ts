import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface MeOptions {
    user?: string;
    base?: string;
}
export interface MeResponse {
    data: Me;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
    errors?: ErrorObject[];
}
export interface Me {
    id: string;
    role: string;
    scopes: string[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails?: Record<string, unknown>;
}
export declare class Me extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: MeOptions;
    uriHelper: UriHelper;
    constructor(options: MeOptions, http: Client);
    get(clientAccount?: string | null): Promise<MeResponse>;
}
export declare class MeFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
