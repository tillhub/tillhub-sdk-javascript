import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface PurchaseOrdersOptions {
    user?: string;
    base?: string;
}
export interface PurchaseOrdersCreateQuery {
    purchaseOrderNumber: string;
    businessPartner: {
        id: string;
    };
    status?: PurchaseOrderStatus;
    notes?: string | null;
    recipients?: string[];
}
export interface PurchaseOrdersUpdateQuery {
    purchaseOrderNumber: string;
    businessPartner: {
        id: string;
    };
    status?: PurchaseOrderStatus;
    notes?: string | null;
    recipients?: string[];
}
export interface PurchaseOrdersBulkAddProductsQuery {
    products: PurchaseOrderProduct[];
}
export interface PurchaseOrdersBulkDeleteProductsQuery {
    products: string[];
}
export interface PurchaseOrdersSingleResponse {
    data: PurchaseOrder;
    msg: string;
}
export interface PurchaseOrdersMultipleResponse {
    data: PurchaseOrder[];
    msg: string;
}
export declare type PurchaseOrderStatus = 'draft' | 'sent' | 'done';
export interface PurchaseOrder {
    purchaseOrderNumber: string;
    businessPartner: {
        id: string;
    };
    status: PurchaseOrderStatus;
    id?: string;
    sentAt?: string | null;
    createdAt?: string;
    createdBy?: string;
    notes?: string | null;
    recipients?: string[];
    totalAmount?: string;
    products?: PurchaseOrderProduct[];
}
export interface PurchaseOrderProduct {
    productId: string;
    productName: string;
    price: number;
    vatPercent: number;
    discountPercent: number;
    quantity: number;
    totalUntaxed?: number;
    totalWithTax?: number;
}
export declare class PurchaseOrders extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PurchaseOrdersOptions;
    uriHelper: UriHelper;
    constructor(options: PurchaseOrdersOptions, http: Client);
    get(purchaseOrderId: string): Promise<PurchaseOrdersSingleResponse>;
    create(purchaseOrder: PurchaseOrdersCreateQuery): Promise<PurchaseOrdersSingleResponse>;
    put(purchaseOrderId: string, purchaseOrder: PurchaseOrdersUpdateQuery): Promise<PurchaseOrdersSingleResponse>;
    bulkAddProducts(purchaseOrderId: string, purchaseOrder: PurchaseOrdersBulkAddProductsQuery): Promise<PurchaseOrdersSingleResponse>;
    bulkDeleteProducts(purchaseOrderId: string, purchaseOrder: PurchaseOrdersBulkDeleteProductsQuery): Promise<PurchaseOrdersSingleResponse>;
}
export declare class PurchaseOrdersGetFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PurchaseOrdersCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PurchaseOrdersUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PurchaseOrdersBulkAddProductsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class PurchaseOrdersBulkDeleteProductsFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
