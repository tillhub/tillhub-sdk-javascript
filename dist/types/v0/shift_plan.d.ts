import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
import { ThBaseHandler } from '../base';
export interface ShiftPlanOptions {
    user?: string;
    base?: string;
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
    date: string;
    plan: ShiftPlanShift[];
}
export interface ShiftPlanUpdateOptions {
    shift_plan_enabled: boolean;
    shift_plan: ShiftPlanItem[];
}
export declare class ShiftPlan extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ShiftPlanOptions;
    uriHelper: UriHelper;
    constructor(options: ShiftPlanOptions, http: Client);
    get(branchId: string): Promise<ShiftPlanResponse>;
    put(branchId: string, shiftPlanOptions: ShiftPlanUpdateOptions): Promise<ShiftPlanResponse>;
}
export declare class ShiftPlanPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
