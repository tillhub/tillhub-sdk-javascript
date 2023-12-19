import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsQuery {
    compare?: boolean;
    branch?: string;
    end: Date;
    start: Date;
}
export interface AnalyticsResponse {
    data: {
        periods: AnalyticsResponsePeriods;
        series: AnalyticsResponseSeries[];
    };
}
interface AnalyticsResponsePeriods {
    current: {
        end: Date;
        start: Date;
    };
    previous: {
        end: Date;
        start: Date;
    };
}
interface AnalyticsResponseSeries {
    period: 'current' | 'previous';
    data: number[];
    total: number;
    unit: string;
}
export declare class Analytics extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    getRevenue(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getRevenueAverage(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getOpenPurchaseOrdersCount(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getOpenPurchaseOrdersExpense(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
}
export declare class AnalyticsGetRevenueFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsGetRevenueAverageFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsGetOpenPurchaseOrdersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsGetOpenPurchaseOrdersExpenseFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
