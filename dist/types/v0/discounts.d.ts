import { Client } from '../client';
export interface DiscountsOptions {
    user?: string;
    base?: string;
}
export interface DiscountsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
    };
}
export interface DiscountsResponse {
    data: Discount[];
    metadata: object;
    next?: () => Promise<DiscountsResponse>;
}
export interface DiscountResponse {
    data: Discount;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
declare type DiscountType = 'percentage' | 'value';
declare type DiscountGroupType = 'cart' | 'customer';
export interface Discount {
    id?: string;
}
export interface Discount {
    amount?: number;
    type: DiscountType;
    account?: string;
    name?: string;
    group: DiscountGroupType;
    active?: boolean;
    deleted?: boolean;
}
export declare class Discounts {
    endpoint: string;
    http: Client;
    options: DiscountsOptions;
    constructor(options: DiscountsOptions, http: Client);
    getAll(queryOrOptions?: DiscountsQuery | undefined): Promise<DiscountsResponse>;
    get(discountId: string): Promise<DiscountResponse>;
    put(discountId: string, discount: Discount): Promise<DiscountResponse>;
    create(discount: Discount): Promise<DiscountResponse>;
    count(): Promise<DiscountsResponse>;
    delete(discountId: string): Promise<DiscountResponse>;
}
export {};
