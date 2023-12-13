import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface AnalyticsOptions {
    user?: string;
    base?: string;
}
export interface AnalyticsGetRevenueAverageQuery {
    compare?: boolean;
    branch?: string;
    end: Date;
    start: Date;
}
export interface AnalyticsGetRevenueAverageResponse {
    data: {
        series: Array<{
            period: 'current' | 'previous';
            data: number[];
            total: number;
            unit: string;
        }>;
    };
}
export declare class Analytics extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: AnalyticsOptions;
    uriHelper: UriHelper;
    constructor(options: AnalyticsOptions, http: Client);
    getRevenueAverage(query?: AnalyticsGetRevenueAverageQuery): Promise<AnalyticsGetRevenueAverageResponse>;
}
export declare class AnalyticsGetRevenueAverageFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
