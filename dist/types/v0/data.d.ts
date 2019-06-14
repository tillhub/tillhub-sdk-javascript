import { Client } from '../client';
import { BaseError } from '../errors';
export interface DataOptions {
    user?: string;
    base?: string;
}
export interface DataResponse {
    data: object;
}
export declare class Data {
    endpoint: string;
    http: Client;
    options: DataOptions;
    constructor(options: DataOptions, http: Client);
    replace(dataId: string, payload: FormData): Promise<DataResponse>;
    create(payload: FormData): Promise<DataResponse>;
}
export declare class DataCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DataReplaceFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
