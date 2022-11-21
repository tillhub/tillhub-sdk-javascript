import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ProductBranchCustomizationOptions {
    user?: string;
    base?: string;
}
export interface ProductBranchCustomizationQuery {
    product?: string;
    deleted?: boolean;
    active?: boolean;
    uri?: string;
}
export interface ProductBranchCustomizationResponse {
    data?: ProductBranchCustomization;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ProductBranchCustomizationsResponse {
    data: ProductBranchCustomization[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ProductBranchCustomizationsResponse>;
}
export interface ProductBranchCustomization {
    product?: string;
    name?: string;
    description?: string;
    summary?: string;
    default_tile_color?: string;
    branches?: string[];
    branch_groups?: string[];
    active?: boolean;
    deleted?: boolean;
}
export declare class ProductBranchCustomizations extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductBranchCustomizationOptions;
    uriHelper: UriHelper;
    constructor(options: ProductBranchCustomizationOptions, http: Client);
    getAll(query?: ProductBranchCustomizationQuery | undefined): Promise<ProductBranchCustomizationsResponse>;
    get(productBranchCustomizationId: string): Promise<ProductBranchCustomizationResponse>;
    create(productBranchCustomization: ProductBranchCustomization): Promise<ProductBranchCustomizationResponse>;
    put(productBranchCustomizationId: string, productBranchCustomization: ProductBranchCustomization): Promise<ProductBranchCustomizationResponse>;
    delete(productBranchCustomizationId: string): Promise<ProductBranchCustomizationResponse>;
}
