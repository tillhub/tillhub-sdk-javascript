import { ThBaseHandler } from '../base';
import { Client } from '../client';
import { UriHelper } from '../uri-helper';
export interface PaymentLinksOptions {
    user?: string;
    base?: string;
}
export interface PaymentLinkAddress {
    salutation?: string;
    firstName: string;
    lastName: string;
    country: string;
    address: string;
    postalCode: string;
    city: string;
}
export interface PaymentLinkCustomer {
    salutation?: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string;
    email: string;
    mobileNo?: string;
    phoneNo?: string;
    language?: string;
    billing?: PaymentLinkAddress;
    shipping?: PaymentLinkAddress;
    sameAsShipping?: boolean;
}
export interface PaymentLinkItem {
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
}
export interface CreatePaymentLinkRequest {
    usage?: string;
    paymentLinkType?: 'items_sale' | 'quick_charge';
    linkedOrderId?: string;
    branch: string;
    branchId: string;
    status?: 'READY_TO_ORDER' | 'ORDER_SUCCESSFULL';
    createdBy: string;
    total: number;
    currency: string;
    subtotal?: number;
    deliveryMethod?: string;
    deliveryCost?: number;
    customer?: PaymentLinkCustomer;
    items?: PaymentLinkItem[];
}
export interface CreatePaymentLinkResponse {
    id: string;
    usage?: string;
    paymentLinkType: 'items_sale' | 'quick_charge';
    linkedOrderId?: string;
    branch: string;
    branchId: string;
    status: 'READY_TO_ORDER' | 'ORDER_SUCCESSFULL';
    createdBy: string;
    total: number;
    currency: string;
    subtotal?: number;
    deliveryMethod?: string;
    deliveryCost?: number;
    customer?: PaymentLinkCustomer & {
        id: string;
    };
    items?: Array<PaymentLinkItem & {
        id: string;
    }>;
    createdAt: string;
    updatedAt: string;
}
export interface PaymentLinksQuery {
    limit?: number;
    uri?: string;
    query?: Record<string, unknown>;
    tenantId?: string;
}
export interface PaymentLinksResponse {
    data?: Array<Record<string, unknown>>;
    metadata?: Record<string, unknown>;
    msg?: string;
    next?: () => Promise<PaymentLinksResponse>;
}
export interface PaymentLinkResponse {
    data?: CreatePaymentLinkResponse;
    metadata?: Record<string, unknown>;
    msg?: string;
}
export declare class PaymentLinks extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: PaymentLinksOptions;
    uriHelper: UriHelper;
    constructor(options: PaymentLinksOptions, http: Client);
    getAll(query?: PaymentLinksQuery | undefined): Promise<PaymentLinksResponse>;
    create(paymentLinkData: CreatePaymentLinkRequest): Promise<PaymentLinkResponse>;
    meta(tenantId?: string): Promise<PaymentLinksResponse>;
}
