import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ProductServiceQuestionGroupsOptions {
    user?: string;
    base?: string;
}
export interface ProductServiceQuestionGroupsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        start?: string;
        end?: string;
    };
}
export interface ProductServiceQuestionGroupResponse {
    data: ProductServiceQuestionGroup;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface ProductServiceQuestionGroupsResponse {
    data: ProductServiceQuestionGroup[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ProductServiceQuestionGroupsResponse>;
}
export interface ProductServiceQuestionGroup {
    name?: string;
    custom_id?: string;
    description?: string;
    service_questions?: string[];
    deleted?: boolean;
    active?: boolean;
}
export declare class ProductServiceQuestionGroups extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductServiceQuestionGroupsOptions;
    uriHelper: UriHelper;
    constructor(options: ProductServiceQuestionGroupsOptions, http: Client);
    getAll(query?: ProductServiceQuestionGroupsQuery | undefined): Promise<ProductServiceQuestionGroupsResponse>;
    get(groupId: string): Promise<ProductServiceQuestionGroupResponse>;
    meta(): Promise<ProductServiceQuestionGroupsResponse>;
    create(productServiceQuestionGroup: ProductServiceQuestionGroup): Promise<ProductServiceQuestionGroupResponse>;
    put(groupId: string, productServiceQuestionGroup: ProductServiceQuestionGroup): Promise<ProductServiceQuestionGroupResponse>;
}
