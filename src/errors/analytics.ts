import { BaseError } from './baseError'

export class ReportsBalancesFetchAllFailed extends BaseError {
  public name = 'ReportsBalancesFetchAllFailed'
  constructor(public message: string = 'Could not fetch all the balances', properties?: any) {
    super(message, properties)
  }
}

export class ReportsBalancesFetchOneFailed extends BaseError {
  public name = 'ReportsBalancesFetchOneFailed'
  constructor(public message: string = 'Could not fetch one balance', properties?: any) {
    super(message, properties)
  }
}

export class ReportsBalancesMetaFailed extends BaseError {
  public name = 'ReportsBalancesMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for balances', properties?: any) {
    super(message, properties)
  }
}

export class ReportsPaymentOptionsFetchAllFailed extends BaseError {
  public name = 'ReportsPaymentOptionsFetchAllFailed'
  constructor(
    public message: string = 'Could not fetch all the payment options',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class ReportsPaymentsFetchAllFailed extends BaseError {
  public name = 'ReportsPaymentsFetchAllFailed'
  constructor(public message: string = 'Could not fetch all the payments', properties?: any) {
    super(message, properties)
  }
}

export class ReportsPaymentsMetaFailed extends BaseError {
  public name = 'ReportsPaymentsMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for payments', properties?: any) {
    super(message, properties)
  }
}

export class VatReportFetchFailed extends BaseError {
  public name = 'VatReportFetchFailed'
  constructor(public message: string = 'Could not fetch the vat report', properties?: any) {
    super(message, properties)
  }
}

export class VatReportFetchMetaFailed extends BaseError {
  public name = 'VatReportFetchMetaFailed'
  constructor(
    public message: string = 'Could not fetch meta data for vat report',
    properties?: any
  ) {
    super(message, properties)
  }
}

export class CustomerFetchFailed extends BaseError {
  public name = 'CustomerFetchFailed'
  constructor(public message: string = 'Could not fetch customer report', properties?: any) {
    super(message, properties)
  }
}

export class CustomerFilterFetchFailed extends BaseError {
  public name = 'CustomerFilterFetchFailed'
  constructor(public message: string = 'Could not fetch customer filters', properties?: any) {
    super(message, properties)
  }
}
export class CustomerTransactionFetchFailed extends BaseError {
  public name = 'CustomerTransactionFetchFailed'
  constructor(public message: string = 'Could not fetch customer report transactions', properties?: any) {
    super(message, properties)
  }
}
export class CustomerOverviewFetchFailed extends BaseError {
  public name = 'CustomerOverviewFetchFailed'
  constructor(public message: string = 'Could not fetch customer report overview', properties?: any) {
    super(message, properties)
  }
}
