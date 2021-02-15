import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { SafesLogBookOptions, SafesLogBookQuery, SafesLogBookResponse } from '../v0/safes';
export declare class SafesLogBook extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SafesLogBookOptions;
    uriHelper: UriHelper;
    constructor(options: SafesLogBookOptions, http: Client);
    getAll(query?: SafesLogBookQuery | undefined): Promise<SafesLogBookResponse>;
}
