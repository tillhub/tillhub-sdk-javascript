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
export interface AnalyticsUodOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsUodQuery {
    compare?: boolean;
    branch?: string;
    currency: string;
    end: Date;
    start: Date;
}
export interface AnalyticsUodRevenueQuery extends AnalyticsUodQuery {
    paymentMethodeCode?: string;
}
export interface AnalyticsUodResponse {
    data: {
        axisLabels?: string[];
        periods: AnalyticsResponsePeriods;
        series: AnalyticsResponseSeries[];
        window: AggregationWindow;
    };
}
export interface TxnStatsResponse {
    data: {
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
interface TopBranchResponse {
    data: {
        branch: string;
        currency: string;
        rate: number;
        window: AggregationWindow;
        totalBranch: number;
        totalAll: number;
    };
}
interface PaymentMethodRevenueResponse {
    data: {
        paymentMethodCode: string;
        currency: string;
        revenue: number;
        totalCount: number;
        totalRevenue: number;
        rate: number;
    };
}
interface PaymentMethodAcceptanceResponse {
    data: {
        paymentMethodCode: string;
        currency: string;
        successfulCount: number | string;
        totalCount: number | string;
        successRate: number | string;
    };
}
interface PaymentMethodRejectionResponse {
    data: {
        code: string;
        currency: string;
        totalCount: number;
        totalAllCount: number;
        rate: number;
    };
}
export declare class AnalyticsUod extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AnalyticsUodOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsUodOptions, http: Client);
    getRevenue(query?: AnalyticsUodRevenueQuery): Promise<AnalyticsUodResponse>;
    getTxnStats(query?: AnalyticsUodQuery): Promise<TxnStatsResponse>;
    getRevenueTopBranchRate(query?: AnalyticsUodQuery): Promise<TopBranchResponse>;
    getPaymentMethodRevenue(query?: AnalyticsUodQuery): Promise<PaymentMethodRevenueResponse>;
    getPaymentMethodAcceptance(query?: AnalyticsUodQuery): Promise<PaymentMethodAcceptanceResponse>;
    getPaymentMethodRejection(query?: AnalyticsUodQuery): Promise<PaymentMethodRejectionResponse>;
}
export declare class AnalyticsGetRevenueFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class GetTxnStatsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class GetRevenueTopBranchRateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class GetPaymentMethodRevenueFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class GetPaymentMethodAcceptanceFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class GetPaymentMethodRejectionFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
