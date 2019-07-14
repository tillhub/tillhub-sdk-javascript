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
export interface ProductServiceQuestionGroupReponse {
    data: ProductServiceQuestionGroupsResponse;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface ProductServiceQuestionGroupsResponse {
    data: object[];
    metadata: object;
}
export interface ProductServiceQuestionGroup {
    name?: string;
    custom_id?: string;
    description?: string;
    service_questions?: Array<String>;
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
    get(groupId: string): Promise<ProductServiceQuestionGroupReponse>;
    meta(): Promise<ProductServiceQuestionGroupsResponse>;
    create(productServiceQuestionGroup: ProductServiceQuestionGroup): Promise<ProductServiceQuestionGroupReponse>;
    put(groupId: string, productServiceQuestionGroup: ProductServiceQuestionGroup): Promise<ProductServiceQuestionGroupReponse>;
}
