import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface SuppliersProductsRelationOptions {
    user?: string;
    base?: string;
}
export interface SuppliersProductsRelationBulkDeleteItem {
    businessPartnerId: string;
    productId: string[];
}
export interface SuppliersProductsRelationBulkDeleteBody {
    items: SuppliersProductsRelationBulkDeleteItem[];
}
export interface SuppliersProductsRelationBulkDeleteResponse {
    data: Record<string, unknown>;
    msg: string;
}
export declare class SuppliersProductsRelation extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SuppliersProductsRelationOptions;
    uriHelper: UriHelper;
    constructor(options: SuppliersProductsRelationOptions, http: Client);
    bulkDelete(body: SuppliersProductsRelationBulkDeleteBody): Promise<SuppliersProductsRelationBulkDeleteResponse>;
}
export declare class SuppliersProductsRelationBulkDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
