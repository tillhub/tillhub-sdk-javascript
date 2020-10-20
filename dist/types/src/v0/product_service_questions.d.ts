import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface ProductServiceQuestionsOptions {
    user?: string;
    base?: string;
}
export interface ProductServiceQuestionsQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        active?: boolean;
        start?: string;
        end?: string;
    };
}
export interface ProductServiceQuestionResponse {
    data?: ProductServiceQuestion;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface ProductServiceQuestionsResponse {
    data: ProductServiceQuestion[];
    metadata: Record<string, unknown>;
    next?: () => Promise<ProductServiceQuestionsResponse>;
}
export interface ProductServiceQuestion {
    name?: string;
    content?: string;
    description?: string;
    service_questions?: string[];
    answer_validation?: Record<string, unknown>;
    required?: boolean;
    deleted?: boolean;
    active?: boolean;
}
export declare class ProductServiceQuestions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ProductServiceQuestionsOptions;
    uriHelper: UriHelper;
    constructor(options: ProductServiceQuestionsOptions, http: Client);
    getAll(query?: ProductServiceQuestionsQuery | undefined): Promise<ProductServiceQuestionsResponse>;
    get(questionId: string): Promise<ProductServiceQuestionResponse>;
    meta(): Promise<ProductServiceQuestionsResponse>;
    create(productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionResponse>;
    put(questionId: string, productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionResponse>;
    delete(taxId: string): Promise<ProductServiceQuestionResponse>;
}
