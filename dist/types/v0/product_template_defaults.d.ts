import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
export interface ProductTemplateDefaultsOptions {
    user?: string;
    base?: string;
}
export interface ProductTemplateDefaultsResponse {
    data: ProductTemplate[];
    metadata: Record<string, unknown>;
}
export interface ProductTemplate {
    id?: string;
    name: string;
    option_template?: {
        [key: string]: any;
    };
}
export declare class ProductTemplateDefaults {
    endpoint: string;
    http: Client;
    options: ProductTemplateDefaultsOptions;
    uriHelper: UriHelper;
    constructor(options: ProductTemplateDefaultsOptions, http: Client);
    getAll(): Promise<ProductTemplateDefaultsResponse>;
}
export declare class ProductTemplateDefaultsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
