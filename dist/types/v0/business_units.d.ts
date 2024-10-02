import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface BusinessUnitsOptions {
    user?: string;
    base?: string;
}
export interface BusinessUnitsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        extended?: boolean;
    };
}
export interface BusinessUnitsResponse {
    data: BusinessUnit[];
    metadata: Record<string, unknown>;
    next?: () => Promise<BusinessUnitsResponse>;
}
export interface BusinessUnit {
    id?: string;
    name?: string | null;
    salesStream?: SaleStream[] | null;
}
export interface SaleStream {
    id?: string;
    terminalId?: string | null;
}
export declare class BusinessUnits extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: BusinessUnitsOptions;
    uriHelper: UriHelper;
    constructor(options: BusinessUnitsOptions, http: Client);
    getAll(query?: BusinessUnitsQuery | undefined): Promise<BusinessUnitsResponse>;
}
export declare class BusinessUnitsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
