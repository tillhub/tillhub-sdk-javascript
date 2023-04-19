import { Supplier } from './suppliers';
import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface SuppliersProductsRelationOptions {
    user?: string;
    base?: string;
}
export interface SuppliersProductsRelationBulkCreateQuery {
    productId: string[];
}
export interface SuppliersProductsRelationMapQuery {
    productId: string[];
}
export interface SuppliersProductsRelationBulkDeleteQuery {
    productId: string[];
}
export interface SuppliersProductsRelationDefaultResponse {
    data: {
        businessPartners: Supplier[];
        productId: string;
    };
    msg: string;
}
export interface SuppliersProductsRelationProductIdsResponse {
    data: {
        productId: string[];
    };
    msg: string;
}
export interface SuppliersProductsRelationMapResponse {
    data: {
        productsToBusinessPartnersMap: Record<string, string[]>;
        businessPartners: Record<string, Supplier>;
    };
    msg: string;
}
export interface SuppliersProductsRelation {
    id?: string;
}
export declare class SuppliersProductsRelation extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SuppliersProductsRelationOptions;
    uriHelper: UriHelper;
    constructor(options: SuppliersProductsRelationOptions, http: Client);
    getProductIds(supplierId: string): Promise<SuppliersProductsRelationProductIdsResponse>;
    getSuppliers(productId: string): Promise<SuppliersProductsRelationDefaultResponse>;
    getMap(query: SuppliersProductsRelationMapQuery): Promise<SuppliersProductsRelationMapResponse>;
    create(supplierId: string, productId: string): Promise<SuppliersProductsRelationDefaultResponse>;
    bulkCreate(supplierId: string, query: SuppliersProductsRelationBulkCreateQuery): Promise<SuppliersProductsRelationDefaultResponse>;
    delete(supplierId: string, productId: string): Promise<SuppliersProductsRelationDefaultResponse>;
    bulkDelete(supplierId: string, query: SuppliersProductsRelationBulkDeleteQuery): Promise<SuppliersProductsRelationDefaultResponse>;
}
export declare class SuppliersProductsRelationProductIdsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersProductsRelationSuppliersFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersProductsRelationMapFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersProductsRelationCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersProductsRelationBulkCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersProductsRelationDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersProductsRelationBulkDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
