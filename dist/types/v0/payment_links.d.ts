import { ThBaseHandler } from '../base';
import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface PaymentLinksOptions {
    user?: string;
    base?: string;
}
export interface PaymentLinksQuery {
    limit?: number;
    uri?: string;
    query?: Record<string, unknown>;
}
export interface PaymentLinksResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<PaymentLinksResponse>;
}
export interface PaymentLinkResponse {
    data?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export declare class PaymentLinks extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentLinksOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentLinksOptions, http: Client);
    getAll(query?: PaymentLinksQuery | undefined): Promise<PaymentLinksResponse>;
    meta(): Promise<PaymentLinksResponse>;
}
