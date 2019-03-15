import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface PaymentsOptions {
    user?: string;
    base?: string;
}
export interface PaymentsResponse {
    data: object[];
    metadata: object;
}
export interface PaymentsQuery {
    uri?: string;
}
export declare class Payments {
    http: Client;
    options: PaymentsOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentsOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: PaymentsQuery): Promise<PaymentsResponse>;
    meta(): Promise<PaymentsResponse>;
}
