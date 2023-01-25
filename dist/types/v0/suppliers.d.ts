import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper, HandlerQuery } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface SuppliersOptions {
    user?: string;
    base?: string;
}
export interface SuppliersQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        extended?: boolean;
        location?: string;
    };
}
export interface SuppliersMetaQuery {
    deleted?: boolean;
    location?: string;
}
export interface SuppliersResponse {
    data: Supplier[];
    metadata: Record<string, unknown>;
    next?: () => Promise<SuppliersResponse>;
}
export interface SuppliersBulkResponse {
    data: {
        updated_suppliers?: Supplier[];
        invalid_suppliers?: Supplier[];
        created_suppliers?: Supplier[];
    };
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface SupplierResponse {
    data?: Supplier;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
    errors?: ErrorObject[];
}
export interface SupplierQuery {
    supplier_number_template?: string;
    generate_supplier_number?: boolean;
}
export interface HandlerSupplierQuery extends HandlerQuery {
    query?: SupplierQuery;
}
export interface SupplierPhonenumbers {
    main?: string;
    home?: string;
    mobile?: string;
    work?: string;
}
export interface SupplierNoteItem {
    type: 'text';
    payload: any;
}
export interface SupplierContacts {
    email?: {
        enabled: boolean;
    };
    newsletter?: {
        enabled: boolean;
    };
    phone?: {
        enabled: boolean;
    };
    post?: {
        enabled: boolean;
    };
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export declare type SupplierAddressType = 'billing' | 'returns';
export interface SupplierAddress {
    lines: string[] | null;
    street: string | null;
    street_number: string | null;
    locality: string | null;
    region: string | null;
    postal_code: string | null;
    country: string | null;
    type: SupplierAddressType | null;
}
export interface SupplierBankAccount {
    name: string | null;
    iban: string | null;
    swift: string | null;
}
export interface Supplier {
    id?: string;
    companyName?: string | null;
    description?: string | null;
    number?: string | null;
    email?: string | null;
    phonenumbers?: SupplierPhonenumbers | null;
    paymentTerms?: string | null;
    taxNumber?: string | null;
    glnNumber?: string | null;
    taxSubject?: boolean;
    accountsReceivable?: any[] | null;
    accountsPayable?: any[] | null;
    addresses?: SupplierAddress[] | null;
    bankAccounts?: SupplierBankAccount[] | null;
    firstname?: string;
    lastname?: string;
}
export declare class Suppliers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SuppliersOptions;
    uriHelper: UriHelper;
    constructor(options: SuppliersOptions, http: Client);
    getAll(query?: SuppliersQuery | undefined): Promise<SuppliersResponse>;
    get(supplierId: string, query: SuppliersQuery): Promise<SupplierResponse>;
    put(supplierId: string, supplier: Supplier): Promise<SupplierResponse>;
    create(supplier: Supplier, query?: HandlerSupplierQuery): Promise<SupplierResponse>;
    bulkCreate(suppliers: Supplier[], query?: HandlerSupplierQuery): Promise<SuppliersBulkResponse>;
    meta(q?: SuppliersMetaQuery | undefined): Promise<SuppliersResponse>;
    delete(supplierId: string): Promise<SupplierResponse>;
}
export declare class SuppliersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SupplierFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SupplierPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SupplierNoteCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SupplierCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersBulkCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersMetaFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SuppliersSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class SupplierDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
