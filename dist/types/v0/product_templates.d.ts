import { Client } from '../client';
import { BaseError } from '../errors';
export interface ProductTemplatesOptions {
    user?: string;
    base?: string;
}
export interface ProductTemplatesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
    };
}
export interface ProductTemplatesResponse {
    data: ProductTemplate[];
    metadata: object;
}
export interface ProductTemplateResponse {
    data: ProductTemplate;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface ProductTemplate {
    id?: string;
}
export interface ProductTemplate {
    name: string;
    option_template?: {
        [key: string]: any;
    };
}
export declare class ProductTemplates {
    endpoint: string;
    http: Client;
    options: ProductTemplatesOptions;
    constructor(options: ProductTemplatesOptions, http: Client);
    getAll(queryOrOptions?: ProductTemplatesQuery | undefined): Promise<ProductTemplatesResponse>;
    get(productTemplateId: string, queryOrOptions?: ProductTemplatesQuery | undefined): Promise<ProductTemplateResponse>;
    search(searchTerm: string): Promise<ProductTemplatesResponse>;
    put(productTemplateId: string, productTemplate: ProductTemplate): Promise<ProductTemplateResponse>;
    create(productTemplate: ProductTemplate): Promise<ProductTemplateResponse>;
    delete(taxId: string): Promise<ProductTemplateResponse>;
}
export declare class ProductTemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductTemplateFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductTemplatePutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductTemplateCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProuctTemplatesCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductTemplateDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
export declare class ProductTemplatesSearchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: any);
}
