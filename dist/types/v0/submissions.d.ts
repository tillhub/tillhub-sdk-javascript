import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { Taxpayer } from './taxpayer';
export interface SubmissionsOptions {
    user?: string;
    base?: string;
}
export interface SubmissionsOverviewQuery {
    limit?: number;
    offset?: number;
    uri?: string;
    query?: {
        deleted?: boolean;
        location?: string;
    };
}
export interface SubmissionsOverviewResponse {
    msg?: string;
    data?: Branch[];
    metadata?: Record<string, unknown>;
    next?: () => Promise<SubmissionsOverviewResponse>;
}
export interface Branch {
    id?: string;
    name?: string;
    location?: string;
    active?: boolean;
    deleted?: boolean;
    latest_submission?: Submission | null;
}
export declare enum SubmissionRegisterStatus {
    Unchanged = "UNCHANGED",
    New = "NEW",
    Updated = "UPDATED",
    Decommissioned = "DECOMMISSIONED"
}
export interface SubmissionRegister {
    id?: string;
    registerId?: string;
    createdAt?: string;
    updatedAt?: string;
    active?: boolean;
    deleted?: boolean;
    deletedAt?: string | null;
    name?: string;
    registerNumber?: string;
    manufacturer?: string;
    model?: string;
    software?: string;
    clientType?: string;
    tssId?: string;
    clientId?: string;
    status?: SubmissionRegisterStatus;
}
export declare enum SubmissionStatus {
    Draft = "DRAFT",
    Ongoing = "ONGOING",
    Submitted = "SUBMITTED",
    Failed = "FAILED",
    Cancelled = "CANCELLED"
}
export interface Submission {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
    fiskalySubmissionId?: string | null;
    branchId?: string;
    active?: boolean;
    status?: SubmissionStatus;
    registers?: SubmissionRegister[];
    submittedAt?: string | null;
}
export interface SubmissionResponse {
    msg?: string;
    data?: Submission;
    metadata?: Record<string, unknown>;
}
export interface SubmissionPdfResponse extends Blob {
}
export declare class Submissions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: SubmissionsOptions;
    uriHelper: UriHelper;
    constructor(options: SubmissionsOptions, http: Client);
    getOverview(queryOrOptions?: SubmissionsOverviewQuery | undefined): Promise<SubmissionsOverviewResponse>;
    getCurrent(branchId: string): Promise<SubmissionResponse>;
    create(branchId: string, submissionId: string): Promise<SubmissionResponse>;
    delete(branchId: string, submissionId: string): Promise<SubmissionResponse>;
    trigger(branchId: string, submissionId: string): Promise<SubmissionResponse>;
    getPreviewPdf(branchId: string, submissionId: string): Promise<SubmissionPdfResponse>;
    getPdf(branchId: string, submissionId: string): Promise<SubmissionPdfResponse>;
    taxpayer(): Taxpayer;
}
