import { Client } from '../../../client';
import { UriHelper } from '../../../uri-helper';
import { BaseError } from '../../../errors';
export interface CashBookOptions {
    user?: string;
    base?: string;
}
export interface CashBookResponse {
    data: object[];
}
export interface CashBookQuery {
    format?: string;
    uri?: string;
    query: {
        start: string;
        end: string;
        timezone: string;
        register_custom_id: string;
        register: string;
        branch_custom_id: string;
        branch: string;
    };
}
export declare class CashBook {
    http: Client;
    options: CashBookOptions;
    uriHelper: UriHelper;
    constructor(options: CashBookOptions, http: Client, uriHelper: UriHelper);
    getAll(query?: CashBookQuery): Promise<CashBookResponse>;
}
export declare class CashBookReportFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
