import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface CorrespondencesOptions {
    user?: string;
    base?: string;
}
export interface CorrespondencesQuery {
    limit?: number;
    uri?: string;
    query?: {
        start?: string;
    };
}
export interface CorrespondencesResponse {
    data: Array<Record<string, unknown>>;
    metadata: Record<string, unknown>;
    next?: () => Promise<CorrespondencesResponse>;
}
export interface CorrespondenceResponse {
    data: Correspondence;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Correspondence {
    metadata?: Record<string, unknown>;
    channel?: string;
    recipient?: Record<string, unknown>;
    sender?: Record<string, unknown>;
    payload_type?: string;
    payload?: Record<string, unknown>;
    channel_message?: Record<string, unknown>;
    customer: string;
    resource_type?: string;
    resource?: string;
    sent_at?: string;
    delivered_at?: string;
    status?: string;
    status_details?: Record<string, unknown>;
    type?: string;
}
export declare class Correspondences extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CorrespondencesOptions;
    uriHelper: UriHelper;
    constructor(options: CorrespondencesOptions, http: Client);
    getAll(query?: CorrespondencesQuery | undefined): Promise<CorrespondencesResponse>;
    get(correspondenceId: string): Promise<CorrespondenceResponse>;
    put(correspondenceId: string, correspondence: Correspondence): Promise<CorrespondenceResponse>;
    create(correspondence: Correspondence): Promise<CorrespondenceResponse>;
}
export declare class CorrespondencesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CorrespondenceFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CorrespondencePutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class CorrespondenceCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
