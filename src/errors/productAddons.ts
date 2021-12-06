import { BaseError } from './baseError'

export class ProductAddonsFetchAllFailed extends BaseError {
  public name = 'ProductAddonsFetchAllFailed'
  constructor (
    public message: string = 'Could not fetch all product addons',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonsFetchAllFailed.prototype)
  }
}

export class ProductAddonFetchOneFailed extends BaseError {
  public name = 'ProductAddonFetchOneFailed'
  constructor (
    public message: string = 'Could not fetch single product addon',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonFetchOneFailed.prototype)
  }
}

export class ProductAddonsGetMetaFailed extends BaseError {
  public name = 'ProductAddonGetMetaFailed'
  constructor (
    public message: string = 'Could not fetch meta data for product addon',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonsGetMetaFailed.prototype)
  }
}

export class ProductAddonCreationFailed extends BaseError {
  public name = 'ProductAddonCreationFailed'
  constructor (
    public message: string = 'Could not create product addon',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonCreationFailed.prototype)
  }
}

export class ProductAddonPutFailed extends BaseError {
  public name = 'ProductAddonPutFailed'
  constructor (
    public message: string = 'Could not update product addon',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonPutFailed.prototype)
  }
}

export class ProductAddonDeleteFailed extends BaseError {
  public name = 'ProductAddonDeleteFailed'
  constructor (
    public message: string = 'Could not delete product addon',
    properties?: Record<string, unknown>
  ) {
    super(message, properties)
    Object.setPrototypeOf(this, ProductAddonDeleteFailed.prototype)
  }
}
