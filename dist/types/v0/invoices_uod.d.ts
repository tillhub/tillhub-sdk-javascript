import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
declare type StatusTypes = 'Open' | 'Paid' | 'Dunning' | 'Encashment' | 'Cancellation' | 'Cancellation paid';
declare type DocumentTypes = 'Standard' | 'Credit Note' | 'Partial Cancellation' | 'Full Cancellation';
declare type OriginTypes = 'Ecom' | 'POS';
export interface UodInvoicesResponse {
    data: UodInvoicesEntity[];
    metadata: Record<string, unknown>;
    next?: () => Promise<UodInvoicesResponse>;
}
export interface UodInvoicesOptions {
    user?: string;
    base?: string;
}
export interface UodInvoicesQueryHandler {
    limit?: number;
    uri?: string;
    query?: UodInvoicesQuery;
    orderFields?: string[] | string;
}
export interface UodInvoicesQuery extends UodInvoicesEntity {
    active?: boolean;
    billingPeriodStart?: Date | string;
    billingPeriodEnd?: Date | string;
}
export interface UodInvoicesEntity {
    id?: string;
    documentNumber?: string;
    billingPeriod?: string | PeriodTimestamp;
    createdAt?: Date | string;
    status?: StatusTypes;
    type?: DocumentTypes;
    csvUrl?: string;
    pdfUrl?: string;
    origin?: OriginTypes;
}
export interface PeriodTimestamp {
    billingPeriodStart: Date | string;
    billingPeriodEnd: Date | string;
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export declare class UodInvoices extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: UodInvoicesOptions;
    uriHelper: UriHelper;
    constructor(options: UodInvoicesOptions, http: Client);
    getAll(query?: UodInvoicesQueryHandler | undefined): Promise<UodInvoicesResponse>;
}
export declare class UodInvoicesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
