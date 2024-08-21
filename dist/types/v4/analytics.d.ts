import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
declare enum AggregationWindow {
    HOURLY = "hourly",
    DAILY = "daily",
    WEEKLY = "weekly",
    MONTHLY = "monthly",
    QUARTERLY = "quarterly",
    YEARLY = "yearly"
}
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsQuery {
    compare?: boolean;
    branch?: string;
    currency: string;
    end: Date;
    start: Date;
}
export interface AnalyticsRevenueTopProductsQuery extends AnalyticsQuery {
    orderBy?: string;
    orderDirection?: string;
}
export interface AnalyticsResponse {
    data: {
        axisLabels?: string[];
        periods: AnalyticsResponsePeriods;
        series: AnalyticsResponseSeries[];
        window: AggregationWindow;
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
    getRevenueTopProducts(query?: AnalyticsRevenueTopProductsQuery): Promise<AnalyticsResponse>;
    getRevenuePaymentTypes(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getOpenPurchaseOrdersCount(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getOpenPurchaseOrdersExpense(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getProductsReturnRate(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getProductsTopGroups(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
    getCartItemsAverage(query?: AnalyticsQuery): Promise<AnalyticsResponse>;
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
export declare class AnalyticsGetRevenueTopProductsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsGetRevenuePaymentTypesFailed extends BaseError {
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
export declare class AnalyticsGetProductsReturnRateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsGetProductsTopGroupsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AnalyticsGetCartItemsAverageFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
