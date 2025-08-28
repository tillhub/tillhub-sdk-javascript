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
export interface BasketItem {
    basketItemReferenceId?: string;
    quantity?: number;
    vat?: number;
    amountDiscountPerUnitGross?: number;
    amountPerUnitGross?: number;
    title?: string;
    type?: string;
    unit?: string;
    subTitle?: string;
    imageUrl?: string;
}
export interface Basket {
    id?: string;
    totalValueGross?: number;
    currencyCode?: string;
    orderId?: string;
    basketItems?: BasketItem[];
}
export interface TransactionResources {
    customerId?: string;
    typeId?: string;
    metadataId?: string;
    basketId?: string;
}
export interface TransactionCardAuthentication {
    verificationId?: string;
    resultIndicator?: string;
    dsTransactionId?: string;
    protocolVersion?: string;
    authenticationStatus?: string;
    messageType?: string;
    xId?: string;
}
export interface TransactionCard {
    recurrenceType?: string;
    brandTransactionId?: string;
    settlementDay?: string;
    exemptionType?: string;
    liability?: string;
    authentication?: TransactionCardAuthentication;
}
export interface TransactionRiskData {
    threatMetrixId?: string;
    customerGroup?: string;
    customerId?: string;
    confirmedAmount?: number;
    confirmedOrders?: number;
    internalScore?: number;
    registrationLevel?: number;
    registrationDate?: number;
}
export interface TransactionShipping {
    deliveryTrackingId?: string;
    deliveryService?: string;
    returnTrackingId?: string;
}
export interface TransactionPaypal {
    checkoutType?: string;
}
export interface TransactionPaylater {
    targetDueDate?: string;
    merchantComment?: string;
    merchantOrderId?: string;
}
export interface TransactionOnlineTransfer {
    targetDueDate?: string;
}
export interface TransactionAdditionalData {
    card?: TransactionCard;
    riskData?: TransactionRiskData;
    shipping?: TransactionShipping;
    paypal?: TransactionPaypal;
    paylater?: TransactionPaylater;
    onlineTransfer?: TransactionOnlineTransfer;
    termsAndConditionUrl?: string;
    privacyPolicyUrl?: string;
}
export interface Transaction {
    amount?: number;
    currency?: string;
    returnUrl?: string;
    card3ds?: boolean;
    paymentReference?: string;
    orderId?: string;
    invoiceId?: string;
    effectiveInterestRate?: string;
    resources?: TransactionResources;
    linkpayId?: string;
    additionalTransactionData?: TransactionAdditionalData;
}
export interface TransactionAuthorize extends Transaction {
}
export interface TransactionCharge extends Transaction {
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface TransactionBasketResponse {
    data: Basket;
    msg?: string;
    errors?: ErrorObject[];
}
export interface TransactionAuthorizeResponse {
    data: TransactionAuthorize;
    msg?: string;
    errors?: ErrorObject[];
}
export interface TransactionChargeResponse {
    data: TransactionCharge;
    msg?: string;
    errors?: ErrorObject[];
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
    createBasket(keypairId: string, basket: Basket): Promise<TransactionBasketResponse>;
    authorize(keypairId: string, transaction: TransactionAuthorize): Promise<TransactionAuthorizeResponse>;
    charge(keypairId: string, transaction: TransactionCharge): Promise<TransactionChargeResponse>;
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
export declare class CreateBasketFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class AuthorizeTransactionFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class ChargeTransactionFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
