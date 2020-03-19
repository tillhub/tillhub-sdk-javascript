import { ThAnalyticsBaseHandler } from '../../../base';
import { Client } from '../../../client';
import { BaseError } from '../../../errors';
export interface BalancesHandlerOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsReportsBalancesOverviewResponseItem {
    data: object[];
    summary: object[];
    metaData: {
        count: number;
        total_count: number;
    };
    next?: () => Promise<AnalyticsReportsBalancesOverviewResponseItem>;
}
export interface AnalyticsReportsBalancesDetailResponseItem {
    data: object;
    metaData: {
        count: number;
        total_count: number;
    };
}
export declare class AnalyticsReportsBalancesOverview extends ThAnalyticsBaseHandler {
    http: Client;
    options: BalancesHandlerOptions;
    constructor(options: BalancesHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsBalancesOverview;
    getAll(query?: object): Promise<AnalyticsReportsBalancesOverviewResponseItem>;
}
export declare class AnalyticsReportsBalancesDetail extends ThAnalyticsBaseHandler {
    http: Client;
    options: BalancesHandlerOptions;
    constructor(options: BalancesHandlerOptions, http: Client);
    static create(options: object, http: Client): AnalyticsReportsBalancesDetail;
    get(id?: string): Promise<AnalyticsReportsBalancesDetailResponseItem>;
}
export declare class AnalyticsReportsBalancesOverviewFetchError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class AnalyticsReportsTransactionDetailFetcshError extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
