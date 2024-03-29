import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Customer, CustomerResponse, CustomersMetaQuery, CustomersOptions, CustomersQuery, CustomersResponse, HandlerCustomerQuery } from '../v0/customers';
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
}
