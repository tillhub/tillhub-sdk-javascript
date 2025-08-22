import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface PaymentProductsOptions {
    user?: string;
    base?: string;
}
export interface PaymentProductsResponse {
    data: PaymentProduct[];
    metadata: Record<string, unknown>;
    next?: () => Promise<PaymentProductsResponse>;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface PaymentProduct {
    state?: string;
    type?: string;
    processingPlatformIdentifier?: string;
    salesStream?: SaleStream[];
}
export interface SaleStream {
    id?: string;
    active?: boolean;
    name?: string;
    type?: string;
    businessUnit?: BusinessUnit;
}
export interface BusinessUnit {
    unzerId?: string;
}
export interface PaymentProductsQueryHandler {
    limit?: number;
    uri?: string;
    query?: PaymentProductsQuery;
    orderFields?: string[] | string;
}
export interface PaymentProductsQuery extends PaymentProduct {
    active?: boolean;
    type?: string;
}
export declare class PaymentProducts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentProductsOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentProductsOptions, http: Client);
    getAll(query?: PaymentProductsQueryHandler | undefined): Promise<PaymentProductsResponse>;
}
export declare class PaymentProductsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
