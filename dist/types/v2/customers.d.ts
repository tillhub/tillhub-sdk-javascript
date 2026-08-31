import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Customer, CustomerResponse, CustomersOptions, HandlerCustomerQuery } from '../v0/customers';
export declare class Customers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CustomersOptions;
    uriHelper: UriHelper;
    constructor(options: CustomersOptions, http: Client);
    create(customer: Customer, query?: HandlerCustomerQuery): Promise<CustomerResponse>;
    put(customerId: string, customer: Customer): Promise<CustomerResponse>;
}
