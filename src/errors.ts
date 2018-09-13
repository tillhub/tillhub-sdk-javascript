export class BaseError {
  constructor(message: string) {
    Error.apply(this, arguments)
  }
}

BaseError.prototype = new Error()

export class AuthenticationFailed extends BaseError {
  public name = 'AuthenticationFailed'
  constructor(public message: string = 'Authentication was not successful') {
    super(message)
  }
}

export class UninstantiatedClient extends BaseError {
  public name = 'UninstantiatedClient'
  constructor(public message: string = 'Cannot instantiate API without instantiated HTTP client') {
    super(message)
  }
}

export class TransactionFetchFailed extends BaseError {
  public name = 'TransactionFetchFailed'
  constructor(public message: string = 'Could not fetch transaction') {
    super(message)
  }
}

export class TaxesFetchFailed extends BaseError {
  public name = 'TaxesFetchFailed'
  constructor(public message: string = 'Could not fetch taxes') {
    super(message)
  }
}

export class ProductCreateFailed extends BaseError {
  public name = 'ProductCreateFailed'
  constructor(public message: string = 'Could not create the product') {
    super(message)
  }
}

export class DeliveriesFetchFailed extends BaseError {
  public name = 'DeliveriesFetchFailed'
  constructor(public message: string = 'Could not fetch deliveries') {
    super(message)
  }
}

export class DeliveriesCreateFailed extends BaseError {
  public name = 'DeliveriesCreateFailed'
  constructor(public message: string = 'Could not create delivery') {
    super(message)
  }
}

export class DeliveriesUpdateFailed extends BaseError {
  public name = 'DeliveriesUpdateFailed'
  constructor(public message: string = 'Could not update delivery') {
    super(message)
  }
}

export class DeliveriesDeleteFailed extends BaseError {
  public name = 'DeliveriesDeleteFailed'
  constructor(public message: string = 'Could not delete delivery') {
    super(message)
  }
}
