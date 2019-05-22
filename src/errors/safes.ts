import { BaseError } from './baseError'

export class SafesFetchAllFailed extends BaseError {
  public name = 'SafesFetchAllFailed'
  constructor(public message: string = 'Could not fetch all safes', properties?: any) {
    super(message, properties)
  }
}

export class SafesFetchOneFailed extends BaseError {
  public name = 'SafesFetchOneFailed'
  constructor(public message: string = 'Could not fetch single safe', properties?: any) {
    super(message, properties)
  }
}

export class SafesGetMetaFailed extends BaseError {
  public name = 'SafesGetMetaFailed'
  constructor(public message: string = 'Could not fetch meta data for safes', properties?: any) {
    super(message, properties)
  }
}

export class SafesCreationFailed extends BaseError {
  public name = 'SafesCreationFailed'
  constructor(public message: string = 'Could not create safes', properties?: any) {
    super(message, properties)
  }
}

export class SafesPutFailed extends BaseError {
  public name = 'SafesPutFailed'
  constructor(public message: string = 'Could not update safes', properties?: any) {
    super(message, properties)
  }
}

export class SafesBookFailed extends BaseError {
  public name = 'SafesBookFailed'
  constructor(public message: string = 'Could not book transfer in safes', properties?: any) {
    super(message, properties)
  }
}
