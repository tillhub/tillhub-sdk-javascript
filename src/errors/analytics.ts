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
