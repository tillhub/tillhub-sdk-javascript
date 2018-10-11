export declare class BaseError {
    constructor(message: string);
}
export declare class AuthenticationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class UninstantiatedClient extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TransactionFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TaxesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductsDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesFetchOneFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesPDFFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesInProgressFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesDispatchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveriesDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveryItemsCreateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveryItemsFetchAllFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class DeliveryItemUpdateFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ProductGroupsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class AccountsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesCreationFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesPutFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class TemplatesPreviewFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class ConfigurationsFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class BranchesFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class BranchesCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class CustomersFetchFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class CustomersCountFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
export declare class CustomerDeleteFailed extends BaseError {
    message: string;
    name: string;
    constructor(message?: string);
}
