import { Client } from '../client';
import { UriHelper } from '../uri-helper';
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
export interface ProductServiceQuestionReponse {
    data: ProductServiceQuestionsResponse;
    metadata?: {
        count?: number;
    };
    msg?: string;
}
export interface ProductServiceQuestionsResponse {
    data: object[];
    metadata: object;
}
export interface ProductServiceQuestion {
    name?: string;
    content?: string;
    description?: string;
    service_questions?: Array<String>;
    answer_validation?: object;
    required?: boolean;
    deleted?: boolean;
    active?: boolean;
}
export declare class ProductServiceQuestions {
    endpoint: string;
    http: Client;
    options: ProductServiceQuestionsOptions;
    uriHelper: UriHelper;
    constructor(options: ProductServiceQuestionsOptions, http: Client);
    getAll(query?: ProductServiceQuestionsQuery | undefined): Promise<ProductServiceQuestionsResponse>;
    get(questionId: string): Promise<ProductServiceQuestionReponse>;
    meta(): Promise<ProductServiceQuestionsResponse>;
    create(productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionReponse>;
    put(questionId: string, productServiceQuestion: ProductServiceQuestion): Promise<ProductServiceQuestionReponse>;
}
