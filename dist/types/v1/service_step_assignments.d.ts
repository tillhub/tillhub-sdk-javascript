import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { BaseError } from '../errors/baseError';
export interface ServiceStepAssignmentsOptions {
    user?: string;
    base?: string;
}
export interface ServiceStepAssignmentsResponse {
    data: ServiceStepAssignment[];
    metadata: {
        count?: number;
    };
}
export declare type ServiceStepAssignmentType = 'active' | 'idle';
export interface ServiceStepSummary {
    id: string;
    name: string;
    duration: number;
}
export interface ServiceStepAssignment {
    id?: string;
    position: number;
    type: ServiceStepAssignmentType;
    duration: number;
    step?: ServiceStepSummary;
    bookableOnline?: boolean | null;
}
export interface ServiceStepAssignmentBody {
    id?: string;
    type: ServiceStepAssignmentType;
    duration: number;
    stepId?: string;
    bookableOnline?: boolean | null;
}
export declare type ServiceStepAssignmentsRequest = ServiceStepAssignmentBody[];
export declare class ServiceStepAssignments {
    static baseEndpoint: string;
    http: Client;
    options: ServiceStepAssignmentsOptions;
    uriHelper: UriHelper;
    constructor(options: ServiceStepAssignmentsOptions, http: Client);
    getAll(serviceId: string): Promise<ServiceStepAssignmentsResponse>;
    put(serviceId: string, serviceStepAssignments: ServiceStepAssignmentsRequest): Promise<ServiceStepAssignmentsResponse>;
}
export declare class ServiceStepAssignmentsFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ServiceStepAssignmentsPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
