import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
export interface VatOptions {
    user?: string;
    base?: string;
}
export interface VatResponse {
    data: object[];
    metadata: object;
}
export interface VatQuery {
    format?: string;
    uri?: string;
    legacy?: boolean;
    limit?: number;
}
export interface MetaQuery {
    legacy?: boolean;
}
export declare class Vat {
    http: Client;
    options: VatOptions;
    uriHelper: UriHelper;
    constructor(options: VatOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: VatQuery): Promise<VatResponse>;
    meta(query?: MetaQuery): Promise<VatResponse>;
}
