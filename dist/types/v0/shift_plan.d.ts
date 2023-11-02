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
    data?: ShiftPlanObject;
    metadata?: Record<string, unknown>;
}
export interface Shift {
    start: string;
    end: string;
}
export interface ShiftPlanItem {
    staff_member_id: string;
    date: string;
    plan: Shift[];
}
export interface ShiftPlanObject {
    shift_plan_enabled: boolean;
    plan: ShiftPlanItem[];
}
export declare class ShiftPlan extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: ShiftPlanOptions;
    uriHelper: UriHelper;
    constructor(options: ShiftPlanOptions, http: Client);
    get(branchId: string): Promise<ShiftPlanResponse>;
    put(branchId: string, shiftPlan: ShiftPlanObject): Promise<ShiftPlanResponse>;
}
export declare class ShiftPlanPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
