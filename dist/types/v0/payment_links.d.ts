import { ThBaseHandler } from '../base';
import { Client } from '../client';
import { UriHelper } from '../uri-helper';
declare type PaymentLinkType = 'items_sale' | 'quick_charge';
declare type PaymentLinkStatus = 'Open' | 'Expired' | 'Closed';
export interface PaymentLinkEntity {
    id?: string | null;
    usage?: string | null;
    paymentLinkType: PaymentLinkType;
    linkedOrderId?: string | null;
    branch?: string | null;
    branchId?: string | null;
    status?: PaymentLinkStatus | null;
    createdBy: string | null;
    total?: number | null;
    currency?: string | null;
    subtotal?: number | null;
    deliveryMethod?: string | null;
    deliveryCost?: number | null;
    customer?: PaymentLinkCustomer | null;
    items?: PaymentLinkItem[] | null;
    paymentPageUrl?: string | null;
    createdAt: string | {
        start: Date;
        end: Date;
    } | null;
    updatedAt?: string | null;
}
export interface PaymentLinksOptions {
    user?: string;
    base?: string;
}
export interface PaymentLinkAddress {
    salutation?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    country?: string | null;
    address?: string | null;
    postalCode?: string | null;
    city?: string | null;
}
export interface PaymentLinkCustomer {
    salutation?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    dateOfBirth?: string | null;
    email?: string | null;
    mobileNo?: string | null;
    phoneNo?: string | null;
    language?: string | null;
    billing?: PaymentLinkAddress | null;
    shipping?: PaymentLinkAddress | null;
    sameAsShipping?: boolean | false;
}
export interface PaymentLinkItem {
    name?: string | null;
    quantity?: number | null;
    unitPrice?: number | null;
    totalPrice?: number | null;
}
export interface CreatePaymentLinkRequest {
    usage?: string;
    paymentLinkType?: PaymentLinkType;
    linkedOrderId?: string;
    branch: string;
    branchId: string;
    status?: PaymentLinkStatus;
    createdBy: string;
    total: number;
    currency: string;
    subtotal?: number;
    deliveryMethod?: string;
    deliveryCost?: number;
    customer?: PaymentLinkCustomer | null;
    items?: PaymentLinkItem[] | null;
}
export interface PaymentLinkQuery {
    branch?: string | null;
    customerEmail?: string | null;
    createdBy?: string | null;
    createdAt?: string | {
        start: Date;
        end: Date;
    } | null;
    status?: string | null;
    amount?: number | null;
}
export interface PaymentLinkQueryHandler {
    limit?: number;
    uri?: string;
    query?: PaymentLinkQuery;
    orderFields?: string[] | string;
}
export interface PaymentLinksResponse {
    data?: PaymentLinkEntity[];
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<PaymentLinksResponse>;
}
export interface PaymentPageResponse {
    paymentPageUrl: string;
    id: string;
    qrCodeSvg: string;
}
export interface CreatePaymentLinkResponse {
    data?: PaymentPageResponse;
    msg?: string;
}
export declare class PaymentLinks extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentLinksOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentLinksOptions, http: Client);
    getAll(query?: PaymentLinkQueryHandler | undefined): Promise<PaymentLinksResponse>;
    create(paymentLinkData: CreatePaymentLinkRequest): Promise<CreatePaymentLinkResponse>;
    meta(query?: PaymentLinkQueryHandler | undefined): Promise<PaymentLinksResponse>;
}
export {};
