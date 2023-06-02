import { Client } from '../client'
import { BaseError } from '../errors'
import { UriHelper } from '../uri-helper'
import { ThBaseHandler } from '../base'


export interface OrdersOptions {
    user?: string
    base?: string
}

export interface OrdersResponse {
    data: Order[]
    metadata: Record<string, unknown>
    next?: () => Promise<OrdersResponse>
}

export interface OrdersQuery {
    limit?: number
    uri?: string
    query?: {
        deleted?: boolean
        active?: boolean
        extended?: boolean
        location?: string
    }
}

declare type RecurringFormatType = 'scheduled' | 'unscheduled' | 'oneclick'
declare type ReturnFormatType = 'refundable' | 'capturable' | 'cancellable'
declare type PaymentTypeFormat = 'unzer' | 'external'

export interface OrderDetails {
    orderMeta?: Order
    payment?: Payment[] | null
    basket?: Basket | null
    customer?: Customer | null
    transactions?: Transaction[] | null
    instoreInfo?: StoreInfo[] | null
    attachments?: Attachment[] | null
    disputes?: Dispute[] | null
}


export interface Order {
    id?: string
    orderStatus?: string
    totalAmount?: number | null
    currency?: string | null
    salesChannel?: string | null
    location?: string | null
    recurring?: RecurringFormatType | null
    returnable?: ReturnFormatType | null
    paymentMethod?: string | null
    status?: string | null
    customerName?: string | null
    lastUpdate?: string | null  // todo: can be timestamp
}

export interface Payment {
    id?: string
    paymentMethod?: string | null
    brand?: string | null
    description?: string | null
    account?: Account | null
    insurance?: Insurance | null
    cashierNumber?: string | null
    balanceNumber?: number | null
    paymentLocation?: string | null
    paymentType?: PaymentTypeFormat | null

}

export interface Account {
    number?: string | null
    expiry?: string | null
    holder?: string | null
    clearingDate?: string | null // todo: this should be checked if we want a date format
    description?: string | null
    bank?: string | null
    bic?: string | null
}

export interface Insurance {
    id?: string
    provider?: string | null
    shippingDate?: string | null // todo: again, do we need a date type
    interestRate?: number | null
    nrInstalments?: number | null
}

export interface Basket {
    id?: string
    total?: number | null
    currency?: string | null
    items?: BasketItem[]
}

export interface BasketItem {
    id?: string
    status?: string | null
    quantity?: number | null
    vat?: number | null
    name?: string | null
    type?: string | null
    description?: string | null
    unitName?: string | null
    imageUrl?: string | null
    amountPerUnit?: number | null
    unitsQuantity?: number | null
    totalAmount?: number | null
    discount?: number | null
    shippingId?: string | null // connected to Customer/ShippingAddress/id
}

export interface Customer {
    id?: string
    title?: string | null //Mr/Mrs/Ms/Dr...
    firstName?: string | null
    lastName?: string | null
    company?: string | null
    email?: string | null
    birthdate?: string | null
    phone?: string | null
    mobile?: string | null
    language?: string | null
    billingAddress: Address | null
    shippingAddress: Address[] | null
}

export interface Address {
    id?: string
    customerName?: string | null
    street?: string | null
    zip?: string | null
    city?: string | null
    state?: string | null
    country?: string | null
    type?: string | null // enum like string for description branch/home/office
}

export interface Transaction {
    transactionId?: TransactionId
    type?: string | null
    amount?: number | null
    currency?: string | null
    timestamp?: string | null //todo: again, should we define timestamp as type
    result?: string | null  //todo: could be an enum if we know possibilities
    salesChannel?: string | null
    recurranceMode?: string | null
    countryBank?: string | null
    countryIP?: string | null
    riskScore?: string | null
    processingData?: Processing | null
    source?: string | null
    mode?: string | null
    bankSecuritySignature?: PaymentAuthDetails | null // 3ds verification details
    billingFee?: {
        percentage?: number | null
        amount?: number | null
    }
    paymentReversalType?: string | null
    tokenProvider?: string | null
    shippingInfo?: {
        deliveryTrackingId?: string | null
        deliveryService?: string | null
        returnTrackingId?: string | null
    }
    criteriaMeta?: {
        sdkName?: string | null
        sdkVersion?: string | null
    }
}

export interface TransactionId {
    paymentId?: string | null
    terminalId?: string | null
    transactionId?: string | null
    orderId?: string | null
    uniqueId?: string | null
    shortId?: string | null
    refId?: string | null
    invoiceId?: string | null
    channelId?: string | null
    linkpayId?: string | null
    customerId?: string | null
    typeId?: string | null
    metadataId?: string | null
    basketId?: string | null
}

export interface Processing {
    statusCode?: number | null
    statusMessage?: string | null
    returnMessage?: string | null
    returnCode?: string | null
    reason?: string | null
}

export interface PaymentAuthDetails {
    threeDS?: string | null
    resetIndicator?: string | null
    dsTransactionId?: string | null
    protocolVersion?: string | null
    authStatus?: string | null
    xid?: string | null
}

export interface StoreInfo {
    id?: string
    branchNumber?: number | null
    registerId?: string | null
    staffId?: string | null
    terminalId?: string | null
    cutoverId?: string | null
    cutoverDate?: string | null // todo: can be timestamp
    receiptNumber?: number | null
    balance?: number | null
}

export interface Attachment {
    id?: string
    fileName?: string | null
    fileType?: string | null
    attachmentType?: string | null
    size?: string | null
    created?: string | null // todo: can be timestamp
}

export interface Dispute {
    id?: string
    reason?: string | null
    type?: string | null
    status?: string | null
    amount?: number | null
    currency?: string | null
    openedOn?: string | null // todo: can be timestamp
    dueOn?: string | null // todo: can be timestamp
    disputedTransactionId?: string | null
    messages?: Message[] | null
    events?: DisputeEvent[] | null
    attachments?: Attachment[] | null
}

export interface Message {
    id?: string
    sender?: string | null
    createdOn?: string | null // todo: can be timestamp
    message?: string | null
}

export interface DisputeEvent {
    id?: string
    type?: string | null
    createdOn?: string | null // todo: can be timestamp
    description?: string | null
    amount?: number | null
}

export class Orders extends ThBaseHandler {
    public static baseEndpoint = '/api/v2/orders'
    endpoint: string
    http: Client
    public options: OrdersOptions
    public uriHelper: UriHelper

    constructor (options: OrdersOptions, http: Client) {
        super(http, {
          endpoint: Orders.baseEndpoint,
          base: options.base ?? 'https://api.tillhub.com'
        })
        this.options = options
        this.http = http
    
        this.endpoint = Orders.baseEndpoint
        this.options.base = this.options.base ?? 'https://api.tillhub.com'
        this.uriHelper = new UriHelper(this.endpoint, this.options)
    }

    async getAll (query?: OrdersQuery | undefined): Promise<OrdersResponse> {
        let next
        const base = this.uriHelper.generateBaseUri()
        const uri = this.uriHelper.generateUriWithQuery(base, query)
    
        try {
            const response = await this.http.getClient().get(uri)
            if (response.status !== 200) {
                throw new OrdersFetchFailed(undefined, { status: response.status })
            }
    
            if (response.data.cursor?.next) {
                next = (): Promise<OrdersResponse> => this.getAll({ uri: response.data.cursor.next })
            }
    
            return {
                data: response.data.results,
                metadata: { cursor: response.data.cursor },
                next
            }
        } catch (error: any) {
            throw new OrdersFetchFailed(error.message, { error })
        }
    }

    async get (orderId: string, query: OrdersQuery): Promise<OrdersResponse> {
        const base = this.uriHelper.generateBaseUri(`/${orderId}`)
        const uri = this.uriHelper.generateUriWithQuery(base, query)
    
        try {
            const response = await this.http.getClient().get(uri)
    
            if (response.status !== 200) {
                throw new OrderFetchFailed(undefined, { status: response.status })
            }
            return {
                data: response.data.results[0] as Order,
                msg: response.data.msg,
                metadata: { count: response.data.count }
            }
        } catch (error: any) {
            throw new OrderFetchFailed(error.message, { error })
        }
      }

}

export class OrdersFetchFailed extends BaseError {
    public name = 'OrdersFetchFailed'
    constructor (
        public message: string = 'Could not fetch orders',
        properties?: Record<string, unknown>
    ) {
        super(message, properties)
        Object.setPrototypeOf(this, OrdersFetchFailed.prototype)
    }
}

export class OrderFetchFailed extends BaseError {
    public name = 'OrderFetchFailed'
    constructor (
        public message: string = 'Could not fetch order',
        properties?: Record<string, unknown>
    ) {
        super(message, properties)
        Object.setPrototypeOf(this, OrderFetchFailed.prototype)
    }
}