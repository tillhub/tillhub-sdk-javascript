import { Client } from '../client';
export interface InvoicesOptions {
    user?: string;
    base?: string;
}
export interface InvoicesQuery {
    limit?: number;
    offset?: number;
    filter?: string;
    order_by?: string;
    direction?: string;
    location?: string;
    embed?: string[];
    uri?: string;
    archived?: boolean;
    deleted?: boolean;
}
export interface InvoicesGetOneRequestObject {
    invoiceId: string;
    query?: InvoicesQuery;
}
export interface InvoicesCreateRequestObject {
    body: InvoicesCreateBody;
    query?: InvoicesQuery;
}
export interface InvoicesCreateBody {
    comments?: string | null;
    customer?: string | null;
    customer_external_reference_id?: string | null;
    amount?: object | null;
    currency?: string | null;
    issued_at?: string | null;
    balance?: number | null;
    due_date?: string | null;
    status?: string | null;
    archived?: boolean | null;
    archived_at?: string | null;
    custom_id?: string | null;
    external_reference_id?: string | null;
    external_reference?: object | null;
    metadata?: object | null;
    origins?: string[] | null;
    related_to?: string[] | null;
    depends_on?: string[] | null;
    deleted?: boolean | null;
    active?: boolean | null;
    assignee?: string | null;
    assigned_by?: string | null;
}
export interface InvoicesUpdateRequestObject {
    body: InvoicesUpdateBody;
    invoiceId: string;
    query?: InvoicesQuery;
}
export interface InvoicesUpdateBody {
    comments?: string | null;
    customer?: string | null;
    customer_external_reference_id?: string | null;
    amount?: object | null;
    currency?: string | null;
    issued_at?: string | null;
    balance?: number | null;
    due_date?: string | null;
    status?: string | null;
    archived?: boolean | null;
    archived_at?: string | null;
    custom_id?: string | null;
    external_reference_id?: string | null;
    external_reference?: object | null;
    metadata?: object | null;
    origins?: string[] | null;
    related_to?: string[] | null;
    depends_on?: string[] | null;
    deleted?: boolean | null;
    active?: boolean | null;
    assignee?: string | null;
    assigned_by?: string | null;
}
export interface InvoicesSimpleUpdateRequestBody {
    invoiceId: string;
    query?: InvoicesQuery;
}
export interface InvoicesResponse {
    data: object[];
    metadata: object;
    next?: Promise<InvoicesResponse>;
    msg?: string;
}
export declare class Invoices {
    endpoint: string;
    http: Client;
    options: InvoicesOptions;
    constructor(options: InvoicesOptions, http: Client);
    getAll(q?: InvoicesQuery | undefined): Promise<InvoicesResponse>;
    getMeta(): Promise<InvoicesResponse>;
    getOne(requestObject: InvoicesGetOneRequestObject): Promise<InvoicesResponse>;
    create(requestObject: InvoicesCreateRequestObject): Promise<InvoicesResponse>;
    update(requestObject: InvoicesUpdateRequestObject): Promise<InvoicesResponse>;
    deleteOne(invoiceId: string): Promise<InvoicesResponse>;
}
