import { Client } from '../client';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
import { BaseError } from '../errors';
export interface CustomerAppointmentsOptions {
    user?: string;
    base?: string;
}
export interface AppointmentCustomer {
    comment: string | null;
    email: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    source: string;
}
export interface AppointmentLineItem {
    staffId: string;
    serviceId: string;
    serviceName: string;
}
export declare type AppointmentStatus = 'NO_SHOW' | 'DECLINED_BY_MERCHANT' | 'CANCELED';
export interface AppointmentEntity {
    id?: string;
    lineItems?: AppointmentLineItem[];
    customer?: AppointmentCustomer | null;
    createdAt?: string;
    updatedAt?: string;
    status?: AppointmentStatus | null;
    start?: string;
    status_reason?: string;
    notes?: string | null;
}
export interface CustomerAppointmentsQueryHandler {
    query?: TransactionsQuery;
    limit?: number;
    uri?: string;
}
export interface TransactionsQuery {
    deleted?: boolean;
    when?: 'past' | 'future';
}
export interface CustomerAppointmentsResponse {
    data?: CustomerAppointments[];
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<CustomerAppointmentsResponse>;
}
export declare class CustomerAppointments extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: CustomerAppointmentsOptions;
    uriHelper: UriHelper;
    constructor(options: CustomerAppointmentsOptions, http: Client);
    getAll(customerId: string, query?: CustomerAppointmentsQueryHandler): Promise<CustomerAppointmentsResponse>;
}
export declare class CustomerAppointmentsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
