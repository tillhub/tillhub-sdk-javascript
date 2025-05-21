import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface PaymentMethodsOptions {
    user?: string;
    base?: string;
}
export interface PaymentMethodsQueryHandler {
    limit?: number;
    uri?: string;
    query?: PaymentMethodsQuery;
}
export interface PaymentMethodsQuery extends PaymentMethodEntity {
    deleted?: boolean;
    active?: boolean;
    businessUnitId?: string;
}
export interface PaymentMethodEntity {
    id: string;
    label: string;
}
export interface PaymentMethodResponse {
    data: PaymentMethodEntity[];
    metadata: Record<string, unknown>;
    next?: () => Promise<PaymentMethodResponse>;
}
export declare class PaymentMethods extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentMethodsOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentMethodsOptions, http: Client);
    getAll(query?: PaymentMethodsQueryHandler | undefined): Promise<PaymentMethodResponse>;
}
export declare class PaymentMethodFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
