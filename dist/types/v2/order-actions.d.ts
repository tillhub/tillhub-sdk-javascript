import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface OrderActionsOptions {
    user?: string;
    base?: string;
}
export interface ChargeCancelRequest {
    keypairId: string;
    paymentId?: string;
    paymentReference?: string;
    amount?: number;
}
export interface ChargeCancelResponse {
    data?: ChargeCancelResult;
    msg?: string;
    status?: any;
}
export interface ChargeCancelResult {
    id: string;
    amount: string;
    currency: string;
}
export interface AuthorizeCancelRequest {
    keypairId: string;
    paymentId?: string;
    paymentReference?: string;
    amount?: number;
}
export interface AuthorizeCancelResponse {
    data?: AuthorizeCancelResult;
    msg?: string;
    status?: any;
}
export interface AuthorizeCancelResult {
    id: string;
    amount: string;
    currency: string;
}
export interface AuthorizeChargeRequest {
    keypairId: string;
    paymentId?: string;
    paymentReference?: string;
    amount?: number;
}
export interface AuthorizeChargeResponse {
    data?: AuthorizeChargeResult;
    msg?: string;
    status?: any;
}
export interface AuthorizeChargeResult {
    id: string;
    amount: string;
    currency: string;
}
export declare class OrderActions extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: OrderActionsOptions;
    uriHelper: UriHelper;
    constructor(options: OrderActionsOptions, http: Client);
    orderRefund(orderId: string, payload: ChargeCancelRequest): Promise<ChargeCancelResponse>;
    orderCancel(orderId: string, payload: AuthorizeCancelRequest): Promise<AuthorizeCancelResponse>;
    orderCapture(orderId: string, payload: AuthorizeChargeRequest): Promise<AuthorizeChargeResponse>;
}
export declare class OrderRefundFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class OrderCancelFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class OrderCaptureFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
