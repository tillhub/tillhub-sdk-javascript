import { Client } from '../client';
export interface BranchesOptions {
    user?: string;
    base?: string;
}
export interface BranchesQuery {
    limit?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
    };
}
export interface BranchesResponse {
    data: object[];
    metadata: object;
    next?: () => Promise<BranchesResponse>;
}
export interface BranchResponse {
    data: Branch;
    metadata?: {
        count?: number;
        patch?: any;
    };
    msg?: string;
}
export interface Branch {
    id?: string;
}
export interface Branch {
    branch_number?: number;
    name: string;
    email?: string;
    custom_id?: string;
    external_custom_id?: string;
    receipt_header?: string;
    receipt_footer?: string;
    active?: boolean;
    deleted?: boolean;
    configuration?: string;
    timezone_default?: string | null;
    currency_default?: string | null;
}
export declare class Branches {
    endpoint: string;
    http: Client;
    options: BranchesOptions;
    constructor(options: BranchesOptions, http: Client);
    getAll(queryOrOptions?: BranchesQuery | undefined): Promise<BranchesResponse>;
    get(branchId: string): Promise<BranchResponse>;
    put(branchId: string, branch: Branch): Promise<BranchResponse>;
    create(branch: Branch): Promise<BranchResponse>;
    count(): Promise<BranchesResponse>;
    delete(branchId: string): Promise<BranchResponse>;
}
