import { BaseError } from './baseError'

export class ReportsBalancesFetchAllFailed extends BaseError {
  public name = 'ReportsBalancesFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all the balances',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsBalancesFetchAllFailed.prototype)
  }
}

export class ReportsBalancesFetchOneFailed extends BaseError {
  public name = 'ReportsBalancesFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch one balance',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsBalancesFetchOneFailed.prototype)
  }
}

export class ReportsBalancesMetaFailed extends BaseError {
  public name = 'ReportsBalancesMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for balances',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsBalancesMetaFailed.prototype)
  }
}

export class ReportsPaymentOptionsFetchAllFailed extends BaseError {
  public name = 'ReportsPaymentOptionsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all the payment options',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsPaymentOptionsFetchAllFailed.prototype)
  }
}

export class ReportsPaymentOptionsMetaFailed extends BaseError {
  public name = 'ReportsPaymentOptionsMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta the payment options',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsPaymentOptionsMetaFailed.prototype)
  }
}

export class ReportsPaymentsFetchAllFailed extends BaseError {
  public name = 'ReportsPaymentsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all the payments',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsPaymentsFetchAllFailed.prototype)
  }
}

export class ReportsPaymentsMetaFailed extends BaseError {
  public name = 'ReportsPaymentsMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for payments',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsPaymentsMetaFailed.prototype)
  }
}

export class VatReportFetchFailed extends BaseError {
  public name = 'VatReportFetchFailed'
  constructor (
    public message: string = 'Could not fetch the vat report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VatReportFetchFailed.prototype)
  }
}

export class VatReportFetchMetaFailed extends BaseError {
  public name = 'VatReportFetchMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for vat report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, VatReportFetchMetaFailed.prototype)
  }
}

export class CustomerFetchFailed extends BaseError {
  public name = 'CustomerFetchFailed'
  constructor (
    public message: string = 'Could not fetch customer report',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerFetchFailed.prototype)
  }
}

export class CustomerFilterFetchFailed extends BaseError {
  public name = 'CustomerFilterFetchFailed'
  constructor (
    public message: string = 'Could not fetch customer filters',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerFilterFetchFailed.prototype)
  }
}
export class CustomerTransactionFetchFailed extends BaseError {
  public name = 'CustomerTransactionFetchFailed'
  constructor (
    public message: string = 'Could not fetch customer report transactions',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerTransactionFetchFailed.prototype)
  }
}
export class CustomerOverviewFetchFailed extends BaseError {
  public name = 'CustomerOverviewFetchFailed'
  constructor (
    public message: string = 'Could not fetch customer report overview',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomerOverviewFetchFailed.prototype)
  }
}
export class CustomersMetaFailed extends BaseError {
  public name = 'CustomersMetaFailed'
  constructor (
    public message: string = 'Could not fetch customer report metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, CustomersMetaFailed.prototype)
  }
}

export class ReportsGastroReservationsFetchAllFailed extends BaseError {
  public name = 'ReportsGastroReservationsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all the gastro reservations',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsGastroReservationsFetchAllFailed.prototype)
  }
}

export class ReportsGastroReservationsMetaFailed extends BaseError {
  public name = 'ReportsGastroReservationsMetaFailed'
  constructor (
    public message: string = 'Could not fetch gastro reservations report metadata',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ReportsGastroReservationsMetaFailed.prototype)
  }
}
