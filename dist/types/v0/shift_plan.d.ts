import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface ShiftPlanOptions {
    user?: string;
    base?: string;
}
export interface ShiftPlanQueryOptions {
    start?: string;
    end?: string;
    branch_id?: string;
}
export interface ShiftPlanResponse {
    msg?: string;
    data?: ShiftPlanItem[];
    metadata?: Record<string, unknown>;
}
export interface ShiftPlanShift {
    start: string;
    end: string;
}
export interface ShiftPlanItem {
    staff_member_id: string;
    branch_id: string;
    date: string;
    plan: ShiftPlanShift[];
}
export interface ShiftPlanUpdateOptions {
    shifts: Array<{
        branch_id: string;
        shift_plan: ShiftPlanItem[];
    }>;
}
export declare class ShiftPlan extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ShiftPlanOptions;
    uriHelper: UriHelper;
    constructor(options: ShiftPlanOptions, http: Client);
    get(branchId: string, options?: ShiftPlanQueryOptions): Promise<ShiftPlanResponse>;
    getAll(options?: ShiftPlanQueryOptions): Promise<ShiftPlanResponse>;
    put(shiftPlanOptions: ShiftPlanUpdateOptions): Promise<ShiftPlanResponse>;
}
export declare class ShiftPlanPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
