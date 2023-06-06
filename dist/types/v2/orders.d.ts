import { Client } from '../client';
import { BaseError } from '../errors';
import { UriHelper } from '../uri-helper';
import { ThBaseHandler } from '../base';
export interface OrdersOptions {
    user?: string;
    base?: string;
}
export interface OrdersResponse {
    data: Order[];
    metadata: Record<string, unknown>;
    next?: () => Promise<OrdersResponse>;
}
export interface OrderResponse {
    data: OrderDetails;
    metadata: Record<string, unknown>;
    msg?: string;
    errors?: ErrorObject[];
}
export interface ErrorObject {
    id: string;
    label: string;
    errorDetails: Record<string, unknown>;
}
export interface OrdersQuery {
    limit?: number;
    uri?: string;
    query?: {
        orderId?: string;
        amount?: string;
        currency?: string;
        paymentMethod?: string;
        brand?: string;
        status?: string;
        txnNumber?: string;
        customerName?: string;
        email?: string;
        customerId?: string;
        curstomerBirthdate?: string;
        usage?: string;
        receiptNumber?: string;
        staff?: string;
        registerId?: string;
        location?: string;
        recurring?: string;
        paymentId?: string;
        cardNumber?: number;
        account?: string;
        bankName?: string;
        bic?: string;
        insuranceName?: string;
        insuraceId?: string;
        cashierNumber?: number;
        balanceNumber?: number;
        basketId?: string;
        basketItemId?: string;
        basketItemStatus?: string;
        basketItemName?: string;
        basketItemType?: string;
        transactionShortId?: string;
        trnasactionId?: string;
        terminalId?: string;
        cutoverId?: string;
        cutoverDate?: string;
        disputeId?: string;
        disputeType?: string;
        disputeStatus?: string;
        invoiceId?: string;
    };
}
declare type RecurringFormatType = 'scheduled' | 'unscheduled' | 'oneclick';
declare type ReturnFormatType = 'refundable' | 'capturable' | 'cancellable';
declare type PaymentTypeFormat = 'unzer' | 'external';
export interface OrderDetails {
    orderMeta?: Order;
    payment?: Payment[] | null;
    basket?: Basket | null;
    customer?: Customer | null;
    transactions?: Transaction[] | null;
    instoreInfo?: StoreInfo[] | null;
    attachments?: Attachment[] | null;
    disputes?: Dispute[] | null;
}
export interface Order {
    id?: string;
    orderStatus?: string;
    totalAmount?: number | null;
    currency?: string | null;
    salesChannel?: string | null;
    location?: string | null;
    recurring?: RecurringFormatType | null;
    returnable?: ReturnFormatType | null;
    paymentMethod?: string | null;
    status?: string | null;
    customerName?: string | null;
    lastUpdate?: string | null;
    txnNumber?: string | null;
    email?: string | null;
    customerId?: string | null;
    usage?: string | null;
    receiptNumber?: number | null;
    staff?: string | null;
    registerId?: string | null;
    entity?: string | null;
    paymentId?: string | null;
    cardNumber?: string | null;
    accountNumber?: string | null;
    bankName?: string | null;
    bic?: string | null;
    insuranceName?: string | null;
    insuranceId?: string | null;
    cashierNumber?: string | null;
    balanceNumber?: number | null;
    basketId?: number | null;
    terminalId?: string | null;
    cutoverId?: string | null;
    cutoverDate?: string | null;
}
export interface Payment {
    id?: string;
    paymentMethod?: string | null;
    brand?: string | null;
    description?: string | null;
    account?: Account | null;
    insurance?: Insurance | null;
    cashierNumber?: string | null;
    balanceNumber?: number | null;
    paymentLocation?: string | null;
    paymentType?: PaymentTypeFormat | null;
}
export interface Account {
    number?: string | null;
    expiry?: string | null;
    holder?: string | null;
    clearingDate?: string | null;
    description?: string | null;
    bank?: string | null;
    bic?: string | null;
}
export interface Insurance {
    id?: string;
    provider?: string | null;
    shippingDate?: string | null;
    interestRate?: number | null;
    nrInstalments?: number | null;
}
export interface Basket {
    id?: string;
    total?: number | null;
    currency?: string | null;
    items?: BasketItem[];
}
export interface BasketItem {
    id?: string;
    status?: string | null;
    quantity?: number | null;
    vat?: number | null;
    name?: string | null;
    type?: string | null;
    description?: string | null;
    unitName?: string | null;
    imageUrl?: string | null;
    amountPerUnit?: number | null;
    unitsQuantity?: number | null;
    totalAmount?: number | null;
    discount?: number | null;
    shippingId?: string | null;
}
export interface Customer {
    id?: string;
    title?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    company?: string | null;
    email?: string | null;
    birthdate?: string | null;
    phone?: string | null;
    mobile?: string | null;
    language?: string | null;
    billingAddress: Address | null;
    shippingAddress: Address[] | null;
}
export interface Address {
    id?: string;
    customerName?: string | null;
    street?: string | null;
    zip?: string | null;
    city?: string | null;
    state?: string | null;
    country?: string | null;
    type?: string | null;
}
export interface Transaction {
    transactionId?: TransactionId;
    type?: string | null;
    amount?: number | null;
    currency?: string | null;
    timestamp?: string | null;
    result?: string | null;
    salesChannel?: string | null;
    recurranceMode?: string | null;
    countryBank?: string | null;
    countryIP?: string | null;
    riskScore?: string | null;
    processingData?: Processing | null;
    source?: string | null;
    mode?: string | null;
    bankSecuritySignature?: PaymentAuthDetails | null;
    billingFee?: {
        percentage?: number | null;
        amount?: number | null;
    };
    paymentReversalType?: string | null;
    tokenProvider?: string | null;
    shippingInfo?: {
        deliveryTrackingId?: string | null;
        deliveryService?: string | null;
        returnTrackingId?: string | null;
    };
    criteriaMeta?: {
        sdkName?: string | null;
        sdkVersion?: string | null;
    };
}
export interface TransactionId {
    paymentId?: string | null;
    terminalId?: string | null;
    transactionId?: string | null;
    orderId?: string | null;
    uniqueId?: string | null;
    shortId?: string | null;
    refId?: string | null;
    invoiceId?: string | null;
    channelId?: string | null;
    linkpayId?: string | null;
    customerId?: string | null;
    typeId?: string | null;
    metadataId?: string | null;
    basketId?: string | null;
}
export interface Processing {
    statusCode?: number | null;
    statusMessage?: string | null;
    returnMessage?: string | null;
    returnCode?: string | null;
    reason?: string | null;
}
export interface PaymentAuthDetails {
    threeDS?: string | null;
    resetIndicator?: string | null;
    dsTransactionId?: string | null;
    protocolVersion?: string | null;
    authStatus?: string | null;
    xid?: string | null;
}
export interface StoreInfo {
    id?: string;
    branchNumber?: number | null;
    registerId?: string | null;
    staffId?: string | null;
    terminalId?: string | null;
    cutoverId?: string | null;
    cutoverDate?: string | null;
    receiptNumber?: number | null;
    balance?: number | null;
}
export interface Attachment {
    id?: string;
    fileName?: string | null;
    fileType?: string | null;
    attachmentType?: string | null;
    size?: string | null;
    created?: string | null;
}
export interface Dispute {
    id?: string;
    reason?: string | null;
    type?: string | null;
    status?: string | null;
    amount?: number | null;
    currency?: string | null;
    openedOn?: string | null;
    dueOn?: string | null;
    disputedTransactionId?: string | null;
    messages?: Message[] | null;
    events?: DisputeEvent[] | null;
    attachments?: Attachment[] | null;
}
export interface Message {
    id?: string;
    sender?: string | null;
    createdOn?: string | null;
    message?: string | null;
}
export interface DisputeEvent {
    id?: string;
    type?: string | null;
    createdOn?: string | null;
    description?: string | null;
    amount?: number | null;
}
export declare class Orders extends ThBaseHandler {
    static baseEndpoint: string;
    endpoint: string;
    http: Client;
    options: OrdersOptions;
    uriHelper: UriHelper;
    constructor(options: OrdersOptions, http: Client);
    getAll(query?: OrdersQuery | undefined): Promise<OrdersResponse>;
    get(orderId: string): Promise<OrderResponse>;
}
export declare class OrdersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export declare class OrderFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string, properties?: Record<string, unknown>);
}
export {};
