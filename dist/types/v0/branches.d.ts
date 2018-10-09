import { Client } from '../client';
export interface BranchesOptions {
    user?: string;
    base?: string;
}
export interface BranchesQuery {
    limit?: number;
    uri?: string;
}
export interface BranchesResponse {
    data: object[];
    metadata: object;
}
export declare class Branches {
    endpoint: string;
    http: Client;
    options: BranchesOptions;
    constructor(options: BranchesOptions, http: Client);
    getAll(query?: BranchesQuery | undefined): Promise<BranchesResponse>;
    count(): Promise<BranchesResponse>;
}
