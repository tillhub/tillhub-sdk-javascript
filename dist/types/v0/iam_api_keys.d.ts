import { Client } from '../client';
import { BaseError } from '../errors/baseError';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface IamApiKeysOptions {
    user?: string;
    base?: string;
}
export interface IamApiKeysResponse {
    data: MerchantApiKey[];
    metadata: Record<string, unknown>;
    next?: () => Promise<IamApiKeysResponse>;
}
export interface IamApiKeyResponse {
    data: MerchantApiKey;
    metadata: Record<string, unknown>;
    msg?: string;
    errors?: ErrorObject[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface IamApiKeysPrivateKeyResponse {
    privateKey?: string;
}
export interface MerchantApiKey {
    publicKey?: string;
    secureLevel?: string;
    alias?: string;
    productType?: string;
    keyPairState?: string;
    paymentTypes?: MerchantApiKeyPaymentType[];
}
export interface MerchantApiKeyPaymentType {
    type?: string;
    allowCustomerTypes?: string;
    allowCreditTransaction?: string;
    supports?: MerchantApiKeyScope[];
}
export interface MerchantApiKeyScope {
    channel?: string;
    pmpId?: string;
    brands?: string[];
    currency?: string[];
    countries?: string[];
}
export interface IamApiKeysQueryHandler {
    limit?: number;
    uri?: string;
    query?: IamApiKeysQuery;
    orderFields?: string[] | string;
}
export interface IamApiKeysQuery extends MerchantApiKey {
    businessUnitUnzerId?: string;
    deleted?: boolean;
    active?: boolean;
    q?: string;
}
export declare class IamApiKeys extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: IamApiKeysOptions;
    uriHelper: UriHelper;
    constructor(options: IamApiKeysOptions, http: Client);
    getAll(query?: IamApiKeysQueryHandler | undefined): Promise<IamApiKeysResponse>;
    get(apiKeyId: string): Promise<IamApiKeyResponse>;
    getPrivateKey(publicKey: string): Promise<IamApiKeysPrivateKeyResponse>;
    meta(query?: IamApiKeysQueryHandler | undefined): Promise<IamApiKeysResponse>;
}
export declare class IamApiKeysFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamApiKeysMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamApiKeyFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class IamApiKeysPrivateKeyFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
