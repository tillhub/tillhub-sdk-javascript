import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Customer, CustomerResponse, CustomersMetaQuery, CustomersOptions, CustomersQuery, CustomersResponse, HandlerCustomerQuery } from '../v0/customers';
export declare type CustomersBulkCreateMatchTier = 'customer_number' | 'email' | 'phonenumber';
export interface CustomersBulkCreateMatch {
    customer: Customer;
    matched_by: CustomersBulkCreateMatchTier[];
}
export interface CustomersBulkCreateRow {
    input_index: number;
    input: Customer;
}
export interface CustomersBulkCreateCreatedRow extends CustomersBulkCreateRow {
    customer: Customer;
}
export interface CustomersBulkCreateSkippedRow extends CustomersBulkCreateRow {
    matches: CustomersBulkCreateMatch[];
}
export interface CustomersBulkCreateInvalidRow extends CustomersBulkCreateRow {
    errors: Array<{
        message?: string;
        [key: string]: unknown;
    }>;
}
export interface CustomersBulkCreateResponse {
    data: {
        created_customers: CustomersBulkCreateCreatedRow[];
        skipped_customers: CustomersBulkCreateSkippedRow[];
        invalid_customers: CustomersBulkCreateInvalidRow[];
    };
    metadata: {
        created: number;
        skipped: number;
        invalid: number;
    };
    msg?: string;
}
export declare class Customers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CustomersOptions;
    uriHelper: UriHelper;
    constructor(options: CustomersOptions, http: Client);
    getAll(query?: CustomersQuery | undefined): Promise<CustomersResponse>;
    get(customerId: string, query: CustomersQuery): Promise<CustomerResponse>;
    create(customer: Customer, query?: HandlerCustomerQuery): Promise<CustomerResponse>;
    put(customerId: string, customer: Customer): Promise<CustomerResponse>;
    meta(q?: CustomersMetaQuery | undefined): Promise<CustomersResponse>;
    delete(customerId: string): Promise<CustomerResponse>;
    count(): Promise<CustomersResponse>;
    bulkCreate(customers: Customer[], query?: HandlerCustomerQuery): Promise<CustomersBulkCreateResponse>;
}
