import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface TrashOptions {
    user?: string;
    base?: string;
}
export interface TrashQuery {
    limit?: number;
    uri?: string;
    query?: {
        type?: string;
        start?: string;
        end?: string;
    };
}
export interface RecoverQuery {
    query?: {
        resource: string;
        type: TrashedTypes;
    };
}
export interface TrashResponse {
    data: TrashedObject[];
    metadata: object;
    next?: () => Promise<TrashResponse>;
}
export interface TrashedObject {
    id: string;
    name: string;
    type: TrashedTypes;
    updated_at: string;
}
export declare type TrashedTypes = 'accounts' | 'branch_groups' | 'branches' | 'categories' | 'category_trees' | 'clients' | 'customers' | 'device_groups' | 'discounts' | 'expense_accounts' | 'favourites' | 'functions' | 'manufacturers' | 'payment_options' | 'processes' | 'product_groups' | 'product_service_question_groups' | 'product_service_questions' | 'product_templates' | 'products_v1' | 'promotions' | 'reasons' | 'regions' | 'safes' | 'seasons' | 'staffs' | 'staff_groups' | 'staff_permission_templates' | 'storefronts' | 'tags' | 'taxes' | 'templates' | 'warehouses';
export declare class Trash extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: TrashOptions;
    uriHelper: UriHelper;
    constructor(options: TrashOptions, http: Client);
    getAll(query: TrashQuery): Promise<TrashResponse>;
    recover(query: RecoverQuery): Promise<TrashResponse>;
}
export declare class TrashFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class RecoverFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
