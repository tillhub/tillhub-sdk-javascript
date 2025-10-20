import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface SaleStreamsOptions {
    user?: string;
    base?: string;
}
export interface SaleStreamsResponse {
    data: SaleStream[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface SaleStream {
    id?: string;
    active?: boolean;
    name?: string;
    type?: string;
    businessUnit?: BusinessUnit;
    keyPairIds?: string[];
}
export interface BusinessUnit {
    unzerId?: string;
    type?: string;
}
export declare class SaleStreams extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SaleStreamsOptions;
    uriHelper: UriHelper;
    constructor(options: SaleStreamsOptions, http: Client);
    getMotoSaleStreams(): Promise<SaleStreamsResponse>;
}
export declare class SaleStreamsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
