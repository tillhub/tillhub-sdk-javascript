import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface DiscountsOptions {
    user?: string;
    base?: string;
}
export interface DiscountsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
    };
}
export interface DiscountsResponse {
    data: Discount[];
    metadata: Record<string, unknown>;
    next?: () => Promise<DiscountsResponse>;
}
export interface DiscountResponse {
    data?: Discount;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export declare type DiscountType = 'percentage' | 'value';
export declare type DiscountGroupType = 'cart' | 'customer';
export interface Discount {
    id?: string;
    amount?: number;
    type: DiscountType;
    account?: string;
    name?: string;
    group: DiscountGroupType;
    active?: boolean;
    deleted?: boolean;
    constraints?: Record<string, unknown> | null;
}
export declare class Discounts extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: DiscountsOptions;
    uriHelper: UriHelper;
    constructor(options: DiscountsOptions, http: Client);
    getAll(queryOrOptions?: DiscountsQuery | undefined): Promise<DiscountsResponse>;
    get(discountId: string): Promise<DiscountResponse>;
    put(discountId: string, discount: Discount): Promise<DiscountResponse>;
    create(discount: Discount): Promise<DiscountResponse>;
    count(): Promise<DiscountsResponse>;
    delete(discountId: string): Promise<DiscountResponse>;
}
