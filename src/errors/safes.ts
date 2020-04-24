import { BaseError } from './baseError'

export class SafesFetchAllFailed extends BaseError {
  public name = 'SafesFetchAllFailed'
  constructor(public message: string = 'Could not fetch all safes', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesFetchAllFailed.prototype)
  }
}

export class SafesFetchOneFailed extends BaseError {
  public name = 'SafesFetchOneFailed'
  constructor(public message: string = 'Could not fetch single safe', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesFetchOneFailed.prototype)
  }
}

export class SafesGetMetaFailed extends BaseError {
  public name = 'SafesGetMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for safes', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesGetMetaFailed.prototype)
  }
}

export class SafesCreationFailed extends BaseError {
  public name = 'SafesCreationFailed'
  constructor(public message: string = 'Could not create safes', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesCreationFailed.prototype)
  }
}

export class SafesPutFailed extends BaseError {
  public name = 'SafesPutFailed'
  constructor(public message: string = 'Could not update safes', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesPutFailed.prototype)
  }
}

export class SafesBookFailed extends BaseError {
  public name = 'SafesBookFailed'
  constructor(public message: string = 'Could not book transfer in safes', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesBookFailed.prototype)
  }
}
export class SafesLogBookFetchAllFailed extends BaseError {
  public name = 'SafesLogBookFetchAllFailed'
  constructor(public message: string = 'Could not get safes logs', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesLogBookFetchAllFailed.prototype)
  }
}
export class SafesLogBookGetMetaFailed extends BaseError {
  public name = 'SafesLogBookGetMetaFailed'
  constructor(public message: string = 'Could not get meta of safes logs', properties?: any) {
    super(message, properties)
    Object.setPrototypeOf(this, SafesLogBookGetMetaFailed.prototype)
  }
}
