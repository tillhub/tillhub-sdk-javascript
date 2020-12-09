import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { CustomersOptions, CustomersQuery, CustomersResponse } from '../v0/customers';
export declare class Customers extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CustomersOptions;
    uriHelper: UriHelper;
    constructor(options: CustomersOptions, http: Client);
    getAll(query?: CustomersQuery | undefined): Promise<CustomersResponse>;
}
