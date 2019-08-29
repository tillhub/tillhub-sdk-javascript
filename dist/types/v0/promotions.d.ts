import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface PromotionsOptions {
    user?: string;
    base?: string;
}
export interface PromotionsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface PromotionsResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<PromotionsResponse>;
}
export interface PromotionResponse {
    data: Promotion;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Promotion {
    id?: string;
}
export interface Promotion {
}
export declare class Promotions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PromotionsOptions;
    uriHelper: UriHelper;
    constructor(options: PromotionsOptions, http: Client);
    getAll(queryOrOptions?: PromotionsQuery | undefined): Promise<PromotionsResponse>;
    get(promotionId: string): Promise<PromotionResponse>;
    put(promotionId: string, promotion: Promotion): Promise<PromotionResponse>;
    create(promotion: Promotion): Promise<PromotionResponse>;
    delete(promotionId: string): Promise<PromotionResponse>;
}
export declare class PromotionsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PromotionFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PromotionPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PromotionCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class PromotionDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
