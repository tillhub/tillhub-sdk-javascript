import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface StaffGroupsOptions {
    user?: string;
    base?: string;
}
export interface StaffGroupsQuery {
    limit?: number;
    uri?: string;
    name?: string;
    deleted?: boolean;
    count?: number;
    q?: string;
}
export interface StaffGroupsResponse {
    data: object[];
    metadata: object;
}
export declare class StaffGroups {
    endpoint: string;
    http: Client;
    options: StaffGroupsOptions;
    uriHelper: UriHelper;
    constructor(options: StaffGroupsOptions, http: Client);
    getAll(query?: StaffGroupsQuery | undefined): Promise<StaffGroupsResponse>;
    meta(): Promise<StaffGroupsResponse>;
}
